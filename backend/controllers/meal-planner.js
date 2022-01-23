const User = require("../models/user");

exports.getMenu = async (req, res, next) => {
  try {
    let { menu } = await User.findById(req.params.userId || req.userId);
    menu = menu.map((item) => {
      return { ...item._doc, date: item.date.toLocaleDateString("en-US") };
    });
    res.status(200).json({ menu });
  } catch (error) {
    next(error);
  }
};

exports.putMenu = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    // remove existing meal plan for this day
    user.menu = user.menu.filter(
      (item) => item.date.toLocaleDateString("en-US") !== req.body.date
    );

    user.menu.push({
      date: req.body.date,
      meals: req.body.meals,
    });

    // delete empty ones to save some space
    user.menu = user.menu.filter(
      (item) =>
        !(
          item.meals.breakfast.length === 0 &&
          item.meals.lunch.length === 0 &&
          item.meals.dinner.length === 0
        )
    );
    user.save();

    res.status(201).json();
  } catch (error) {
    next(error);
  }
};
