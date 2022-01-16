<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <div v-else>
    <recipe-list :recipes="recipes"></recipe-list>
  </div>
</template>

<script>
import RecipeList from "../components/recipe/RecipeList.vue";

export default {
  components: { RecipeList },
  data() {
    return {
      recipes: [],
      isLoading: true,
    };
  },
  async beforeMount() {
    try {
      const response = await fetch(process.env.VUE_APP_API_URL + "/recipes", {
        headers: { Authorization: "Bearer " + this.$store.getters.token },
      });
      const { recipes } = await response.json();
      this.recipes = recipes;
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  },
};
</script>
