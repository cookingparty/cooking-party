const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER, ENUM } = conn.Sequelize;

const Group = conn.define("group", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  status: {
    // approval by site admin
    type: ENUM("APPROVED", "PENDING", "DENIED"),
    defaultValue: "APPROVED", // change back to PENDING
  },
  isPrivate: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Group;
