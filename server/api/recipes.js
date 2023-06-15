const express = require("express");
const app = express.Router();
const { Recipe, Ingredient, Instruction } = require("../db");

module.exports = app;

app.get("/:id/ingredients", async (req, res, next) => {
  try {
    console.log("Ingredient", Ingredient);
    res.send(
      await Ingredient.findAll({
        where: {
          recipeId: req.params.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get("/:id/instructions", async (req, res, next) => {
  try {
    res.send(
      await Instruction.findAll({
        where: {
          recipeId: req.params.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get("/", async (req, res, next) => {
  try {
    res.send(await Recipe.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/spoonacular", async (req, res, next) => {
  try {
    const recipe = await Recipe.seedSpoonacularRecipe(req.body.recipe_id);
    res.status(201).send(recipe);
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).send(recipe);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.delete("/:id", async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    await recipe.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.put("/:id", async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    res.send(await recipe.update(req.body));
  } catch (ex) {
    next(ex);
  }
});
