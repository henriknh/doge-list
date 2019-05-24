<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-head has-background-light">
        <Navbar />
      </div>
      <div class="hero-body">
        <div class="container">
          <router-view />
        </div>
      </div>
      <div class="hero-foot has-background-light">
        <div class="container has-text-centered">
          <strong>doge-list</strong> by
          <a href="mailto:henrik.nilsson.harnert@gmail.com"
            >Henrik Nilsson Harnert</a
          >. Mini project for interview with 4C Strategies AB.<br />
          API used is facilitated by
          <a href="https://dog.ceo/dog-api/">Dog API</a> under GNU General
          Public License v3.0.
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import store from "@/stores/breeds";

import Navbar from "@/components/Navbar.vue";

export default {
  store,
  name: "home",
  components: {
    Navbar
  },
  created() {
    store.dispatch("loadBreeds");
  }
};
</script>

<style lang="scss">
/* Change bulma predefined variables */
$navbar-item-img-max-height: 3rem;

@import "../node_modules/bulma/bulma.sass";

html,
body,
#app {
  max-height: 100vh !important;
}
.hero.is-fullheight {
  min-height: calc(100vh - #{$navbar-height});
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.hero {
  max-height: 100vh;
  .hero-body {
    max-height: 100% !important;
    flex-shrink: 1;
    overflow: auto;

    .container {
      height: 100%;
      margin: 0 auto;
    }
  }

  .hero-foot {
    .container {
      padding: $gap 0;
    }
  }
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
