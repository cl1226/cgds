import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './plugins/element.js'

import Api from './api/index.js';
Vue.prototype.$api = Api;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
