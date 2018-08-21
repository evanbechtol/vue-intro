<template>
  <v-toolbar color="light-blue darken-1" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Vue Todo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link class="link" to="/about">
        <v-btn flat>About</v-btn>
      </router-link>
      <router-link class="link" to="/login">
        <v-btn flat>Login</v-btn>
      </router-link>
      <router-link class="link" to="/contact">
        <v-btn flat>Contact</v-btn>
      </router-link>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name : 'toolbar'
  };
</script>

<style scoped>
  .link {
    display            : grid;
    grid-template-rows : auto;
    justify-items      : center;
    align-items        : center;
    text-decoration    : none;
    height             : 100%;
  }
</style>
