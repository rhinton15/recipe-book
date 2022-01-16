exports.saveRecipe = async (req, recipe) => {
  recipe.userId = req.userId;
  recipe.title = req.body.title;
  recipe.imageUrl = req.body.imageUrl;
  recipe.prepTime = req.body.prepTime;
  recipe.cookTime = req.body.cookTime;
  recipe.totalTime = req.body.totalTime;
  recipe.servings = req.body.servings;
  recipe.calories = req.body.calories;
  recipe.source = req.body.source;
  recipe.url = req.body.url;
  recipe.ingredients = req.body.ingredients.trim().split("\n");
  recipe.steps = req.body.steps.trim().split("\n");
  recipe.notes = req.body.notes
    .trim()
    .split("\n")
    .filter((note) => note !== "");

  await recipe.save();
};
