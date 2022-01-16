exports.isTemplate = ($) => {
  return $(".wprm-recipe-name").length > 0;
};

exports.extractRecipe = ($) => {
  const title = $(".wprm-recipe-name").first().text();
  const prepTime = $(".wprm-recipe-prep_time").parent().first().text();
  const cookTime = $(".wprm-recipe-cook_time").parent().first().text();
  const totalTime = $(".wprm-recipe-total_time").parent().first().text();
  const servings = $(".wprm-recipe-servings").first().text();
  const calories = $(".wprm-recipe-calories").first().text();

  const ingredients = [];
  $(".wprm-recipe-ingredient-group")
    .find("ul > li")
    .each((_idx, el) => {
      const ingredient = $(el).text();
      ingredients.push(ingredient);
    });

  const instructions = [];
  $(".wprm-recipe-instruction-group")
    .find("ul > li")
    .each((_idx, el) => {
      const instruction = $(el).text().trim();
      instructions.push(instruction);
    });

  const notes = [];
  $(".wprm-recipe-notes")
    .find("ul > li")
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
