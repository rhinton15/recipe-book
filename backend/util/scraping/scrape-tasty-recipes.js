exports.isTemplate = ($) => {
  return (
    $(".tasty-recipes-title").length > 0 ||
    $(".tasty-recipes-entry-header").find("h2").length > 0
  );
};

exports.extractRecipe = ($) => {
  const title =
    $(".tasty-recipes-title").first().text() ||
    $(".tasty-recipes-entry-header").find("h2").first().text();
  const prepTime =
    $(".tasty-recipes-prep-time").first().text() ||
    $(".prep-time").first().text();
  const cookTime =
    $(".tasty-recipes-cook-time").first().text() ||
    $(".cook-time").first().text();
  const totalTime =
    $(".tasty-recipes-total-time").first().text() ||
    $(".total-time").first().text();
  const servings = $(".tasty-recipes-yield span:first-child").first().text();
  const calories = "";

  const ingredients = [];
  $(".tasty-recipes-ingredients")
    .find("ul > li")
    .each((_idx, el) => {
      const ingredient = $(el).text();
      ingredients.push(ingredient);
    });
  $(".tasty-recipe-ingredients")
    .find("ul > li")
    .each((_idx, el) => {
      const ingredient = $(el).text();
      ingredients.push(ingredient);
    });
  $(".tasty-recipe-ingredients")
    .find("p")
    .each((_idx, el) => {
      const ingredient = $(el).text();
      ingredients.push(ingredient);
    });

  const instructions = [];
  $(".tasty-recipes-instructions")
    .find("ol > li")
    .each((_idx, el) => {
      const instruction = $(el).text().trim();
      instructions.push(instruction);
    });
  $(".tasty-recipe-instructions")
    .find("ol > li")
    .each((_idx, el) => {
      const instruction = $(el).text().trim();
      instructions.push(instruction);
    });

  const notes = [];
  $(".tasty-recipes-notes")
    .find("ul > li")
    .each((_idx, el) => {
      const note = $(el).text();
      notes.push(note);
    });
  $(".tasty-recipes-notes")
    .find("p")
    .each((_idx, el) => {
      const note = $(el).text();
      notes.push(note);
    });

  return {
    title,
    prepTime,
    cookTime,
    totalTime,
    servings,
    calories,
    ingredients,
    steps: instructions,
    notes,
  };
};
