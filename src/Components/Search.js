import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.example.com/recipes?q=${search}`
      );
      const data = response.data;
      onSearch(data);
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

export default Search;


// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import { useSelector } from 'react-redux';

// const Search = ({ onSearch }) => {
//   const recipes = useSelector((state) => state.recipes);
//   const [search, setSearch] = useState('');

//   const handleInputChange = (event) => {
//     setSearch(event.target.value);
//   };

//   // Search API
//   const handleSearch = () => {
//     executeSearch();
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       executeSearch();
//     }
//   };

//   const executeSearch = () => {
//     const filteredRecipes = recipes.filter(
//       (recipe) =>
//         recipe.name.toLowerCase().includes(search.toLowerCase()) ||
//         recipe.ingredients
//           .map((ingredient) => ingredient.toLowerCase())
//           .includes(search.toLowerCase()) ||
//         recipe.cuisine.toLowerCase().includes(search.toLowerCase())
//     );
//     onSearch(filteredRecipes);
//   };

//   return (
//     <div>
//       <TextField
//         label="Search"
//         variant="outlined"
//         value={search}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         InputProps={{
//           endAdornment: (
//             <IconButton onClick={handleSearch}>
//               <SearchIcon />
//             </IconButton>
//           ),
//         }}
//       />
//     </div>
//   );
// };

// export default Search;
