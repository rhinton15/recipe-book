<template>
  <div :class="divClasses">
    <label :for="id" class="text-left">{{ label }}</label>
    <textarea
      v-if="mode === 'textarea'"
      :name="id"
      :id="id"
      :class="inputClasses"
      :value="modelValue"
      :type="type"
      rows="10"
      @blur="updateValue"
    ></textarea>
    <input
      v-else
      :type="type"
      :id="id"
      :class="inputClasses"
      :value="modelValue"
      @blur="updateValue"
    />
    <p v-if="invalid && touched">{{ invalidMessage }}</p>
  </div>
</template>

<script>
export default {
  props: ["label", "type", "modelValue", "mode", "invalid", "invalidMessage"],
  emits: ["update:modelValue"],
  data() {
    return {
      touched: false,
    };
  },
  computed: {
    id() {
      return this.label.toLowerCase().replace(/ /g, "-");
    },
    inputClasses() {
      const classes = [];
      if (!this.mode || this.mode === "input") {
        classes.push("form-control");
      }
      return classes.join(" ");
    },
    divClasses() {
      const classes = ["input-control"];
      if (this.invalid && this.touched) {
        classes.push("invalid");
      }
      return classes.join(" ");
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
      this.touched = true;
    },
  },
};
</script>

<style scoped>
.input-control {
  margin: 1rem 0;
}

.input-control label,
.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  margin-bottom: 0.25rem;
  font: inherit;
}

.invalid > label,
.invalid > p {
  color: rgb(253, 74, 74);
}

.invalid > input,
.invalid > textarea {
  border-color: rgb(253, 74, 74);
  box-shadow: 0 0 0 0.1rem rgba(253, 74, 74, 0.5);
}
</style>
