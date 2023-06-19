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
const Favorite = require("./Favorite");
const MealRecipe = require("./MealRecipe");

Recipe.belongsTo(User);
User.hasMany(Recipe);

Recipe.belongsToMany(User, {
  as: "recipe",
  foreignKey: "recipe_id",
  through: Favorite,
});

Ingredient.belongsTo(Recipe);
Recipe.hasMany(Ingredient);

Instruction.belongsTo(Recipe);
Recipe.hasMany(Instruction);

// Recipe.belongsTo(MealRecipe);
Recipe.belongsToMany(Meal, {
  // foreignKey: "recipe_Id",
  through: MealRecipe,
});
MealRecipe.belongsTo(Recipe);
MealRecipe.belongsTo(Meal);
Meal.hasMany(MealRecipe);

Meal.belongsTo(Day);
Day.hasMany(Meal);

Day.belongsTo(User);
User.hasMany(Day);

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

  const weLoveSushi = await Group.create({
    name: "we love sushi!!!",
    description: "for sushi lovers",
    status: "APPROVED",
  });

  const grannyGroup = await Group.create({
    name: "Sunday Night Dinners at Granny's",
    description: "For preserving Granny's recipes, and our own new ones!",
    status: "APPROVED",
    isPrivate: true,
  });

  const bakingGroup = await Group.create({
    name: "Baking Bonanza",
    description:
      "A group dedicated to all things baking! Share your favorite baking recipes, tips, and tricks with fellow baking enthusiasts.reserving Granny's recipes, and our own new ones!",
    status: "APPROVED",
  });

  const veganGroup = await Group.create({
    name: "Vegan Delights",
    description:
      "A group for vegans and plant-based enthusiasts. Discover and exchange delicious vegan recipes, discuss vegan cooking techniques, and support each other on the vegan journey.",
    status: "APPROVED",
  });

  const internationalGroup = await Group.create({
    name: "International Flavors",
    description:
      "Explore the diverse world of international cuisines in this group. Share recipes, cultural food traditions, and embark on a culinary adventure together.",
    status: "APPROVED",
  });

  await Membership.create({
    member_id: lucy.id,
    groupId: cookingParty.id,
    role: "Group Admin",
    status: "APPROVED",
  });

  await Membership.create({
    member_id: larry.id,
    groupId: grannyGroup.id,
    role: "Group Admin",
    status: "APPROVED",
  });

  await Membership.create({
    member_id: ethyl.id,
    groupId: bakingGroup.id,
    role: "Group Admin",
    status: "APPROVED",
  });

  await Membership.create({
    member_id: lucy.id,
    groupId: veganGroup.id,
    role: "Group Admin",
    status: "APPROVED",
  });

  await Membership.create({
    member_id: lucy.id,
    groupId: internationalGroup.id,
    role: "Group Admin",
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

  const aperolSpritz = await Recipe.create({
    title: "Aperol Spritz",
    description: "Make the summer drink that will delight everyone this summer",
    imageURL: "https://images.unsplash.com/photo-1560512823-829485b8bf24",
  });

  const roastedEggplantwithvegetablesandyogurt = await Recipe.create({
    title: "Roasted Eggplant With Vegetables And A Yogurt Sauce",
    description:
      "A beautiful vegetarian dish inspired by Greece using Eggplants, roasted pepper and a tangy yoghurt sauce made with sheep feta.",
    imageURL: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
  });

  const asianMushroomSoupWithGlassNoodles = await Recipe.create({
    title: "Asian Mushroom Soup With Glass Noodles",
    description:
      "A light and flavourful soup with several varieties of mushrooms, glass noodles and summer vegetables.",
    imageURL: "https://images.unsplash.com/photo-1511910849309-0dffb8785146",
  });

  const classicRoastChicken = await Recipe.create({
    title: "Classic Roast Chicken",
    description:
      " Perfect your dinner party skills with this perfect Roasted Chicken recipe.",
    imageURL: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6",
  });

  const limeAndMintCoolerWithGin = await Recipe.create({
    title: "Lime And Mint Cooler With Gin",
    description:
      "A refreshing summer cooler with Lime and Mint and your favourite Gin.",
    imageURL: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03",
  });

  const chocolateCookies = await Recipe.create({
    title: "The Best Chocolate Cookies",
    description: "Chocolate cookies that melt in your mouth!",
    imageURL: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
  });

  const overnightOatsWithStrawberries = await Recipe.create({
    title: "Classic Chocolate Brownies",
    description: "Overnight Oats with Strawberries",
    imageURL: "https://images.unsplash.com/photo-1654584240523-6b8d3f6c33b4",
  });

  const classicChocolateBrownies = await Recipe.create({
    title: "Classic Chocolate Brownies",
    description: "brownies",
    imageURL: "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
    userId: moe.id,
  });

  const edamame = await Recipe.create({
    title: "Quick and Easy Salted Edamame",
    description:
      "Enjoy your delicious and nutritious salted edamame as a snack or appetizer. They make a great addition to any meal or gathering.",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1666318300285-37575cdfa659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    groupId: weLoveSushi.id,
  });

  await Promise.all([
    Instruction.create({
      listOrder: 1,
      specification:
        "Preheat your oven to 350°F (175°C). Grease a 9x13-inch baking dish and set it aside,",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 2,
      specification:
        "In a microwave-safe bowl, melt the butter. Once melted, add the granulated sugar and stir until well combined.",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 3,
      specification:
        "Add the eggs, one at a time, to the butter and sugar mixture. Mix well after each addition. Stir in the vanilla extract.",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 4,
      specification:
        "In a separate bowl, whisk together the all-purpose flour, cocoa powder, and salt.",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 5,
      specification:
        "Gradually add the dry ingredients to the wet ingredients, mixing until just combined. Do not overmix.",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 6,
      specification:
        "Fold in the chocolate chips, reserving a handful for sprinkling on top.",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 7,
      specification:
        "Pour the brownie batter into the prepared baking dish and spread it evenly. Sprinkle the remaining chocolate chips on top.",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 8,
      specification:
        "Bake in the preheated oven for 25-30 minutes, or until a toothpick inserted into the center comes out with a few moist crumbs. Be careful not to overbake, as you want the brownies to be fudgy.",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 9,
      specification:
        "Once baked, remove the brownies from the oven and allow them to cool completely in the baking dish. ",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 10,
      specification:
        "Cut the brownies into squares and serve. They can be stored in an airtight container at room temperature for up to 3 days.",
      recipeId: classicChocolateBrownies.id,
    }),
    Instruction.create({
      listOrder: 1,
      specification:
        "Bring a pot of water to a boil. Add a generous amount of salt to the boiling water.",
      recipeId: edamame.id,
    }),
    Instruction.create({
      listOrder: 2,
      specification:
        "Add the edamame pods to the boiling water and cook for about 5 minutes or until they are tender.",
      recipeId: edamame.id,
    }),
    Instruction.create({
      listOrder: 3,
      specification:
        "Drain the cooked edamame pods and transfer them to a serving bowl.",
      recipeId: edamame.id,
    }),
    Instruction.create({
      listOrder: 4,
      specification:
        "Sprinkle additional salt over the edamame pods according to your taste preference. Toss the pods gently to coat them evenly with salt.",
      recipeId: edamame.id,
    }),
    Instruction.create({
      listOrder: 5,
      specification:
        "Serve the salted edamame immediately while they are still warm.",
      recipeId: edamame.id,
    }),
  ]);

  await Promise.all([
    Ingredient.create({
      name: "unsalted butter",
      amount: 1,
      recipeId: classicChocolateBrownies.id,
      measurementUnit: "cup",
    }),
    Ingredient.create({
      name: "granulated sugar",
      amount: 2,
      recipeId: classicChocolateBrownies.id,
      measurementUnit: "cup",
    }),
    Ingredient.create({
      name: "large eggs",
      amount: 4,
      recipeId: classicChocolateBrownies.id,
    }),
    Ingredient.create({
      name: "vanilla extract",
      amount: 1,
      recipeId: classicChocolateBrownies.id,
      measurementUnit: "tsp",
    }),
    Ingredient.create({
      name: "all-purpose flour",
      amount: 1,
      recipeId: classicChocolateBrownies.id,
      measurementUnit: "cup",
    }),
    Ingredient.create({
      name: "unsweetened cocoa powder",
      amount: 1 / 2,
      recipeId: classicChocolateBrownies.id,
      measurementUnit: "cup",
    }),
    Ingredient.create({
      name: "salt",
      amount: 1,
      recipeId: classicChocolateBrownies.id,
      measurementUnit: "tsp",
    }),
    Ingredient.create({
      name: "semi-sweet chocolate chips",
      amount: 1,
      recipeId: classicChocolateBrownies.id,
      measurementUnit: "cup",
    }),
    Ingredient.create({
      name: "Edamame pods (frozen or fresh)",
      amount: 1,
      recipeId: edamame.id,
      measurementUnit: "cup",
    }),
    Ingredient.create({
      name: "Water",
      amount: 2,
      recipeId: edamame.id,
      measurementUnit: "cups",
    }),
    Ingredient.create({
      name: "Salt",
      amount: 1,
      recipeId: edamame.id,
      measurementUnit: "sprinkle to taste",
    }),
  ]);

  const bread = await Recipe.create({
    title: "Easy Loaf of Bread",
    description: "bread",
    imageURL:
      "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image_2x/public/2020-02/the-easiest-loaf-of-bread-youll-ever-bake.jpg?itok=LsBnSw0g",
    groupId: cookingParty.id,
  });

  await Favorite.create({
    recipe_id: bread.id,
    userId: moe.id,
  });
  await Promise.all([
    Instruction.create({
      listOrder: 1,
      specification:
        "Weigh your flour; or measure it by gently spooning it into a cup, then sweeping off any excess. Stir together all of the ingredients (except the cornmeal) in a large bowl, starting with 4 1/2 cups of the flour.",
      recipeId: bread.id,
    }),
    Instruction.create({
      listOrder: 2,
      specification:
        "Use a sturdy spoon, or your stand mixer equipped with the beater paddle. Mix until everything comes together in a rough, shaggy mass of dough.If you're kneading the dough by hand, turn it out onto a lightly floured surface, using some of the additional 1/2 cup of flour called for",
      recipeId: bread.id,
    }),
    Instruction.create({
      listOrder: 3,
      specification:
        "Fold the far edge of the dough back over on itself towards you, then press it away from you with the heels of your hands. Rotate the dough 90°. Repeat this fold-press-rotate process with a rhythmic, rocking motion for about 6 minutes.",
      recipeId: bread.id,
    }),
    Instruction.create({
      listOrder: 4,
      specification: "When fully kneaded, the dough will be bouncy and smooth.",
      recipeId: bread.id,
    }),
  ]);

  const [flour, sugar, instantYeast, saltBread, lukewarmWater, yellowCornmeal] =
    await Promise.all([
      Ingredient.create({
        name: "flour",
        amount: 4.5,
        recipeId: bread.id,
        measurementUnit: "cup",
      }),
      Ingredient.create({
        name: "granulated sugar",
        amount: 1,
        recipeId: bread.id,
        measurementUnit: "tbsp",
      }),
      Ingredient.create({
        name: "instant yeast",
        amount: 2.25,
        recipeId: bread.id,
        measurementUnit: "tsp",
      }),
      Ingredient.create({
        name: "salt",
        amount: 2.5,
        recipeId: bread.id,
        measurementUnit: "tsp",
      }),
      Ingredient.create({
        name: "lukewarm water",
        amount: 1.33,
        recipeId: bread.id,
        measurementUnit: "cup",
      }),
      Ingredient.create({
        name: "yellow cornmeal",
        recipeId: bread.id,
        measurementUnit: "",
      }),
    ]);

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

  const june = await Day.create({
    date: "2023-06-11",
    userId: moe.id,
  });
  const juneTwelve = await Day.create({
    date: "2023-06-12",
    userId: moe.id,
  });

  const ethylJune = await Day.create({
    date: "2023-06-12",
    userId: ethyl.id,
  });

  const breakfast = await Meal.create({
    type: "breakfast",
    dayId: june.id,
  });

  const breakfastEthyl = await Meal.create({
    type: "breakfast",
    dayId: ethylJune.id,
  });

  const breakfastTwelve = await Meal.create({
    type: "breakfast",
    dayId: juneTwelve.id,
  });

  const bagel = await Recipe.create({
    title: "bagel",
    description: "bagel",
  });

  const oatmeal = await Recipe.create({
    title: "oatmeal",
    description: "oatmeal",
  });
  const meal = await MealRecipe.create({
    mealId: breakfast.id,
    recipeId: bagel.id,
  });

  const ethylMeal = await MealRecipe.create({
    mealId: breakfastEthyl.id,
    recipeId: bagel.id,
  });

  const mealTwo = await MealRecipe.create({
    mealId: breakfastTwelve.id,
    recipeId: bagel.id,
  });

  const moreBreakfast = await MealRecipe.create({
    mealId: breakfastTwelve.id,
    recipeId: oatmeal.id,
  });

  const lunch = await Meal.create({
    type: "lunch",
    dayId: june.id,
  });

  const dinner = await Meal.create({
    type: "dinner",
    dayId: june.id,
  });

  const salad = await Recipe.create({
    title: "salad",
    description: "salad",
  });

  const smoothie = await Recipe.create({
    title: "smoothie",
    description: "smoothie",
    // mealId: lunch.id,
  });

  const steak = await Recipe.create({
    title: "steak",
    description: "steak",
  });

  await MealRecipe.create({
    mealId: lunch.id,
    recipeId: salad.id,
  });
  await MealRecipe.create({
    mealId: lunch.id,
    recipeId: smoothie.id,
  });
  await MealRecipe.create({
    mealId: dinner.id,
    recipeId: steak.id,
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
  Favorite,
  Ingredient,
  Instruction,
  MealRecipe,
  Day,
  Meal,
  Message,
};
