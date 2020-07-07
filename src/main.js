import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Vuelidate from "vuelidate";

import VueMoment from "vue-moment";
import Moment from "moment";
import "moment/locale/uk";

import Toast from "vue-toastification";

import "./assets/tailwind.css";

import "vue-toastification/dist/index.css";

import "./assets/styles/components.scss";

Vue.use(Vuelidate);

Vue.use(VueMoment, {
  Moment,
});

Vue.use(Toast, {
  position: "bottom-right",
  newestOnTop: true,
  maxToasts: 5,
  showCloseButtonOnHover: true,
  timeout: 5000,
  transition: "Vue-Toastification__bounce",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
