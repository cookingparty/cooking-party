const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER, ENUM } = conn.Sequelize;

const Comment = conn.define("comment", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  subject: {
    type: STRING,
  },
  body: {
    type: TEXT,
    allowNull: false,
  },
  rating: {
    type: INTEGER,
    validate: {
      isInt: true,
      min: 1,
      max: 5,
    },
  },
  isReview: {
    type: BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: ENUM("APPROVED", "PENDING", "DENIED"),
    defaultValue: "APPROVED", // change back to PENDING
  },
});

module.exports = Comment;
