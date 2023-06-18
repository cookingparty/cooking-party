import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch, inputProps, activeFilter, setActiveFilter }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      executeSearch();
    }
  };

  const executeSearch = () => {
    onSearch(searchQuery);
    setActiveFilter(''); 
  };
  

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          ...inputProps,
          endAdornment: (
            <IconButton onClick={executeSearch}>
              <SearchIcon style={{ fontSize: '24px' }} />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

export default SearchBar;

