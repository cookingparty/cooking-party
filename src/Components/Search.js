import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { use } from 'chai';

export default function SearchBar() {
  const [recipeOptions, setRecipeOptions] = useState([]);

useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('YOUR_RECIPE_API_URL');
        const recipes = response.data;
        const recipeTitles = recipes.map((recipe) => recipe.title);
        setRecipeOptions(recipeTitles);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchRecipes();
  }, []);
  

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'Search',
            
            }}
          />
        )}
      />
    </Stack>
  );
}





