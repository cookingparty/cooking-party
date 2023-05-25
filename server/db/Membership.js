const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER, ENUM } = conn.Sequelize;

const Membership = conn.define("membership", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  role: {
    type: ENUM ('Group Admin', 'member'),
  },
  status: {
    // approval by group admin
    type: ENUM("APPROVED", "PENDING", "DENIED"),
    defaultValue: "APPROVED", // change back to PENDING
  },
});

module.exports = Membership;
