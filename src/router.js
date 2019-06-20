import Vue from "vue";
import Router from "vue-router";

import Home from "./containers/Home.vue";
import Detail from "./containers/AppointmentDetail.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/appointment/:id",
      name: "appointment",
      component: Detail
    }
  ]
});
