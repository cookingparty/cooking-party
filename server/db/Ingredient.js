const conn = require("./conn");
const { UUID, UUIDV4, TEXT, STRING, INTEGER } = require("sequelize");

const Ingredient = conn.define("ingredient", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  amount: {
    type: INTEGER,
    defaultValue: 1,
  },
});

module.exports = Ingredient;
