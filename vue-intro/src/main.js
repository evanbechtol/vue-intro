import Vue from 'vue';
import App from './App.vue';
import VeeValidate from 'vee-validate';
import VTooltip from 'v-tooltip';

Vue.use( VeeValidate );
Vue.use( VTooltip );
Vue.config.productionTip = false;

new Vue( {
  render : h => h( App )
} ).$mount( '#app' );
