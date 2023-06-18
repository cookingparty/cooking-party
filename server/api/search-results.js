const express = require("express");
const app = express.Router();

module.exports = app;

app.get('/', async (req, res) => {
    try {
      const apiKey1 = '6f3684ac356b4745a101f882b28c9a3a';
      const apiKey2 = '9973533';
      const search = req.query.query; // Get the search query from the query parameters
  
      const mealResponse = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey1,
          },
          params: {
            query: search,
          },
        }
      );
  
      const cocktailResponse = await axios.get(
        `https://www.thecocktaildb.com/api/json/v2/${apiKey2}/search.php?s=${search}`
      );
  
      const mealData = mealResponse.data;
      const cocktailData = cocktailResponse.data;
  
      // Return the search results as JSON
      res.json({ mealData, cocktailData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the search request' });
    }
  });
  