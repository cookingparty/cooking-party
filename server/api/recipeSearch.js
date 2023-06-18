const express = require('express');
const app = express.Router();
const { Recipe } = require('../db');
const axios = require('axios');
const { API_KEY_MEAL, API_KEY_COCKTAIL } = require('../../env');

module.exports = app;
//...api/recipeSearch

app.get('/', async (req, res, next) => {
	try {
		const recipes = await Recipe.findAll();

		// Fetch data from APIs
		// const spoonacularResponse = await axios.get("https://api.spoonacular.com/recipes");
		// const cocktailDBResponse = await axios.get("https://www.thecocktaildb.com/api/json/v2/");
		const spoonacularResponse = await axios.get(
			'https://api.spoonacular.com/recipes/random',
			{
				headers: {
					'Content-Type': 'application/json',
					'X-API-Key': API_KEY_MEAL,
				},
				params: {
					number: 10,
				},
			}
		);
		const cocktailDBResponse = await axios.get(
			`https://www.thecocktaildb.com/api/json/v2/${API_KEY_COCKTAIL}/randomselection.php`
		);
		// Combine the fetched API data with the database data
		const combinedData = {
			databaseData: recipes,
			spoonacularData: spoonacularResponse.data,
			cocktailDBData: cocktailDBResponse.data,
		};

		res.send(combinedData);
	} catch (ex) {
		next(ex);
	}
});
