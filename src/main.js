import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { breakpointsMixin } from "./mixins/breakpoints";

Vue.config.productionTip = false;
Vue.mixin(breakpointsMixin);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
