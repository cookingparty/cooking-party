const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;

const Recipe = conn.define("recipe", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  ingredients: {
    type: TEXT,
    allowNull: false,
  },
  instructions: {
    type: TEXT,
    allowNull: false,
  },
  image: {
    type: TEXT,
    get: function () {
      const prefix_PNG = "data:image/png;base64,";
      const prefix_JPEG = "data:image/jpeg;base64,";
      const prefix_JPG = "data:image/jpg;base64,";

      const data = this.getDataValue("avatar");
      if (!data) {
        return data;
      }
      if (data.startsWith(prefix_JPEG || prefix_PNG || prefix_JPG)) {
        return data;
      }
      return `${prefix_JPEG || prefix_PNG || prefix_JPG}${data}`;
    },
  },
  imageURL: {
    type: TEXT,
  },
  isCocktail: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Recipe;
