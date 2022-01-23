export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
    };
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes = payload.recipes;
    },
  },
  actions: {
    async loadRecipes(context) {
      const response = await fetch(process.env.VUE_APP_API_URL + "/recipes");
      const { recipes } = await response.json();

      context.commit("setRecipes", {
        recipes,
      });
    },
    async addRecipe(context, payload) {
      return context.dispatch("updateRecipe", {
        url: process.env.VUE_APP_API_URL + "/recipe",
        method: "POST",
        body: payload.body,
      });
    },
    async editRecipe(context, payload) {
      return context.dispatch("updateRecipe", {
        url: process.env.VUE_APP_API_URL + "/recipe/" + payload.recipeId,
        method: "PUT",
        body: payload.body,
      });
    },
    async deleteRecipe(context, payload) {
      return context.dispatch("updateRecipe", {
        url: process.env.VUE_APP_API_URL + "/recipe/" + payload.recipeId,
        method: "DELETE",
      });
    },
    async updateRecipe(context, payload) {
      const response = await fetch(payload.url, {
        method: payload.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootGetters.token,
        },
        body: JSON.stringify(payload.body),
      });
      const { recipeId } = await response.json();

      const newRecipes = context.state.recipes.filter(
        (recipe) => recipe._id.toString() !== recipeId
      );

      if (payload.method !== "DELETE") {
        const newRecipe = {
          _id: recipeId.toString(),
          userId: context.rootGetters.userId,
          title: payload.body.title,
          imageUrl: payload.body.imageUrl,
        };

        // insert in alphabetical order
        const insertPosition = newRecipes.findIndex(
          (recipe) => recipe.title > newRecipe.title
        );
        if (insertPosition === -1) {
          newRecipes.push(newRecipe);
        } else {
          newRecipes.splice(insertPosition, 0, newRecipe);
        }
      }

      context.commit("setRecipes", {
        recipes: newRecipes,
      });
    },
  },
  getters: {
    myRecipes(state, getters, rootState, rootGetters) {
      return state.recipes.filter(
        (recipe) => recipe.userId === rootGetters.userId
      );
    },
    otherRecipes(state, getters, rootState, rootGetters) {
      return state.recipes.filter(
        (recipe) =>
          !rootGetters.isAuthenticated || recipe.userId !== rootGetters.userId
      );
    },
  },
};
