const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;
const axios = require("axios");
const socketMap = require("../socketMap");

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  facebook_id: {
    type: STRING,
    unique: true,
  },
  facebook_username: {
    type: STRING,
    unique: true,
  },
  password: {
    type: STRING,
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
// I may need to switch this out:
User.prototype.generateToken = function () {
  if (!process.env.JWT) {
    return jwt.sign({ id: this.id }, JWT);
  }
  return {
    token: jwt.sign({ id: this.id }, process.env.JWT),
  };
};
// User.prototype.generateToken = function () {
//   return jwt.sign({ id: this.id }, JWT);
// };

User.authenticateFacebook = async function (code) {
  let response = await axios.get(
    `https://graph.facebook.com/v17.0/oauth/access_token?client_id=${process.env.facebook_client_id}&client_secret=${process.env.facebook_client_secret}&code=${code}&redirect_uri=${process.env.facebook_redirect_uri}/api/auth/facebook`
  );
  if (response.data.error) {
    const error = Error(response.data.error);
    error.status = 401;
    throw error;
  }
  response = await axios.get(
    `https://graph.facebook.com/me?access_token=${response.data.access_token}`
  );
  console.log(response.data.name);
  const id = response.data.id;
  let user = await User.findOne({
    where: {
      facebook_id: id,
    },
  });
  if (!user) {
    user = await User.create({
      facebook_id: id,
      facebook_username: response.data.name,
    });
  }
  return user.generateToken();
};
// User.authenticate = async function (credentials) {
//   const { username, password } = credentials;
//   const user = await this.findOne({
//     where: {
//       username,
//     },
//   });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     const error = Error("bad credentials");
//     error.status = 401;
//     throw error;
//   }
//   return user.generateToken();
// };

// older code....
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

/*User.prototype.getFriends = async function () {
  return await conn.models.user.findByPk(this.id, {
    include: [
      {
        model: User,
        as: "friender",
        attributes: ["id", "username"],
      },
      {
        model: User,
        as: "friendee",
        attributes: ["id", "username"],
      },
    ],
  });
};*/

User.register = async function (credentials) {
  const user = await this.create(credentials);
  return user.generateToken();
};

/*
//this needs work
User.prototype.addFriend = async function ({ id }) {
  const friendship = await conn.models.friendship.create({
    friender_id: this.id,
    friendee_id: id,
  });
  const friend = await conn.models.user.findByPk(friendship.friender_id, {
    include: [
      {
        model: User,
        as: "friender",
        attributes: ["id", "username"],
      },
      {
        model: User,
        as: "friendee",
        attributes: ["id", "username"],
      },
    ],
  });
  //friend.friendship = friendship;
  //console.log("new friend", friend);
  return this.getFriends();
};

User.prototype.updateFriend = async function (updated) {
  const friendship = await conn.models.friendship.findByPk(updated.id);
  await friendship.update(updated);
  return this.getFriends();
};

User.prototype.unfriend = async function (id) {
  const friendship = await conn.models.friendship.findByPk(id);
  await friendship.destroy();
  return this.getFriends();
};*/

User.prototype.sendMessage = async function (message) {
  message = await conn.models.message.create({ ...message, fromId: this.id });
  message = await conn.models.message.findByPk(message.id, {
    include: [
      {
        model: User,
        as: "from",
        attributes: ["id", "username", "facebook_username"],
      },
      {
        model: User,
        as: "to",
        attributes: ["id", "username", "facebook_username"],
      },
    ],
  });
  if (socketMap[message.toId]) {
    socketMap[message.toId].socket.send(
      JSON.stringify({ type: "CREATE_MESSAGE", message })
    );
  }
  return message;
};

User.prototype.messagesForUser = function () {
  return conn.models.message.findAll({
    order: [["createdAt"]],
    where: {
      [conn.Sequelize.Op.or]: [
        {
          toId: this.id,
        },
        {
          fromId: this.id,
        },
      ],
    },
    include: [
      {
        model: User,
        as: "from",
        attributes: ["username", "id", "facebook_username"],
      },
      {
        model: User,
        as: "to",
        attributes: ["username", "id", "facebook_username"],
      },
    ],
  });
};

module.exports = User;
