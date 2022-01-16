<template>
  <div :id="label.toLowerCase()">
    <div class="section-title">{{ label }}</div>
    <ul class="section-body" v-for="item in items" :key="item">
      <li>{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["label", "items"],
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 10px;
}
</style>
