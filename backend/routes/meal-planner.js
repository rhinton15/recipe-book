const express = require("express");

const mealPlannerController = require("../controllers/meal-planner");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/menu", isAuth, mealPlannerController.getMenu);
router.get("/menu/:userId", mealPlannerController.getMenu);
router.put("/menu", isAuth, mealPlannerController.putMenu);

module.exports = router;
