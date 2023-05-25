const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER } = conn.Sequelize;

const Friendship = conn.define("friendship", {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      
});

module.exports = Friendship;
