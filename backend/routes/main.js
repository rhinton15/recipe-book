const path = require("path");
const express = require("express");

const mainController = require("../controllers/main");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/recipes", mainController.getRecipes);
router.get("/my-recipes", isAuth, mainController.getMyRecipes);
router.get("/recipe/:recipeId", mainController.getRecipe);
router.put("/recipe/:recipeId", isAuth, mainController.putRecipe);
router.post("/recipe", isAuth, mainController.postRecipe);
router.delete("/recipe/:recipeId", isAuth, mainController.deleteRecipe);
router.get("/scrape-recipe", mainController.scrapeRecipe);

module.exports = router;
