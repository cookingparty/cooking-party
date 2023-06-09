const { UUID, UUIDV4, DATE } = require("sequelize");
const conn = require("./conn");

const Day = conn.define("day", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DATE,
    allowNull: false,
  },
});

module.exports = Day;
