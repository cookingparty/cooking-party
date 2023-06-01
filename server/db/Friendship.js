const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER, ENUM } = conn.Sequelize;

const Friendship = conn.define("friendship", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  status: {
    type: ENUM("PENDING", "CONFIRMED", "IGNORED"),
    defaultValue: "PENDING",
  },
});

module.exports = Friendship;
