const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  avatar: {
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
  about: {
    type: TEXT,
  },
});

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticateFacebook = async function (code) {
  const response = await axios({
    url: "https://graph.facebook.com/v17.0/oauth/access_token",
    method: "get",
    params: {
      client_id: process.env.APP_ID_GOES_HERE,
      client_secret: process.env.APP_SECRET_GOES_HERE,
      redirect_url: "https://www.localhost/3000/",
      code,
    },
  });

  // // let response = await axios.post(
  // //   'https://graph.facebook.com/v17.0/oauth/access_token',
  // //   {
  // //     client_id: process.env.client_id,
  // //     client_secret: process.env.client_secret,
  // //     code
  // //   },
  // //   {
  // //     headers: {
  // //       accept: 'application/json'
  // //     }
  // //   }
  // // );
  // // if(response.data.error){
  // //   const error = Error(response.data.error);
  // //   error.status = 401;
  // //   throw error;
  // // }
  // response = await axios.get(
  //   'https://graph.facebook.com/v17.0/oauth/access_token',
  //   {
  //     headers: {
  //       Authorization: `Bearer ${ response.data.access_token}`
  //     }
  //   }
  // );

  const login = response.data.login;
  let user = await User.findOne({
    where: {
      username: login,
    },
  });
  if (!user) {
    user = await User.create({
      username: login,
    });
  }
  return user.generateToken();
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

User.prototype.getFriends = async function () {
  return await conn.models.user.findByPk(this.id, {
    include: [
      {
        model: User,
        as: "friender",
        attributes: ["id", "username", "avatar"],
      },
      {
        model: User,
        as: "friendee",
        attributes: ["id", "username", "avatar"],
      },
    ],
  });
};

User.prototype.updateFriend = async function (updated) {
  const friend = await conn.models.friendship.findByPk(updated.id);
  await friend.update(updated);
  return this.getFriends();
};

User.prototype.removeFriend = async function (id) {
  const friend = await conn.models.friendship.findByPk(id);
  await friend.destroy();
  return this.getFriends();
};

User.prototype.addFriend = async function ({ id }) {
  await conn.models.friendship.create({
    friender_id: this.id,
    friendee_id: id,
  });
  return this.getFriends();
};

module.exports = User;
