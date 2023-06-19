import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import Instafeed from 'instafeed.js';
import { accessTokenIg } from '../../secrets';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { apiKeyMeal, apiKeyCocktail } from '../../secrets';
import { Grid } from '@mui/material';
import SearchResult from './SearchResults';
import Filters from './Filters';

const executeSearch = (filteredRecipes) => {
	// Handle the filtered recipes here
	console.log(filteredRecipes);
};

const styles = {
	instafeedContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '50px',
	},
};

const Recipes = () => {
	const { auth } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [allergen, setAllergen] = useState([]);
	const [activeFilter, setActiveFilter] = useState('');

	let params = useParams();
	const numberOfRecipeCards = 12;

	useEffect(() => {
		handleSearch(params.filter);
		//   getAllergen(params.filter);
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
						number: numberOfRecipeCards,
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

	const resetFilters = () => {
		setActiveFilter('');
		console.log('success');
		console.log('resetFilters function', activeFilter);
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
						number: numberOfRecipeCards,
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
			resetFilters();
			console.log('handleSearch resetFilters', resetFilters());
		} catch (error) {
			console.error(error);
		}
	};

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	const inputProps = {
		style: {
			width: '800px',
			height: '100px',
			border: '2px solid #ed4218',
			fontSize: '22px',
			background: '#faf6e8',
			opacity: '0.4',
		},
	};

	const sizeProps = {
		style: {
			height: '20px',
		},
	};

	useEffect(() => {
		const userFeed = new Instafeed({
			get: 'user',
			resolution: 'low_resolution',
			limit: 4,
			accessToken: accessTokenIg,
			target: 'instafeed-container',
		});
		userFeed.run();
	}, []);

	return (
		<div style={styles.root}>
			<div
				style={{
					position: 'relative',
					width: '100vw',
					height: '400px',
				}}
			>
				<img
					src="static/images/citrus edit.jpg"
					alt="search bar photo"
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '400px',
						objectFit: 'cover',
						zIndex: -1,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						zIndex: 1,
					}}
				>
					<SearchBar
						onSearch={handleSearch}
						inputProps={inputProps}
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
					/>
				</div>
			</div>
			<Grid
				container
				direction="column"
				alignItems="center"
				spacing={2}
				style={{ margin: 'auto', width: 'fit-content', marginTop: '150px' }}
			>
				{/* <Grid item>
				<SearchBar onSearch={handleSearch} />
			</Grid> */}
				<Grid item>
					<Filters
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
						resetFilters={resetFilters}
					/>
				</Grid>
				<Grid item>
					{searchResults.length > 0 && <SearchResult results={searchResults} />}
					{allergen.length > 0 && <SearchResult results={allergen} />}
				</Grid>
			</Grid>
			<div style={styles.instafeedContainer} id="instafeed-container"></div>
		</div>
	);
};

export default Recipes;