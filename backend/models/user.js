const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  menu: [
    {
      date: Date,
      meals: {
        breakfast: [
          {
            title: String,
            recipeId: {
              type: Schema.Types.ObjectId,
              ref: "Recipe",
              required: true,
            },
          },
        ],
        lunch: [
          {
            title: String,
            recipeId: {
              type: Schema.Types.ObjectId,
              ref: "Recipe",
              required: true,
            },
          },
        ],
        dinner: [
          {
            title: String,
            recipeId: {
              type: Schema.Types.ObjectId,
              ref: "Recipe",
              required: true,
            },
          },
        ],
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
