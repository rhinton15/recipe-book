<template>
  <base-modal :open="isModalOpen" @close="closeModal">
    <div class="recipe-list">
      <recipe-list-item
        v-for="recipe in recipes"
        :key="recipe._id.toString()"
        :id="recipe._id.toString()"
        :name="recipe.title"
        :url="recipe.imageUrl"
        @add="addMenuItem"
      ></recipe-list-item>
    </div>
  </base-modal>
  <div v-if="(displayItems && displayItems.length > 0) || isEditing">
    <hr />
    <p>{{ meal.toUpperCase() }}</p>
    <ul>
      <li v-for="item in displayItems" :key="item.recipeId">
        {{ item.title }}
        <button
          class="btn btn-delete"
          v-if="isEditing"
          mode="flat"
          @click="removeItem(item.recipeId)"
        >
          <i class="fa fa-trash fa-md"></i>
        </button>
      </li>
    </ul>
    <base-button v-if="isEditing" mode="flat" @click="addItem"
      ><i class="fa fa-plus fa-md"></i
    ></base-button>
  </div>
</template>

<script>
import RecipeListItem from "../recipe/RecipeListItem";

export default {
  components: { RecipeListItem },
  props: ["meal", "modelValue", "isEditing", "items"],
  emits: ["update:modelValue"],
  data() {
    return { isModalOpen: false };
  },
  methods: {
    addItem() {
      // to do
      this.openModal();
    },
    removeItem(id) {
      this.$emit(
        "update:modelValue",
        this.modelValue.filter((item) => item.recipeId !== id)
      );
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    addMenuItem(item) {
      this.closeModal();
      const existingMenu = this.modelValue || [];
      this.$emit("update:modelValue", existingMenu.concat(item));
    },
  },
  computed: {
    displayItems() {
      return this.modelValue; //this.isEditing ? this.modelValue : this.items;
    },
    recipes() {
      return this.$store.getters["recipes/myRecipes"];
    },
  },
};
</script>

<style scoped>
.recipe-list {
  overflow-y: scroll;
  max-height: 75vh;
}

.btn-delete {
  color: red;
  padding-top: 0;
  padding-bottom: 0;
}

.btn-delete:hover,
.btn-delete:focus,
.btn-delete:active {
  color: #b80000;
}
</style>
