<template>
  <button v-if="!to" :class="classes">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="classes">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ["mode", "to"],
  computed: {
    classes() {
      return "btn noprint " + (this.mode ? this.mode : "");
    },
  },
};
</script>

<style scoped>
button,
a {
  color: #fff;
  background-color: #ff9100;
  border-radius: 5px;
  display: inline-block;
  text-decoration: none;
  margin: 0.5rem 1.5rem;
}

button:hover,
button:active,
a:hover,
a:active {
  color: white;
  background-color: #d37800;
}

button:active,
button:hover,
button:focus,
a:active,
a:hover,
a:focus {
  box-shadow: none;
}

button:disabled,
a:disabled {
  background-color: #969696;
  cursor: not-allowed;
  pointer-events: all !important;
}

.flat {
  background-color: transparent;
  color: #ff9100;
  border: 1px solid transparent;
}

.flat:hover,
.flat:active {
  background-color: transparent;
  color: #d37800;
}

.flat-white {
  background-color: transparent;
  color: white;
  border: 1px solid transparent;
}

.flat-white:hover,
.flat-white:active {
  background-color: transparent;
  color: rgb(230, 230, 230);
}

.outline {
  background-color: transparent;
  border-color: #ff9100;
  color: #ff9100;
}

.outline:hover,
.outline:active {
  background-color: white;
  color: #d37800;
}

.outline-white {
  background-color: transparent;
  border-color: white;
  color: white;
}

.outline-white:hover,
.outline-white:active {
  background-color: #fff3e4;
  color: #d37800;
}

/* white text with white underline on hover/active */
.underline {
  background: transparent;
  border-width: 0px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  color: white;
  display: inline-block;
  padding: 0.1rem 0;
  border-radius: 0px;
}

.underline:hover,
.underline:active,
.underline.router-link-active {
  border-color: transparent;
  background-color: transparent;
  border-bottom: 4px solid white;
}
</style>
