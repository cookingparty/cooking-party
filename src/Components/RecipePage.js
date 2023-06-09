import React from 'react';

const RecipePage = () => {
	return (
		<div>
			<h1>Recipe Title</h1>
			<p>**** 4.6 (15) | 117 REVIEWS | 11 PHOTOS | +favorite</p>
			<p>Recipe Description</p>
			<p>Recipe by *USER23* | Updated June 8, 2023</p>
			<img
				src="https://www.edamam.com/web-img/262/262b4353ca25074178ead2a07cdf7dc1.jpg"
				alt="Recipe Image"
			/>
			<hr />
			<p>Info block/hero...Ready in?...Servings</p>
			<hr />
			<h3>Ingredients</h3>
			<ul>
				<li>Map Ingredients</li>
			</ul>
			<h3>Directions</h3>
			<ol>
				<li>Map Directions</li>
			</ol>
			<hr />
			<h3>Reviews (117)</h3>
			<p>Review Form w/rating</p>
			<p>Review 1</p>
		</div>
	);
};

export default RecipePage;
