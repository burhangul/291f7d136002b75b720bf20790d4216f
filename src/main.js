import Vue from "vue";
import Vuex from "vuex";
import axios from "./plugins/axios";
import App from "./App.vue";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import bookingStore from "./store/index";
import "./assets/reset.less";
import router from "./router";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(Vuex);
Vue.use(Toast, {
  timeout: 2000,
  position: POSITION.TOP_CENTER,
});
Vue.filter("currency", (value) => {
  if (typeof value !== "number") {
    return value;
  }
  const formatter = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
});

const store = new Vuex.Store({
  modules: {
    bookingStore,
  },
});
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
