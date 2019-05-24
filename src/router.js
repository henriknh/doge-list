import Vue from "vue";
import Router from "vue-router";

import Browse from "./views/Browse.vue";
import Game from "./views/Game.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "browse",
      component: Browse
    },
    {
      path: "/game",
      name: "game",
      component: Game
    }
  ]
});
