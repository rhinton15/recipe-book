<template>
  <div :class="'recipe-list-item ' + (active ? 'active' : '')" @click="addItem">
    <img :src="url" :alt="name" />
    <p class="text-left">{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: ["name", "url", "id"],
  emits: ["add"],
  data() {
    return { active: false };
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    },
    addItem() {
      this.$emit("add", { recipeId: this.id, title: this.name });
    },
  },
};
</script>

<style scoped>
.recipe-list-item {
  width: 100%;
  height: 70px;
  padding: 10px;
  background-color: white;
  font-family: "Montserrat", sans-serif;
}

.active {
  background-color: #ffe1bf;
}

img {
  height: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  float: left;
  margin-right: 10px;
}

p {
  margin: 13px 0;
}
</style>
