import Vue from "vue";
import Vuex from "vuex";

import appoinments from "./modules/appointments";
import breakpoints from "./modules/breakpoints";
import users from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: [appoinments, breakpoints, users]
});
