import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createFavoriteSpoonacular,
  createFavoriteCocktail,
  seedSpoonacularRecipe,
  seedCocktailRecipe,
} from "../store";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Icon, Tooltip } from "@mui/material";
import * as DOMPurify from "dompurify";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
  WebkitBoxPack: "center",
  WebkitBoxAlign: "center",
  textAlign: "center",
  WebkitBoxFlex: 1,
  marginBottom: theme.spacing(1),
  maxHeight: 64, // Adjust the height as needed
  lineHeight: "1.2em",
}));

export default function RecipeCard({
  id,
  title,
  description,
  image,
  subheader,
  readyInMinutes,
  serves,
  avatar,
  avatarColor,
  maxDescriptionLength = 300,
  isCocktail,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const { auth, recipes, favorites } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorite = async (id) => {
    if (isCocktail) {
      dispatch(createFavoriteCocktail({ recipe_id: id, userId: auth.id }));
    } else {
      dispatch(createFavoriteSpoonacular({ recipe_id: id, userId: auth.id }));
    }
  };

  //need to work on this logic
  const isFavorited = (recipeId) => {
    if (isCocktail) {
      const cocktailRecipe = recipes.find((r) => r.cocktail_id == recipeId);
      if (!cocktailRecipe) {
        return false;
      } else {
        if (!!favorites.find((f) => f.recipe_id === cocktailRecipe.id)) {
          return true;
        }
        return false;
      }
    } else {
      const recipe = recipes.find((r) => r.id === recipeId);
      if (!recipe) {
        const seededFromSpoonRecipe = recipes.find(
          (r) => r.spoonacular_id === recipeId
        );
        if (!seededFromSpoonRecipe) {
          return false;
        } else {
          if (
            !!favorites.find((f) => f.recipe_id === seededFromSpoonRecipe.id)
          ) {
            return true;
          }
        }
      } else {
        if (!!favorites.find((f) => f.recipeId === recipeId)) {
          return true;
        }
      }
    }
  };

  /*const openRecipePage = async (ev, id) => {
    ev.preventDefault();
    if (isCocktail) {
      const recipe = recipes.find((r) => r.id === id);
      if (!recipe) {
        const newRecipe = await dispatch(seedCocktailRecipe(id));
        console.log("newRecipe", newRecipe);
        navigate(`/recipes/${newRecipe.id}`);
      } else {
        navigate(`/recipes/${recipe.id}`);
      }
    } else {
      const recipe = recipes.find((r) => r.id === id);
      if (!recipe) {
        const newRecipe = await dispatch(seedSpoonacularRecipe(id));
        console.log("newRecipe", newRecipe);
        navigate(`/recipes/${newRecipe.id}`);
      } else {
        navigate(`/recipes/${recipe.id}`);
      }
    }
  };*/

  const openRecipePage = async (ev, id) => {
    ev.preventDefault();
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) {
      if (isCocktail) {
        const newRecipe = await dispatch(seedCocktailRecipe(id));
        navigate(`/recipes/${newRecipe.id}`);
      } else {
        const newRecipe = await dispatch(seedSpoonacularRecipe(id));
        navigate(`/recipes/${newRecipe.id}`);
      }
    } else {
      navigate(`/recipes/${recipe.id}`);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const trimmedDescription =
    description && description.length > maxDescriptionLength
      ? `${description.slice(0, maxDescriptionLength)}...`
      : description;

  const clean = DOMPurify.sanitize(trimmedDescription);

  return (
    <Card sx={{ maxWidth: 350, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: avatarColor }} aria-label="recipe">
        //     {avatar}
        //   </Avatar>
        // }
        action={
          !!auth.id &&
          !isFavorited(id) && (
            <IconButton aria-label="settings" onClick={() => favorite(id)}>
              <FavoriteIcon />
              {/* <MoreVertIcon /> */}
            </IconButton>
          )
        }
        title={
          <TitleTypography variant="h6" component="div">
            <Link onClick={(ev) => openRecipePage(ev, id)}>{title}</Link>
          </TitleTypography>
        }
      />

      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title}
      ></CardMedia>
      <CardActions disableSpacing>
        {!!auth.id && !isFavorited(id) && (
          <IconButton
            aria-label="add to favorites"
            onClick={() => favorite(id)}
          >
            {/* <FavoriteIcon /> */}
          </IconButton>
        )}
        <Typography variant="body2" color="text.secondary">
          Click for more info...
        </Typography>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {/* <Tooltip title="add to meal planner">
          <Button startIcon={<Icon>add_circle</Icon>}></Button>
        </Tooltip> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <span dangerouslySetInnerHTML={{ __html: clean }} />
          </Typography>
          <Link onClick={(ev) => openRecipePage(ev, id)}>Learn more...</Link>
          <Typography paragraph>
            {/* Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.) */}
          </Typography>
          <Typography>
            {/* Set aside off of the heat to let rest for 10 minutes, and then serve. */}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
