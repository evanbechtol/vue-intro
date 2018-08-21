import Vue from 'vue';
import router from './router';
import App from './App.vue';
import VeeValidate from 'vee-validate';
import VTooltip from 'v-tooltip';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use( VeeValidate );
Vue.use( VTooltip );
Vue.use( Vuetify );

Vue.config.productionTip = false;

new Vue( {
  router,
  render : h => h( App )
} ).$mount( '#app' );
