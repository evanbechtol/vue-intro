<template>
  <v-container id="container" fluid grid-list-xs class="pa-2 transparent">
    <!-- Prevent page from refreshing -->
    <form @submit.prevent='addTodo'>
      <input type='text'
             placeholder='What do you need to do?'
             v-model='input'
             v-validate='"min:5"'
             name='input'>

      <!-- Create a CSS animation class for alerts -->
      <transition name='alert-in'
                  enter-active-class='animated flipInX'
                  leave-active-class='animated flipOutX'>
        <p class='alert' v-if='errors.has( "input" )'>{{ errors.first( 'input' ) }}</p>
      </transition>
    </form>

    <v-list>
      <transition-group name='list'
                        enter-active-class='animated bounceInUp'
                        leave-active-class='animated bounceOutDown'>
        <v-list-tile class="tile" v-for='( data, index ) in list' :key='index' @click="">
          <v-list-tile-content>
            <v-flex>
              <v-card class="card" hover tile width="95vw">
                <v-layout align-space-around row>
                  <i v-tooltip="'Remove item'" class="fa fa-minus-circle" v-on:click='removeTodo( data, index )'></i>
                  <v-card-text>{{ data.todo }}</v-card-text>
                </v-layout>
              </v-card>
            </v-flex>
          </v-list-tile-content>
        </v-list-tile>
      </transition-group>
    </v-list>

    <!--<div v-bind:class='alertObj'>Here is an alert!</div>-->
    <!--<div v-bind:style='{ backgroundColor: bgColor, width: bgWidth, height: bgHeight }'>Here is an alert!</div>-->
  </v-container>
</template>

<script>
  export default {
    name : 'Todo',
    data () {
      return {
        input : '',
        list  : []
      };
    },

    methods : {
      addTodo () {
        this.$validator.validateAll().then( res => {
          if ( res ) {
            this.list.push( { todo : this.input } );
            this.input = '';
          }
        } );
      },

      removeTodo ( data, index ) {
        this.list.splice( index, 1 );
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import 'https://cdn.jsdelivr.net/npm/animate.css@3.5.1';
  @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
  @import './tooltip.css';

  .alert {
    background-color : #eeeeee;
    color            : rgba(220, 84, 88, 0.91);
    font-weight      : bold;
    padding          : 5px;
    margin-top       : 0;
    margin-bottom    : 0;
  }

  .alert-in-enter-active {
    animation : bounce-in .5s;
  }

  .alert-in-leave-active {
    animation : bounce-in .5s reverse;
  }

  .card {
    padding          : 20px;
    font-size        : 1.3em;
    background-color : #E0EDF4;
    border-left      : 5px solid #3EB3F6;
    margin-bottom    : 2px;
    color            : #3E5252;
    word-wrap        : break-word;
  }

  #container {
    margin-bottom : 4em;
  }

  i {
    color         : rgba(220, 84, 88, 1.0);
    cursor        : pointer;
    display       : grid;
    align-items   : center;
    justify-items : center;
  }

  input {
    width            : 100%;
    border           : 0;
    padding          : 20px;
    font-size        : 1.3em;
    background-color : #323333;
    color            : #687F7F;
  }

  p {
    text-align : center;
    padding    : 30px 0;
    color      : gray;
  }

  ul {
    margin          : 0;
    padding         : 0;
    list-style-type : none;
    background      : #eeeeee;
  }

  .tile {
    margin-bottom : 2px;
  }

  .transparent {
    background-color   : transparent !important;
    border-color       : transparent !important;
    -webkit-box-shadow : none !important;
    box-shadow         : none !important;
  }

  @keyframes bounce-in {
    0% {
      transform : scale(0);
    }
    50% {
      transform : scale(1.3);
    }
    100% {
      transform : scale(1);
    }
  }
</style>
