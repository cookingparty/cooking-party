import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createFavorite } from "../store";
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
  maxDescriptionLength = 150,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const { auth, recipes, favorites } = useSelector((state) => state);
  const dispatch = useDispatch();

  const favorite = (id) => {
    dispatch(createFavorite({ recipe_id: id, userId: auth.id }));
  };

  const isFavorited = (recipeId) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) {
      const seededFromSpoonRecipe = recipes.find(
        (recipe) => recipe.spoonacular_id === recipeId
      );
      if (!seededFromSpoonRecipe) {
        return false;
      }
      if (
        !!favorites.find(
          (favorite) =>
            favorite.recipe_id === seededFromSpoonRecipe.id &&
            favorite.userId === auth.id
        )
      ) {
        return true;
      }
      return false;
    } else {
      if (!!favorites.find((favorite) => favorite.recipe_id === recipeId)) {
        return true;
      }
      return false;
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const trimmedDescription =
    description.length > maxDescriptionLength
      ? `${description.slice(0, maxDescriptionLength)}...`
      : description;

  return (
    <Card sx={{ maxWidth: 350, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: avatarColor }} aria-label="recipe">
            {avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <TitleTypography variant="h6" component="div">
            <Link to={`/recipes/${id}`}>{title}</Link>
          </TitleTypography>
        }
        // subheader={subheader}
      />

      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {/* Need to install a HTML parser to get rid of the HTML tags in the description */}
          {trimmedDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {!isFavorited(id) && (
          <IconButton
            aria-label="add to favorites"
            onClick={() => favorite(id)}
          >
            <FavoriteIcon />
          </IconButton>
        )}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
            Summary (Do we want Ingredients here or comments?)
          </Typography>
          <Typography paragraph>{description}</Typography>
          <Typography paragraph>
            This is another place holder comment
          </Typography>
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
