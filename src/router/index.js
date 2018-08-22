import Vue from 'vue';
import Router from 'vue-router';
import Todo from '@/components/Todo';
import Login from '@/components/Login';
import About from '@/components/About';
import Contact from '@/components/Contact';

Vue.use( Router );

export default new Router( {
  routes : [
    {
      path      : '/',
      name      : 'Todo',
      component : Todo
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
