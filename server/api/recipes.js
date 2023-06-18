const express = require("express");
const app = express.Router();
const { Recipe, Ingredient, Instruction } = require("../db");

module.exports = app;

app.get("/:id/ingredients", async (req, res, next) => {
  try {
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

app.post("/cocktail", async (req, res, next) => {
  try {
    const recipe = await Recipe.seedCocktailRecipe(req.body.recipe_id);
    res.status(201).send(recipe);
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
    const { recipe, ingredients, instructions } = req.body;
    const createdRecipe = await Recipe.create({
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
      imageURL:
        recipe.imageURL ||
        "https://live.staticflickr.com/65535/52983207456_5c25daeb1e_d.jpg",
      isCocktail: recipe.isCocktail,
      userId: recipe.userId,
      groupId: recipe.groupId || null,
    });
    for (const ingredient of ingredients) {
      const createdIngredient = await Ingredient.create({
        name: ingredient.name,
        amount: ingredient.amount,
        measurementUnit: ingredient.measurementUnit,
        recipeId: createdRecipe.id,
      });
    }
    for (const instruction of instructions) {
      const createdIngredient = await Instruction.create({
        listOrder: instruction.listOrder,
        specification: instruction.specification,
        recipeId: createdRecipe.id,
      });
    }
    res.status(201).send(createdRecipe);
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
    const ingredient = await Ingredient.findAll({
      where: {
        recipeId: req.params.id,
      },
    });
    const instruction = await Instruction.findAll({
      where: {
        recipeId: req.params.id,
      },
    });

    const update = await Promise.all([
      recipe.update(req.body),
      ingredient.update(req.body),
      instruction.update(req.body),
    ]);

    res.send(update);
  } catch (ex) {
    next(ex);
  }
});
