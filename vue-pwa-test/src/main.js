// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VeeValidate from 'vee-validate';
import VTooltip from 'v-tooltip';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use( VeeValidate );
Vue.use( VTooltip );
Vue.use( Vuetify );

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue( {
  el         : '#app',
  router,
  template   : '<App/>',
  components : { App }
} );
