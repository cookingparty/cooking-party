const { UUID, UUIDV4, ENUM } = require("sequelize");
const conn = require("./conn");

const Meal = conn.define("meal", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  type: {
    type: ENUM("breakfast", "lunch", "dinner", "snack"),
    defaultValue: "snack",
  },
});

module.exports = Meal;
