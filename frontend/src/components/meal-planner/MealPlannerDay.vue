<template>
  <base-card :class="index === 0 ? 'active' : ''">
    <span>{{ month }} {{ day }}</span>
    <h2>{{ dayOfWeek }}</h2>
    <meal-planner-meal
      meal="breakfast"
      v-model="mealsNew.breakfast"
      :isEditing="isEditing"
    ></meal-planner-meal>
    <meal-planner-meal
      meal="lunch"
      v-model="mealsNew.lunch"
      :isEditing="isEditing"
    ></meal-planner-meal>
    <meal-planner-meal
      meal="dinner"
      v-model="mealsNew.dinner"
      :isEditing="isEditing"
    ></meal-planner-meal>
    <base-button v-if="canEdit && !isEditing" @click="edit">Edit</base-button>
    <base-button v-if="canEdit && isEditing" @click="cancel"
      >Cancel</base-button
    >
    <base-button v-if="canEdit && isEditing" @click="saveChanges"
      >Save</base-button
    >
  </base-card>
</template>

<script>
import MealPlannerMeal from "./MealPlannerMeal";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default {
  components: { MealPlannerMeal },
  props: ["index", "meals", "date", "canEdit"],
  emits: ["save"],
  data() {
    return { mealsNew: { ...this.meals }, isEditing: false };
  },
  methods: {
    edit() {
      this.isEditing = !this.isEditing;
    },
    cancel() {
      this.isEditing = false;
      this.mealsNew = { ...this.meals };
    },
    saveChanges() {
      this.isEditing = false;
      this.$emit("save", this.date, this.mealsNew);
    },
  },
  computed: {
    month() {
      return months[this.date.getMonth()];
    },
    day() {
      return this.date.getDate();
    },
    dayOfWeek() {
      return days[this.date.getDay()];
    },
  },
};
</script>
