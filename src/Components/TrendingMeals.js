import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import { red } from '@mui/material/colors';

function TrendingMeals() {
	const [trending, setTrending] = useState([]);

	useEffect(() => {
		getTrendingMeals();
	}, []);

	const getTrendingMeals = async () => {
		const apiKey = '6f3684ac356b4745a101f882b28c9a3a';
		try {
			const response = await axios.get(
				'https://api.spoonacular.com/recipes/random',
				{
					headers: {
						'Content-Type': 'application/json',
						'X-API-Key': apiKey,
					},
					params: {
						number: 5,
					},
				}
			);

			const data = response.data;
			setTrending(data.recipes);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="recipe-grid">
			{trending.map((recipe) => (
				<RecipeCard
					key={recipe.id}
					title={recipe.title}
					subheader={recipe.sourceName}
					image={recipe.image}
					description={recipe.summary}
					readyInMinutes={recipe.readyInMinutes}
					serves={recipe.servings}
          avatar={'F'}
          avatarColor={'red'}
				/>
			))}
		</div>
	);
}

export default TrendingMeals;
