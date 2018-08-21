import Vue from 'vue';
import Router from 'vue-router';
import AppLayout from '../components/AppLayout';
import Login from '../components/Login';
import About from '../components/About';
import Contact from '../components/Contact';

Vue.use( Router );

export default new Router( {
  routes : [
    {
      path      : '/',
      name      : 'AppLayout',
      component : AppLayout
    },
    {
      path      : '/login',
      name      : 'Login',
      component : Login
    },
    {
      path      : '/about',
      name      : 'About',
      component : About
    },
    {
      path      : '/contact',
      name      : 'Contact',
      component : Contact
    }
  ]
} );
