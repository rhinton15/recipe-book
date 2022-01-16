const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  prepTime: String,
  cookTime: String,
  totalTime: String,
  servings: String,
  calories: String,
  source: String,
  url: String,
  imageUrl: String,
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  steps: [
    {
      type: String,
      required: true,
    },
  ],
  notes: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Recipe", recipeSchema);
