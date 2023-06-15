const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER } = conn.Sequelize;
const axios = require("axios");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const Recipe = conn.define("recipe", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  spoonacular_id: {
    type: INTEGER,
    unique: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  instructionsFake: {
    type: TEXT,
    /*allowNull: false,*/
  },
  description: {
    type: TEXT,
  },
  image: {
    type: TEXT,
    get: function () {
      const prefix_PNG = "data:image/png;base64,";
      const prefix_JPEG = "data:image/jpeg;base64,";
      const prefix_JPG = "data:image/jpg;base64,";

      const data = this.getDataValue("avatar");
      if (!data) {
        return data;
      }
      if (data.startsWith(prefix_JPEG || prefix_PNG || prefix_JPG)) {
        return data;
      }
      return `${prefix_JPEG || prefix_PNG || prefix_JPG}${data}`;
    },
  },
  imageURL: {
    type: TEXT,
  },
  isCocktail: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

Recipe.seedSpoonacularRecipe = async function (spoonacularId) {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${spoonacularId}/information`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.apiKey,
      },
    }
  );
  if (response.data.error) {
    const error = Error(response.data.error);
    error.status = 401;
    throw error;
  }
  let recipe = await Recipe.findOne({
    where: {
      spoonacular_id: spoonacularId,
    },
  });
  if (!recipe) {
    recipe = await Recipe.create({
      spoonacular_id: spoonacularId,
      title: response.data.title,
      imageURL: response.data.image,
      description: response.data.summary,
    });
    response.data.extendedIngredients.map(async (ingredient) => {
      return await conn.models.ingredient.create({
        name: ingredient.name,
        amount: ingredient.measures.us.amount,
        recipeId: recipe.id,
        measurementUnit: ingredient.measures.us.unitShort,
      });
    });
    const cleanInstructions = DOMPurify.sanitize(response.data.instructions, {
      FORBID_TAGS: ["li", "ol"],
    });
    const instructionsArray = cleanInstructions.split(".");
    console.log("instructionsArray", instructionsArray);
    instructionsArray.map(async (instruction, idx) => {
      if (instruction.length > 0) {
        return await conn.models.instruction.create({
          listOrder: idx + 1,
          specification: instruction,
          recipeId: recipe.id,
        });
      }
    });
  } else if (recipe) {
    return recipe;
  }
  return recipe;
};

module.exports = Recipe;
