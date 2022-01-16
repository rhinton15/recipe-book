<template>
  <div>
    <base-button
      v-if="$store.getters.userId === recipe.userId"
      :to="'/edit-recipe/' + recipeId"
      >Edit</base-button
    >
    <button
      v-if="$store.getters.userId === recipe.userId"
      @click="deleteRecipe"
      class="btn btn-danger noprint"
    >
      Delete
    </button>
    <base-spinner v-if="isLoading"></base-spinner>
    <div class="container" v-else>
      <div class="row margin-t50">
        <div class="col-12 text-center page-title">{{ recipe.title }}</div>
      </div>
      <div class="row">
        <div class="col-3 text-center">
          <img class="icon" src="../assets/slow-cooker.png" />
          <recipe-info label="PREP TIME" :value="recipe.prepTime"></recipe-info>
          <recipe-info label="COOK TIME" :value="recipe.cookTime"></recipe-info>
          <recipe-info label="READY IN" :value="recipe.totalTime"></recipe-info>
        </div>
        <div class="col-6 text-center">
          <img :src="recipe.imageUrl" id="recipe-img" />
        </div>
        <div class="col-3 text-center">
          <img class="icon" src="../assets/knife-fork-spoon.png" />
          <recipe-info label="SERVINGS" :value="recipe.servings"></recipe-info>
          <recipe-info label="CALORIES" :value="recipe.calories"></recipe-info>
          <recipe-info
            label="SOURCE"
            :value="recipe.source"
            :link="recipe.url"
          ></recipe-info>
        </div>
      </div>
      <div class="row">
        <recipe-info-list
          class="col-6 text-right right-border"
          label="Ingredients"
          :items="recipe.ingredients"
        ></recipe-info-list>
        <recipe-info-list
          class="col-6 text-left"
          label="Steps"
          :items="recipe.steps"
        ></recipe-info-list>
      </div>
      <div class="row" v-if="recipe.notes.length > 0">
        <recipe-info-list
          class="col-12 text-center"
          label="Notes"
          :items="recipe.notes"
        ></recipe-info-list>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeInfo from "../components/recipe/RecipeInfo.vue";
import RecipeInfoList from "../components/recipe/RecipeInfoList.vue";

export default {
  components: { RecipeInfo, RecipeInfoList },
  props: ["recipeId"],
  data() {
    return {
      recipe: {},
      isLoading: false,
    };
  },
  methods: {
    async deleteRecipe() {
      this.isLoading = true;
      try {
        const response = await fetch(
          process.env.VUE_APP_API_URL + "/recipe/" + this.$props.recipeId,
          {
            method: "DELETE",
            headers: { Authorization: "Bearer " + this.$store.getters.token },
          }
        );
        this.isLoading = false;
        if (response.status === 200) {
          this.$router.replace("/recipes");
        } else {
          // warning about failure to delete
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async beforeMount() {
    this.isLoading = true;
    try {
      const response = await fetch(
        process.env.VUE_APP_API_URL + "/recipe/" + this.$props.recipeId,
        { headers: { Authorization: "Bearer " + this.$store.getters.token } }
      );
      const { recipe } = await response.json();
      this.recipe = recipe;
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  },
};
</script>

<style scoped>
.row {
  margin: 10px;
}

.container {
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

img {
  max-width: 100%;
}

#recipe-img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.right-border {
  border-right: 1.5px solid #a6a6a6;
}

.icon {
  width: 50px;
}

@media print {
  #recipe-img {
    width: 500px;
    aspect-ratio: 4/3;
  }
}
</style>
