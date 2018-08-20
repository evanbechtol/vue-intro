import Vue from 'vue';
import App from './App.vue';
import veeValidate from 'vee-validate';

Vue.use( veeValidate );
Vue.config.productionTip = false;

new Vue( {
  render : h => h( App )
} ).$mount( '#app' );
