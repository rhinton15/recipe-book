<template>
  <div v-if="recipes && recipes.length === 0">
    <p>You have no recipes :(</p>
    <base-button to="/new-recipe">Add one</base-button>
  </div>
  <div v-else>
    <base-button to="/new-recipe" class="btn-add">+</base-button>
    <recipe-list :recipes="recipes"></recipe-list>
  </div>
</template>

<script>
import RecipeList from "../components/recipe/RecipeList.vue";

export default {
  components: { RecipeList },
  computed: {
    recipes() {
      return this.$store.getters["recipes/myRecipes"];
    },
  },
};
</script>

<style scoped>
.btn-add {
  height: 50px;
  width: 50px;
  border-radius: 25px !important;
  font-size: 40px;
  line-height: 36px;
  position: fixed;
  bottom: 25px;
  right: 25px;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.5);
}
</style>
