const conn = require("./conn");
const User = require("./User");
const Recipe = require("./Recipe");
const Comment = require("./Comment");
const Friendship = require("./Friendship");
const Membership = require("./Membership");
const Group = require("./Group");
const Message = require("./Message");
const Ingredient = require("./Ingredient");
const Instruction = require("./Instruction");
const Meal = require("./Meal");
const Day = require("./Day");
const MeasurementUnit = require("./MeasurementUnit");

Recipe.belongsTo(User);
User.hasMany(Recipe);

Ingredient.belongsTo(Recipe);
Recipe.hasMany(Ingredient);

MeasurementUnit.belongsTo(Ingredient);
Ingredient.hasMany(MeasurementUnit);

Instruction.belongsTo(Recipe);
Recipe.hasMany(Instruction);

Recipe.belongsTo(Meal);
Meal.hasMany(Recipe);

Meal.belongsTo(Day);
Day.hasMany(Meal);

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

Group.hasMany(Recipe);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, curly, sarah, ethyl] = await Promise.all([
    User.create({ username: "moe", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "curly", password: "123" }),
    User.create({ username: "sarah", password: "123" }),
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
    friender_id: moe.id,
    friendee_id: curly.id,
    status: "CONFIRMED",
  });

  await Friendship.create({
    friender_id: moe.id,
    friendee_id: sarah.id,
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
    status: "APPROVED",
  });

  const weLoveSushi = await Group.create({
    name: "we love sushi!!!",
    description: "for sushi lovers",
    status: "APPROVED",
  });

  await Membership.create({
    member_id: moe.id,
    groupId: weLoveSushi.id,
    role: "Group Admin",
    status: "APPROVED",
  });

  await Membership.create({
    member_id: lucy.id,
    groupId: weLoveSushi.id,
    status: "APPROVED",
  });

  const classicChocolateBrownies = await Recipe.create({
    title: "Classic Chocolate Brownies",
    description: "brownies",
    // ingredients:
    //   "1 cup unsalted butter, 2 cups granulated sugar,4 large eggs, 1 teaspoon vanilla extract, 1 cup all-purpose flour, 1/2 cup unsweetened cocoa powder, 1/2 teaspoon salt, 1 cup semi-sweet chocolate chips",
    // instructions:
    //   "1. Preheat your oven to 350°F (175°C). Grease a 9x13-inch baking dish and set it aside, 2. In a microwave-safe bowl, melt the butter. Once melted, add the granulated sugar and stir until well combined. 3. Add the eggs, one at a time, to the butter and sugar mixture. Mix well after each addition. Stir in the vanilla extract. 4. In a separate bowl, whisk together the all-purpose flour, cocoa powder, and salt. 5. Gradually add the dry ingredients to the wet ingredients, mixing until just combined. Do not overmix. 6. Fold in the chocolate chips, reserving a handful for sprinkling on top. 7. Pour the brownie batter into the prepared baking dish and spread it evenly. Sprinkle the remaining chocolate chips on top. 8. Bake in the preheated oven for 25-30 minutes, or until a toothpick inserted into the center comes out with a few moist crumbs. Be careful not to overbake, as you want the brownies to be fudgy. 9. Once baked, remove the brownies from the oven and allow them to cool completely in the baking dish. 10. Cut the brownies into squares and serve. They can be stored in an airtight container at room temperature for up to 3 days.",
    imageURL: "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
    groupId: weLoveSushi.id,
  });

  await Recipe.create({
    title: "Easy Loaf of Bread",
    description: "bread",
    // ingredients:
    //   "4 1/2 to 5 cups (540g to 600g) flour, 1 tablespoon (11g) granulated sugar, 2 1/4 teaspoons instant yeast, 2 1/2 teaspoons (15g) salt, 1 2/3 cups (379g) water, lukewarm (90°F to 110°F), yellow cornmeal, for coating the pan",
    // instructions:
    //   "Weigh your flour; or measure it by gently spooning it into a cup, then sweeping off any excess. Stir together all of the ingredients (except the cornmeal) in a large bowl, starting with 4 1/2 cups of the flour. Use a sturdy spoon, or your stand mixer equipped with the beater paddle. Mix until everything comes together in a rough, shaggy mass of dough. If you're kneading the dough by hand, turn it out onto a lightly floured surface, using some of the additional 1/2 cup of flour called for. Fold the far edge of the dough back over on itself towards you, then press it away from you with the heels of your hands. Rotate the dough 90°. Repeat this fold-press-rotate process with a rhythmic, rocking motion for about 6 minutes. When fully kneaded, the dough will be bouncy and smooth.",
    imageURL:
      "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image_2x/public/2020-02/the-easiest-loaf-of-bread-youll-ever-bake.jpg?itok=LsBnSw0g",
    groupId: cookingParty.id,
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
