const { UUID, UUIDV4, STRING } = require("sequelize");
const conn = require("./conn");

const MeasurementUnit = conn.define("measurementUnit", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = MeasurementUnit;
