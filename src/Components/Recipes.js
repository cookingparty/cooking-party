import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "./Search";
import SearchAll from "./SearchAll";
import Instafeed from "instafeed.js";
import { accessTokenIg } from "../../secrets";
import Box from "@mui/material/Box";

const handleSearch = (filteredRecipes) => {
  // Handle the filtered recipes here
  console.log(filteredRecipes);
};

const styles = {
  instafeedContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px",
  },
};

const Recipes = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };


  const inputProps = {
	style: {
	  width: '1200px',
	  height: '100px',
	  border: '2px solid #ed4218',
	  fontSize: '22px', 
	},
	inputStyle: {
		fontSize: '22px',
	  },
  };
  

  useEffect(() => {
    const userFeed = new Instafeed({
      get: "user",
      resolution: "low_resolution",
      limit: 4,
      accessToken: accessTokenIg,
      target: "instafeed-container",
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
          <SearchAll
            onSearch={handleSearch}
            inputProps={inputProps}
          />
        </div>
      </div>
      <div style={styles.instafeedContainer} id="instafeed-container"></div>
    </div>
  );
};

export default Recipes;
