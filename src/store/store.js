import Vue from "vue";
import Vuex from "vuex";

import appoinments from "./modules/appointments";
import breakpoints from "./modules/breakpoints";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: [appoinments, breakpoints]
});
