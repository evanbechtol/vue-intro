<template>
  <v-footer id="footer"
            height="auto"
            color="light-blue darken-1"
            class="px-0"
            fixed>
    <v-layout
      justify-center
      row
      wrap>
      <!--      <v-btn
                v-for="link in links"
                :key="link"
                color="white"
                flat
                round>
              {{ link }}
            </v-btn>-->
      <v-flex
        color="light-blue darken-1"
        dark
        py-3
        text-xs-center
        white--text
        xs12>
        &copy;2018 — <strong>Evan Bechtol</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    name : 'Footer',
    data : () => ( {
      icons : [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    } )
  };
</script>

<style scoped>
  @import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons';
</style>
