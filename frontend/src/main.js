import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import store from "./store/index.js";

import App from "./App.vue";
import AllRecipeList from "./pages/AllRecipeList.vue";
import MyRecipeList from "./pages/MyRecipeList.vue";
import MealPlanner from "./pages/MealPlanner.vue";
import Recipe from "./pages/Recipe.vue";
import RecipeEdit from "./pages/RecipeEdit.vue";
import RecipeForm from "./pages/RecipeForm.vue";
import Login from "./pages/Login.vue";

import BaseButton from "./components/ui/BaseButton";
import BaseCard from "./components/ui/BaseCard";
import BaseModal from "./components/ui/BaseModal";
import BaseSpinner from "./components/ui/BaseSpinner.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: AllRecipeList },
    { path: "/recipes", component: MyRecipeList, meta: { requiresAuth: true } },
    {
      path: "/meal-planner",
      component: MealPlanner,
      meta: { requiresAuth: true },
    },
    {
      path: "/meal-planner/:userId",
      component: MealPlanner,
      props: true,
    },
    { path: "/login", component: Login, meta: { requiresNotAuth: true } },
    { path: "/recipe/:recipeId", component: Recipe, props: true }, // add auth on backend and redirect on response if necessary
    {
      path: "/edit-recipe/:recipeId",
      component: RecipeEdit,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/new-recipe",
      component: RecipeForm,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresNotAuth && store.getters.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-modal", BaseModal);
app.component("base-spinner", BaseSpinner);

app.mount("#app");
