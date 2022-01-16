exports.isTemplate = ($) => {
  return $(".mv-create-title").length > 0;
};

exports.extractRecipe = ($) => {
  const title = $(".mv-create-title").first().text();
  const prepTime = $(".mv-create-time-prep .mv-create-time-format").text();
  const cookTime = $(".mv-create-time-active .mv-create-time-format").text();
  const totalTime = $(".mv-create-time-total .mv-create-time-format").text();
  const servings = $(".wprm-recipe-servings").first().text();
  const calories = $(".wprm-recipe-calories").first().text();

  const ingredients = [];
  $(".mv-create-ingredients")
    .find("ul > li")
    .each((_idx, el) => {
      const ingredient = $(el).text().trim();
      if (ingredients) ingredients.push(ingredient);
    });

  const instructions = [];
  $(".mv-create-instructions")
    .find("ol > li")
    .each((_idx, el) => {
      const instruction = $(el).text().trim();
      if (instructions) instructions.push(instruction);
    });

  const notes = [];
  $(".mv-create-notes-content").each((_idx, el) => {
    const note = $(el).text().trim();
    if (note) notes.push(note);
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
