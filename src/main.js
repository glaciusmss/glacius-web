import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './config/font_awesome';
import './config/vee_validate';
import './config/axios_interceptors';
import './router/nagivation_guard';
import { Spinner } from './components';

Vue.component('spinner', Spinner);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
