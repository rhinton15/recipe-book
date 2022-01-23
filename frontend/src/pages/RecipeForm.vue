<template>
  <form class="recipe-form" @submit.prevent="submit">
    <div v-if="!recipeId">
      <input
        class="form-control"
        type="text"
        placeholder="http://..."
        ref="scrapeUrl"
      />
      <base-button @click.prevent="scrapeRecipe"> Load from URL </base-button>
    </div>

    <base-form-input v-model="recipe.title" label="Title"></base-form-input>
    <base-form-input
      v-model="recipe.imageUrl"
      label="Image URL"
    ></base-form-input>
    <base-form-input
      v-model="recipe.prepTime"
      label="Prep time"
    ></base-form-input>
    <base-form-input
      v-model="recipe.cookTime"
      label="Cook time"
    ></base-form-input>
    <base-form-input
      v-model="recipe.totalTime"
      label="Total time"
    ></base-form-input>
    <base-form-input v-model="recipe.source" label="Source"></base-form-input>
    <base-form-input
      v-model="recipe.servings"
      label="Servings"
    ></base-form-input>
    <base-form-input
      v-model="recipe.calories"
      label="Calories"
    ></base-form-input>
    <base-form-input
      v-model="recipe.ingredients"
      label="Ingredients"
      mode="textarea"
    ></base-form-input>
    <base-form-input
      v-model="recipe.steps"
      label="Instructions"
      mode="textarea"
    ></base-form-input>
    <base-form-input
      v-model="recipe.notes"
      label="Notes"
      mode="textarea"
    ></base-form-input>
    <base-button type="submit">
      {{ submitButtonCaption }}
    </base-button>
  </form>
</template>

<script>
import BaseFormInput from "../components/ui/BaseFormInput";

export default {
  components: { BaseFormInput },
  props: ["recipeId"],
  data() {
    return {
      recipe: {
        title: "",
        imageUrl: "",
        prepTime: "",
        cookTime: "",
        totalTime: "",
        source: "",
        servings: "",
        calories: "",
        ingredients: "",
        steps: "",
        notes: "",
      },
    };
  },
  methods: {
    async submit() {
      const action = this.isEditing ? "edit" : "add";
      await this.$store.dispatch("recipes/" + action + "Recipe", {
        recipeId: this.$props.recipeId,
        body: this.recipe,
      });
      this.$router.replace("/recipes");
    },
    async scrapeRecipe() {
      const response = await fetch(
        process.env.VUE_APP_API_URL +
          "/scrape-recipe?" +
          new URLSearchParams({
            url: this.$refs.scrapeUrl.value,
          })
      );
      const { recipe } = await response.json();
      recipe.ingredients = recipe.ingredients.join("\n");
      recipe.steps = recipe.steps.join("\n");
      recipe.notes = recipe.notes.join("\n");
      this.recipe = recipe;
    },
  },
  computed: {
    submitButtonCaption() {
      return (!this.isEditing ? "Add" : "Update") + " Recipe";
    },
    isEditing() {
      return !!this.$props.recipeId;
    },
  },
  async beforeMount() {
    if (this.isEditing) {
      const response = await fetch(
        process.env.VUE_APP_API_URL + "/recipe/" + this.$props.recipeId,
        { headers: { Authorization: "Bearer " + this.$store.getters.token } }
      );
      const { recipe } = await response.json();
      recipe.ingredients = recipe.ingredients.join("\n");
      recipe.steps = recipe.steps.join("\n");
      recipe.notes = recipe.notes.join("\n");
      this.recipe = recipe;
    }
  },
};
</script>

<style scoped>
.recipe-form {
  width: 50rem;
  max-width: 90%;
  margin: auto;
  display: block;
}
</style>
