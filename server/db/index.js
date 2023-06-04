const conn = require("./conn");
const User = require("./User");
const Recipe = require("./Recipe");
const Comment = require("./Comment");
const Friendship = require("./Friendship");
const Membership = require("./Membership");
const Group = require("./Group");
const Message = require("./Message");

Recipe.belongsTo(User);
User.hasMany(Recipe);

Comment.belongsTo(Recipe);
Comment.belongsTo(User);
User.hasMany(Comment);
Recipe.hasMany(Comment);

Message.belongsTo(User, { as: "from" });
Message.belongsTo(User, { as: "to" });

User.belongsToMany(User, {
  as: "friender",
  foreignKey: "friender_id",
  otherKey: "friendee_id",
  through: Friendship,
});
User.belongsToMany(User, {
  as: "friendee",
  foreignKey: "friendee_id",
  otherKey: "friender_id",
  through: Friendship,
});

User.belongsToMany(Group, {
  as: "member",
  foreignKey: "member_id",
  through: Membership,
});
Group.hasMany(User);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: "moe", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "ethyl", password: "123", isAdmin: true }),
  ]);

  await Promise.all([
    Message.create({
      txt: "can you talk me through the cookie recipe you sent? my dough is coming out super thin",
      fromId: moe.id,
      toId: lucy.id,
    }),
    Message.create({
      txt: "what should i even make tonight?? out of ideas",
      fromId: moe.id,
      toId: ethyl.id,
    }),
  ]);
  await Message.create({
    txt: "sure moe! did you try adding a little extra flour?",
    fromId: lucy.id,
    toId: moe.id,
  });

  await Friendship.create({
    friender_id: moe.id,
    friendee_id: lucy.id,
    status: "CONFIRMED",
  });

  await Friendship.create({
    friender_id: ethyl.id,
    friendee_id: moe.id,
    status: "PENDING",
  });

  const cookingParty = await Group.create({
    name: "cooking party",
    description: "the best cooking group around",
    status: "APPROVED",
    isPrivate: true,
  });

  await Membership.create({
    member_id: lucy.id,
    groupId: cookingParty.id,
    role: "Group Admin",
  });

  await Recipe.create({
    title: "Classic Chocolate Brownies",
    ingredients:
      "1 cup unsalted butter, 2 cups granulated sugar,4 large eggs, 1 teaspoon vanilla extract, 1 cup all-purpose flour, 1/2 cup unsweetened cocoa powder, 1/2 teaspoon salt, 1 cup semi-sweet chocolate chips",
    instructions:
      "1. Preheat your oven to 350°F (175°C). Grease a 9x13-inch baking dish and set it aside, 2. In a microwave-safe bowl, melt the butter. Once melted, add the granulated sugar and stir until well combined. 3. Add the eggs, one at a time, to the butter and sugar mixture. Mix well after each addition. Stir in the vanilla extract. 4. In a separate bowl, whisk together the all-purpose flour, cocoa powder, and salt. 5. Gradually add the dry ingredients to the wet ingredients, mixing until just combined. Do not overmix. 6. Fold in the chocolate chips, reserving a handful for sprinkling on top. 7. Pour the brownie batter into the prepared baking dish and spread it evenly. Sprinkle the remaining chocolate chips on top. 8. Bake in the preheated oven for 25-30 minutes, or until a toothpick inserted into the center comes out with a few moist crumbs. Be careful not to overbake, as you want the brownies to be fudgy. 9. Once baked, remove the brownies from the oven and allow them to cool completely in the baking dish. 10. Cut the brownies into squares and serve. They can be stored in an airtight container at room temperature for up to 3 days.",
    imageURL: "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
  });

  await Comment.create({
    subject: "Heavenly Chocolate Delight!",
    body: "I tried this brownie recipe for a family gathering, and it was an absolute hit! The brownies turned out incredibly fudgy and rich in chocolate flavor. The recipe was easy to follow, and the ingredients were readily available in my pantry. The addition of chocolate chips added an extra burst of gooey goodness. I received so many compliments and requests for the recipe. These brownies are now a staple in our household!",
    rating: 5,
    isReview: true,
    status: "APPROVED",
  });
  await Comment.create({
    subject: "Perfectly Chewy and Decadent",
    body: "I am a self-proclaimed brownie enthusiast, and this recipe exceeded my expectations. The texture was spot on - chewy on the inside with a slightly crispy crust. The amount of cocoa powder provided just the right amount of chocolate intensity, and the chocolate chips added delightful pockets of melted chocolate throughout. They were a breeze to make, and my whole family enjoyed every bite. These brownies have definitely earned a permanent place in my recipe collection.",
    rating: 5,
    isReview: true,
    status: "APPROVED",
  });
  await Comment.create({
    subject: "Simply Divine!",
    body: "These brownies are out of this world! I followed the recipe exactly, and the result was absolute perfection. The brownies were incredibly moist and indulgent, with a deep chocolate flavor that left me craving more. They were a hit at my office potluck, and I even had colleagues asking for the recipe. This is now my go-to brownie recipe, and I highly recommend it to all chocolate lovers out there. Trust me, you won't be disappointed!",
    rating: 5,
    isReview: true,
    status: "APPROVED",
  });

  return {
    users: {
      moe,
      lucy,
      larry,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Recipe,
  Comment,
  Friendship,
  Membership,
  Group,
};
