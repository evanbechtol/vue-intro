<template>
  <div id="app">
    <Toolbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
  import Todo from './components/Todo.vue';
  import Toolbar from './components/Toolbar';
  import Footer from './components/Footer';

  export default {
    name       : 'app',
    components : {
      Footer,
      Toolbar,
      Todo
    },
    data       : () => ( {
      drawer : true
    } )
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');

  body {
    background-color : #EEEEEE;
    font-family      : 'Montserrat', sans-serif;
  }

  body, html {
    margin : 0;
    height : 100%;
  }

  #app {
    width : 100%;
  }

  #todo {
    width              : 100%;
    margin-top         : 10em;
    display            : grid;
    grid-template-rows : auto;
    justify-items      : center;
    align-items        : center;
  }
</style>
