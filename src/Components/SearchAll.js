import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const SearchAll = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = async () => {
    const apiKey1 = '6f3684ac356b4745a101f882b28c9a3a';
    const apiKey2 = '9973533'
    try {
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
      console.log( `meals ${mealData}, cocktails ${cocktailData}` );
      onSearch({ mealData, cocktailData });
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      executeSearch();
    }
  };

  const executeSearch = () => {
    handleSearch();
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
};

export default SearchAll;
