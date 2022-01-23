<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <div v-else>
    <div>
      <base-button class="more-btn" mode="flat" @click="back"
        ><i class="fa fa-angle-left fa-2x"></i
      ></base-button>
      <transition-group tag="span" name="meal-planner">
        <meal-planner-day
          class="meal-day"
          v-for="day in displayDays"
          :key="day.index"
          :index="day.index"
          :meals="day.meals"
          :date="day.date"
          :canEdit="canEdit"
          @save="saveMenu"
        ></meal-planner-day>
      </transition-group>
      <base-button class="more-btn" mode="flat" @click="forwards"
        ><i class="fa fa-angle-right fa-2x"></i
      ></base-button>
    </div>
  </div>
</template>

<script>
import MealPlannerDay from "../components/meal-planner/MealPlannerDay";

export default {
  components: { MealPlannerDay },
  data() {
    return {
      startDay: 0,
      menu: [],
      isLoading: true,
    };
  },
  computed: {
    displayDays() {
      return Array.from(Array(4).keys()).map((index) => {
        const date = new Date();
        date.setDate(date.getDate() + index + this.startDay);
        return {
          index: index + this.startDay,
          date: date,
          dateString: date.toLocaleDateString("en-US"),
          meals: this.getMeals(date),
        };
      });
    },
    canEdit() {
      return !this.$route.params.userId;
    },
  },
  methods: {
    back() {
      this.startDay--;
    },
    forwards() {
      this.startDay++;
    },
    getMenu(date) {
      return this.menu.find(
        (item) => item.date === date.toLocaleDateString("en-US")
      );
    },
    getMeals(date) {
      const menuToday = this.getMenu(date);
      return menuToday && menuToday.meals ? { ...menuToday.meals } : {};
    },
    async saveMenu(date, meals) {
      this.isLoading = true;
      try {
        const response = await fetch(process.env.VUE_APP_API_URL + "/menu", {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + this.$store.getters.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: date.toLocaleDateString("en-US"),
            meals,
          }),
        });

        if (!response.ok) {
          throw new Error("ERROR");
        }
      } catch (error) {
        console.log(error);
        return;
      }

      const menuToday = this.getMenu(date);
      if (menuToday) {
        menuToday.meals = meals;
      } else {
        this.menu.push({
          date: date.toLocaleDateString("en-US"),
          meals: meals,
        });
      }
      this.isLoading = false;
    },
  },
  async beforeMount() {
    try {
      const userId = this.$route.params.userId;
      const response = await fetch(
        process.env.VUE_APP_API_URL + "/menu" + (userId ? "/" + userId : ""),
        {
          headers: {
            Authorization: "Bearer " + this.$store.getters.token,
          },
        }
      );
      const { menu } = await response.json();
      this.menu = menu;
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  },
};
</script>

<style scoped>
.meal-planner-enter-from,
.meal-planner-leave-to {
  opacity: 0;
}

.meal-planner-enter-active {
  transition: all 0.3s ease-out;
}

.meal-planner-leave-active {
  transition: all 0.3s ease-out;
  position: absolute;
}

.meal-planner-enter-to,
.meal-planner-leave-from {
  opacity: 1;
}

.meal-planner-move {
  transition: transform 0.3s ease;
}

.meal-day {
  display: inline-block;
  width: 20%;
  margin: 10px;
  vertical-align: top;
}

@media (max-width: 1280px) {
  .more-btn {
    display: none;
  }
  .meal-day {
    width: 80%;
  }
}
</style>
