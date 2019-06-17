import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import { breakpointsMixin } from "./mixins/breakpoints";

Vue.config.productionTip = false;
Vue.mixin(breakpointsMixin);
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
