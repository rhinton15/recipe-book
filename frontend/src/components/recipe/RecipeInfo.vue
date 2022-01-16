<template>
  <div class="subsection">
    <p class="subsection-header">{{ label }}</p>
    <p v-if="!link" class="subsection-body">{{ value }}</p>
    <a v-else class="subsection-body" :href="link" target="_blank">{{
      value
    }}</a>
  </div>
</template>

<script>
export default {
  props: ["label", "value", "link"],
};
</script>

<style scoped>
.subsection {
  margin-top: 10px;
}

.subsection-header {
  margin: 0px;
  font-family: "Roboto", serif;
}

.subsection-body {
  margin: 0px;
  font-family: "Montserrat", sans-serif;
}

a {
  color: #ff9100;
}

a:hover,
a:active,
a:focus {
  color: #d37800;
}
</style>
