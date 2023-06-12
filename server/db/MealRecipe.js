const { UUID, UUIDV4 } = require("sequelize");
const conn = require("./conn");

const MealRecipe = conn.define("mealrecipe", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = MealRecipe;
