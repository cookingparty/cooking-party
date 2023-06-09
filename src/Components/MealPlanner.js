import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDay } from "../store";
import { Button, Icon, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const MealPlanner = () => {
  const { day } = useSelector((state) => state);

  const today = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = React.useState(dayjs(today));

  const dispatch = useDispatch();
  const carouselWidth = "50%";

  useEffect(() => {
    dispatch(fetchDay(dayjs(date).format("YYYY-MM-DD")));
  }, [date]);

  const breakfast = [];
  const lunch = [];
  const dinner = [];
  const snacks = [];

  day.meals.map((meal) => {
    if (meal.type === "breakfast") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          breakfast.push(recipe);
        });
    }
    if (meal.type === "lunch") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          lunch.push(recipe);
        });
    }
    if (meal.type === "dinner") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          dinner.push(recipe);
        });
    }
    if (meal.type === "snack") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          snacks.push(recipe);
        });
    }
  });

  return (
    
    <div style={{ margin: "50px", textAlign: "center", 
    minHeight: "100vh",
      display: "grid",
      gridtemplaterows: "1fr auto"
  }}
    >
       <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={2}
      >
        <img
          src="static/images/fruit cocktails.jpg"
          alt="fruit cocktails"
          style={{
            top: 0,
            left: 0,
            width: carouselWidth,
            height: "auto",
            objectFit: "cover",
          }}
        />
        <h1
        style={{font: 'Helvetica', textAlign: "center"}}
        >Meal Planner</h1>
    <div className="mealPlannerCalendar">
      {/* calendar */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar", "DateCalendar"]}>
          <DemoItem>
            <DateCalendar
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      {/* meals of the day */}
      <div className="mealsOfTheDay">
        <h3>Breakfast</h3>
        <ul>
          {breakfast.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              <Tooltip title="add to grocery list">
                <Button startIcon={<Icon>add_circle</Icon>}></Button>
              </Tooltip>
            </li>
          ))}
        </ul>
        <h3>Lunch</h3>
        <ul>
          {lunch.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              <Tooltip title="add to grocery list">
                <Button startIcon={<Icon>add_circle</Icon>}></Button>
              </Tooltip>
            </li>
          ))}
        </ul>{" "}
        <h3>Dinner</h3>
        <ul>
          {dinner.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              <Tooltip title="add to grocery list">
                <Button startIcon={<Icon>add_circle</Icon>}></Button>
              </Tooltip>
            </li>
          ))}
        </ul>
        <h3>Snacks</h3>
        <ul>
          {snacks.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              <Tooltip title="add to grocery list">
                <Button startIcon={<Icon>add_circle</Icon>}></Button>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </Box>
    </div>
  );
};

export default MealPlanner;
