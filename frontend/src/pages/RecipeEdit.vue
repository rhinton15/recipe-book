<template>
  <!-- <router-link :to="'/recipe/' + recipeId" class="btn btn-danger noprint"
    >Cancel</router-link
  > -->
  <button @click="$router.go(-1)" class="btn btn-danger noprint">Cancel</button>
  <recipe-form :recipeId="recipeId"></recipe-form>
  <!-- <recipe-form></recipe-form> -->
</template>

<script>
import RecipeForm from "./RecipeForm.vue";

export default {
  props: ["recipeId"],
  components: { RecipeForm },
};
</script>
