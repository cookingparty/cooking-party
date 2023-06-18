import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState('');

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			executeSearch();
		}
	};

	const executeSearch = () => {
		onSearch(searchQuery);
	};

	return (
		<div>
			<TextField
				label="Search"
				variant="standard"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				InputProps={{
					endAdornment: (
						<IconButton onClick={executeSearch}>
							<SearchIcon />
						</IconButton>
					),
				}}
			/>
		</div>
	);
}

export default SearchBar;
