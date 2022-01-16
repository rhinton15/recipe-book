<template>
  <div class="content">
    <recipe-card
      v-for="recipe in recipes"
      :key="recipe.title"
      :name="recipe.title"
      :url="recipe.imageUrl"
      :id="recipe._id.toString()"
    ></recipe-card>
  </div>
</template>

<script>
import RecipeCard from "./RecipeCard.vue";

export default {
  props: ["recipes"],
  components: { RecipeCard },
};
</script>

<style scoped>
.content {
  margin: auto;
}

@media (min-width: 320px) {
  .content {
    width: 320px;
  }
}

@media (min-width: 640px) {
  .content {
    width: 640px;
  }
}

@media (min-width: 960px) {
  .content {
    width: 960px;
  }
}

@media (min-width: 1280px) {
  .content {
    width: 1280px;
  }
}
</style>
