<template>
  <recipe-list :recipes="recipes"></recipe-list>
</template>

<script>
import RecipeList from "../components/recipe/RecipeList.vue";

export default {
  components: { RecipeList },
  computed: {
    recipes() {
      return this.$store.getters["recipes/otherRecipes"];
    },
  },
};
</script>
