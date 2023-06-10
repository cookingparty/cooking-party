const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER, ENUM } = conn.Sequelize;

const Favorite = conn.define("favorite", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = Favorite;
