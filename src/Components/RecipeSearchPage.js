// this code needs to go into the Recipes.js file

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { apiKeyMeal, apiKeyCocktail } from '../../secrets';
import SearchBar from './SearchBar';
import { Grid } from '@mui/material';
import SearchResult from './SearchResults';
import Filters from './Filters';
// Do we want to use Framer-Motion for animation?

function RecipeSearchPage() {
	const [searchResults, setSearchResults] = useState([]);
	const [allergen, setAllergen] = useState([]);
	let params = useParams();

	useEffect(() => {
		getAllergen(params.filter);
		console.log('params', params.filter);
	}, [params.filter]);

	// Fetch Allergen Recipes for filters
	const getAllergen = async (searchQuery) => {
		try {
			const response = await axios.get(
				'https://api.spoonacular.com/recipes/random',
				{
					headers: {
						'Content-Type': 'application/json',
						'X-API-Key': apiKeyMeal,
					},
					params: {
						tags: searchQuery,
						number: 10,
					},
				}
			);
			const recipeResults = response.data.recipes;
			setAllergen(recipeResults);
			// reset search results
			setSearchResults([]);
			console.log('setAllergen', recipeResults);
		} catch (error) {
			console.error(error);
		}
	};

	// Fetch Recipes for Search Bar (both meals and cocktails)
	const handleSearch = async (searchQuery) => {
		const apiKey1 = apiKeyMeal;
		const apiKey2 = apiKeyCocktail;
		try {
			const mealResponse = await axios.get(
				'https://api.spoonacular.com/recipes/complexSearch',
				{
					headers: {
						'Content-Type': 'application/json',
						'X-API-Key': apiKey1,
					},
					params: {
						query: searchQuery,
						number: 10,
					},
				}
			);
			const cocktailResponse = await axios.get(
				`https://www.thecocktaildb.com/api/json/v2/${apiKey2}/search.php?s=${searchQuery}`
			);

			const combinedData = {
				meals: mealResponse.data.results || [],
				cocktails: cocktailResponse.data.drinks || [],
			};
			console.log(combinedData);
			setSearchResults([...combinedData.meals, ...combinedData.cocktails]);
			// Reset allergen state
			setAllergen([]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			spacing={2}
			style={{ margin: 'auto', width: 'fit-content', marginTop: '150px' }}
		>
			<Grid item>
				<SearchBar onSearch={handleSearch} />
			</Grid>
			<Grid item>
				<Filters />
			</Grid>
			<Grid item>
				{searchResults.length > 0 && <SearchResult results={searchResults} />}
				{allergen.length > 0 && <SearchResult results={allergen} />}
			</Grid>
		</Grid>
	);
}

export default RecipeSearchPage;
