<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  margin: 2rem auto;
  max-width: 30rem;
  padding: 1rem;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.active {
  background-color: #ffe1bf;
  border: 2px solid #ffb85b;
}
</style>
