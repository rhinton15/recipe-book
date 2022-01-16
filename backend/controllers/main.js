const axios = require("axios");
const cheerio = require("cheerio");

const Recipe = require("../models/recipe");
const TastyRecipes = require("../util/scraping/scrape-tasty-recipes");
const WprmRecipe = require("../util/scraping/scrape-wprm-recipe");
const MvCreate = require("../util/scraping/scrape-mv-create");
const { saveRecipe } = require("../util/saveRecipe");

const defaultImage =
  "https://rachel-recipe-book-images.s3.amazonaws.com/image-preview-icon-picture-placeholder-vector-31284806.jpg";

exports.getRecipes = async (req, res, next) => {
  try {
    let recipes = await Recipe.find().sort({ title: 1 });
    recipes = recipes.map((recipe) => {
      return {
        ...recipe._doc,
        imageUrl: recipe.imageUrl || defaultImage,
      };
    });
    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

exports.getMyRecipes = async (req, res, next) => {
  try {
    let recipes = await Recipe.find({ userId: req.userId }).sort({ title: 1 });
    recipes = recipes.map((recipe) => {
      return {
        ...recipe._doc,
        imageUrl: recipe.imageUrl || defaultImage,
      };
    });
    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

exports.getRecipe = async (req, res, next) => {
  const recipeId = req.params.recipeId;
  try {
    let recipe = await Recipe.findById(recipeId);
    recipe = {
      ...recipe._doc,
      imageUrl: recipe.imageUrl || defaultImage,
    };
    res.status(200).json({ recipe });
  } catch (error) {
    next(error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  const recipeId = req.params.recipeId;
  try {
    await Recipe.deleteOne({ _id: recipeId });
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    next(error);
  }
};

exports.putRecipe = async (req, res, next) => {
  const recipeId = req.params.recipeId;
  try {
    let recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      const error = new Error("Recipe not found");
      error.statusCode = 404;
      throw error;
    }

    if (recipe.userId.toString() !== req.userId) {
      const error = new Error("Recipe belongs to another user");
      error.statusCode = 403;
      throw error;
    }

    await saveRecipe(req, recipe);

    res.status(201).json({ recipeId: recipe._id });
  } catch (error) {
    next(error);
  }
};

exports.postRecipe = async (req, res, next) => {
  const recipeId = req.params.recipeId;
  try {
    recipe = new Recipe();

    await saveRecipe(req, recipe);

    res.status(201).json({ recipeId: recipe._id });
  } catch (error) {
    next(error);
  }
};

exports.scrapeRecipe = async (req, res, next) => {
  try {
    const url = req.query.url;
    // https://www.scrapingbee.com/blog/web-scraping-javascript/
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let recipe = {
      title: "",
      prepTime: "",
      cookTime: "",
      totalTime: "",
      servings: "",
      calories: "",
      ingredients: "",
      steps: "",
      notes: "",
    };

    if (TastyRecipes.isTemplate($)) {
      recipe = TastyRecipes.extractRecipe($);
    } else if (WprmRecipe.isTemplate($)) {
      recipe = WprmRecipe.extractRecipe($);
    } else if (MvCreate.isTemplate($)) {
      recipe = MvCreate.extractRecipe($);
    }

    const source = /^.*?[./]+(.*?.(com|net)).*$/.exec(url)[1];

    const imageUrl = $("article img")
      .map((_idx, el) => {
        return [
          el.attribs.src,
          el.attribs["data-lazy-src"],
          el.attribs["data-src"],
        ];
      })
      .get()
      .flat()
      .find(
        (url) =>
          url &&
          url.match(/^http/i) &&
          url.match(/\.jpg$|\.jpeg$|\.png$/i) &&
          !url.match(/150x150/i)
      );

    recipe = {
      ...recipe,
      source,
      url,
      imageUrl,
    };

    res.status(200).json({ recipe });
  } catch (error) {
    next(error);
  }
};
