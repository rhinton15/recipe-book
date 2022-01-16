<template>
  <div class="backdrop" v-if="showNav" @click="toggleShowNav"></div>
  <header>
    <nav class="main-nav">
      <ul>
        <li>
          <p>Recipe Book</p>
        </li>
        <li class="push">
          <base-button
            mode="flat-white"
            id="side-menu-toggle"
            @click="toggleShowNav"
            ><i class="fa fa-bars fa-2x"></i
          ></base-button>
        </li>
        <li class="push nav-item">
          <base-button mode="underline" to="/">Explore</base-button>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <base-button mode="underline" to="/recipes">My Recipes</base-button>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <base-button mode="underline" to="/login">Login</base-button>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <base-button mode="outline-white" @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>

  <nav :class="'mobile-nav ' + (showNav ? 'open' : '')">
    <ul>
      <li class="mobile-nav-item">
        <base-button mode="underline" to="/" @click="toggleShowNav"
          >Explore</base-button
        >
      </li>
      <li v-if="isLoggedIn" class="mobile-nav-item">
        <base-button mode="underline" to="/recipes" @click="toggleShowNav"
          >My Recipes</base-button
        >
      </li>
      <li v-if="!isLoggedIn" class="mobile-nav-item">
        <base-button mode="underline" to="/login" @click="toggleShowNav"
          >Login</base-button
        >
      </li>
      <li v-if="isLoggedIn" class="mobile-nav-item">
        <base-button mode="outline-white" @click="logout">Logout</base-button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      if (this.showNav) {
        this.toggleShowNav();
      }
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
    toggleShowNav() {
      this.showNav = !this.showNav;
    },
  },
};
</script>

<style scoped>
header {
  top: 0;
  width: 100%;
  position: fixed;
  height: 60px;
  background-color: #ffb85b;
}

nav {
  height: 100%;
}

p {
  font-size: 30px;
  color: white;
  margin: 0;
}

ul {
  list-style: none;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
}

.nav-item {
  display: none;
}

.mobile-nav {
  width: 250px;
  height: 100vh;
  max-width: 90%;
  position: fixed;
  left: 0;
  top: 0;
  background: #ffb85b;
  z-index: 10;
  padding: 2rem 1rem 1rem 2rem;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
}

.mobile-nav.open {
  transform: translateX(0);
}

.mobile-nav > ul {
  flex-direction: column;
}

.mobile-nav li {
  margin-top: 10px;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
}

.push {
  margin-left: auto;
}

@media (min-width: 600px) {
  .nav-item {
    display: flex;
  }

  #side-menu-toggle {
    display: none;
  }
}
</style>
