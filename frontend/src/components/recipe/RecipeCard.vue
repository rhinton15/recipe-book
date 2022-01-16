<template>
  <base-card class="recipe-card" @click="recipeClick">
    <img :src="url" :alt="name" />
    <p class="text-left">{{ name }}</p>
  </base-card>
</template>

<script>
export default {
  props: ["name", "url", "id"],
  methods: {
    recipeClick() {
      this.$router.push("/recipe/" + this.$props.id);
    },
  },
};
</script>

<style scoped>
.recipe-card {
  width: 300px;
  height: 250px;
  margin: 10px;
  padding: 0;
  background-color: white;
  float: left;
  font-family: "Montserrat", sans-serif;
}

h3 {
  height: 50px;
}

img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

p {
  margin: 15px 15px;
}
</style>
