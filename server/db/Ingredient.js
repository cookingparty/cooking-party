const conn = require("./conn");
const { UUID, UUIDV4, TEXT, STRING, INTEGER, DECIMAL } = require("sequelize");

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
    type: DECIMAL,
    defaultValue: 0,
  },
  measurementUnit: {
    type: STRING,
    //allowNull: false,
  },
});

module.exports = Ingredient;
