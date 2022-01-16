<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavigation from "./components/layout/TheNavigation.vue";

export default {
  name: "App",
  components: { TheNavigation },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  watch: {
    didAutoLogout(newValue, oldValue) {
      if (newValue & (newValue !== oldValue)) {
        this.$router.replace("/");
      }
    },
  },
};
</script>

<style>
@import "https://fonts.googleapis.com/css2?family=Montserrat&family=Petit+Formal+Script&family=Roboto&family=Roboto+Slab:wght@300&display=swap";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app::-webkit-scrollbar {
  display: none;
}

#app {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

main {
  margin-top: 80px;
}

.page-title {
  font-family: "Roboto Slab", serif;
  font-size: 35px;
  -webkit-print-color-adjust: exact;
}

.section-title {
  font-family: "Petit Formal Script", cursive;
  font-size: 30px;
}

.section-body {
  font-family: "Montserrat", sans-serif;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.vert-align-middle {
  vertical-align: middle;
}

.margin-t50 {
  margin-top: 50px;
}

.padding-0 {
  padding: 0;
}

.free-height {
  height: initial;
}

@media print {
  #app {
    margin-top: 0px;
  }

  .noprint {
    display: none !important;
  }
}
/* @media print {
  .col-sm-1,
  .col-sm-2,
  .col-sm-3,
  .col-sm-4,
  .col-sm-5,
  .col-sm-6,
  .col-sm-7,
  .col-sm-8,
  .col-sm-9,
  .col-sm-10,
  .col-sm-11,
  .col-sm-12 {
    float: left;
  }
  .col-sm-12 {
    width: 100%;
  }
  .col-sm-11 {
    width: 91.66666667%;
  }
  .col-sm-10 {
    width: 83.33333333%;
  }
  .col-sm-9 {
    width: 75%;
  }
  .col-sm-8 {
    width: 66.66666667%;
  }
  .col-sm-7 {
    width: 58.33333333%;
  }
  .col-sm-6 {
    width: 50%;
  }
  .col-sm-5 {
    width: 41.66666667%;
  }
  .col-sm-4 {
    width: 33.33333333%;
  }
  .col-sm-3 {
    width: 25%;
  }
  .col-sm-2 {
    width: 16.66666667%;
  }
  .col-sm-1 {
    width: 8.33333333%;
  }
} */
</style>
