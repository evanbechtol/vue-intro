<template>
  <div class='holder'>
    <!-- Prevent page from refreshing -->
    <form @submit.prevent='addTodo' id="form">
      <v-layout wrap align-start>
        <v-flex align-content-center xs12 sm10 md10 xl10>
          <input type='text'
                 placeholder='What do you need to do?'
                 v-model='input'
                 v-validate='"min:5"'
                 name='input'>
        </v-flex>

        <v-flex align-center align-content-center xs12 sm2 md2 xl2>
          <v-menu bottom
                  lazy
                  left
                  full-width
                  origin="center center"
                  transition="slide-y-transition">
            <v-btn
              id="priority-btn"
              slot="activator"
              class="success"
              dark>
              Priority
            </v-btn>
            <v-list class="priority-list">
              <v-list-tile
                class='priority-option'
                v-for='( item, i ) in priorities'
                v-bind:class='[item.option]'
                :key='i'
                @click='setPriority( item.option )'>
                <v-list-tile-title>{{ item.option }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <!-- Create a CSS animation class for alerts -->
          <transition name='alert-in'
                      enter-active-class='animated flipInX'
                      leave-active-class='animated flipOutX'>
            <p class='alert' v-if='errors.has( "input" )'>{{ errors.first( 'input' ) }}</p>
          </transition>
        </v-flex>
      </v-layout>
    </form>

    <ul>
      <transition-group name='list'
                        enter-active-class='animated slideInLeft'
                        leave-active-class='animated slideOutRight'>

        <!-- Iterate over each item in the list of todos -->
        <li v-for='( item, index ) in list' :key='index' v-bind:class='[item.priority]'>
          <div>
            <v-container class="pa-0">
              <v-layout>
                <v-layout column>
                  <small style="font-size: 60% !important;">{{ item.createdAt }}</small>
                  {{ item.todo }}
                </v-layout>
                <i v-tooltip="'Remove item'" class="fa fa-minus-circle" v-on:click='removeTodo( item, index )'></i>
              </v-layout>
            </v-container>
          </div>
        </li>
      </transition-group>
    </ul>

    <!--<div v-bind:class='alertObj'>Here is an alert!</div>-->
    <!--<div v-bind:style='{ backgroundColor: bgColor, width: bgWidth, height: bgHeight }'>Here is an alert!</div>-->
  </div>
</template>

<script>
  export default {
    name : 'Todo',

    watch : {
      list : {
        handler () {
          console.log( 'Todos changed!' );
          localStorage.setItem( 'todos', JSON.stringify( this.list ) );
        },
        deep : true
      }
    },

    data () {
      return {
        input      : '',
        priority   : '',
        priorities : [
          { option : 'Emergency' },
          { option : 'Urgent' },
          { option : 'High' },
          { option : 'Medium' },
          { option : 'Low' },
          { option : 'None' }
        ],
        list       : []
      };
    },

    mounted () {
      if ( localStorage.getItem( 'todos' ) ) {
        this.list = JSON.parse( localStorage.getItem( 'todos' ) );
      }
    },

    methods : {
      addTodo () {
        this.$validator.validateAll().then( res => {
          if ( res ) {
            this.list.push( {
              todo      : this.input,
              priority  : this.priority === '' ? 'None' : this.priority,
              createdAt : new Date().toDateString()
            } );
            this.input    = '';
            this.priority = '';
          }
        } );
      },

      removeTodo ( data, index ) {
        this.list.splice( index, 1 );
      },

      setPriority ( value ) {
        this.priority = value;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import 'https://cdn.jsdelivr.net/npm/animate.css@3.5.1';
  @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
  @import 'tooltip.css';

  .alert {
    background-color : rgba(220, 84, 88, 0.91);
    color            : white;
    font-weight      : bold;
    padding          : 5px;
    margin-top       : 0;
    margin-bottom    : 0;
    z-index          : 999;
    position         : fixed;
    width            : 100vw;
  }

  .alert-in-enter-active {
    animation : bounce-in .5s;
  }

  .alert-in-leave-active {
    animation : bounce-in .5s reverse;
  }

  .Emergency {
    border-left : 8px solid #DF462E !important;
  }

  .Urgent {
    border-left : 8px solid #DF6E29 !important;
  }

  .High {
    border-left : 8px solid #dfde3e !important;
  }

  .Medium {
    border-left : 8px solid #3CF06F !important;
  }

  .Low {
    border-left : 8px solid #3EB3F6 !important;
  }

  .None {
    border-left : 8px solid #878DFF !important;
  }

  #form {
    background-color : #323333;
    color            : #687F7F;
    height           : 100%;
  }

  .holder {
    margin-bottom : 4em;
  }

  i {
    float         : right;
    color         : rgba(220, 84, 88, 1.0);
    cursor        : pointer;
    margin-left   : 10px;
    display       : grid;
    align-content : center;
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

  #priority-btn {
    border-radius : 0 !important;
    height        : 8vh;
    width         : 95%;
  }

  .priority-list {
    padding : 0 !important;
  }

  .priority-option {
    cursor        : pointer;
    border-bottom : 1px solid #eeeeee;
  }

  .priority-option:hover {
    background-color : #eeeeee;
  }

  ul {
    padding         : 0;
    list-style-type : none;
    /*background      : #eeeeee;*/
  }

  ul li {
    padding          : 20px;
    font-size        : 1.3em;
    background-color : #E0EDF4;
    border-left      : 8px solid #3EB3F6;
    margin-bottom    : 2px;
    color            : #3E5252;
    word-wrap        : break-word;
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
