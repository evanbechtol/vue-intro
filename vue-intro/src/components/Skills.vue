<template>
  <div class='hello'>
    <div class='holder'>
      
      <!-- Prevent page from refreshing -->
      <form @submit.prevent='addSkill'>
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
      
      <ul>
        <transition-group name='list'
                          enter-active-class='animated bounceInUp'
                          leave-active-class='animated bounceOutDown'>
          <li v-for='( data, index ) in list' :key='index'>
            {{ data.todo }}
          </li>
        </transition-group>
        
      </ul>
      
      <!--<div v-bind:class='alertObj'>Here is an alert!</div>-->
      <!--<div v-bind:style='{ backgroundColor: bgColor, width: bgWidth, height: bgHeight }'>Here is an alert!</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name : 'Skills',
    data () {
      return {
        input  : '',
        list : [
          { todo : 'Vue.js' },
          { todo : 'Polymer.js' }
        ]
      };
    },

    methods : {
      addSkill () {
        this.$validator.validateAll().then( res => {
          if ( res ) {
            this.list.push( { todo : this.input } );
            this.input = '';
          }
        } );
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import 'https://cdn.jsdelivr.net/npm/animate.css@3.5.1';
  .holder {
    background : #fff;
  }
  
  ul {
    margin          : 0;
    padding         : 0;
    list-style-type : none;
  }
  
  ul li {
    padding          : 20px;
    font-size        : 1.3em;
    background-color : #E0EDF4;
    border-left      : 5px solid #3EB3F6;
    margin-bottom    : 2px;
    color            : #3E5252;
  }
  
  p {
    text-align : center;
    padding    : 30px 0;
    color      : gray;
  }
  
  .container {
    box-shadow : 0px 0px 40px lightgray;
  }
  
  input {
    width            : calc(100% - 40px);
    border           : 0;
    padding          : 20px;
    font-size        : 1.3em;
    background-color : #323333;
    color            : #687F7F;
  }
  
  .alert {
    background  : rgba(220, 84, 88, 0.91);
    color       : white;
    font-weight : bold;
    padding     : 5px;
    margin-top  : -5px;
    margin-bottom: 0;
  }
  
  .alert-in {
  
  }
  
  .alert-in-enter-active {
    animation : bounce-in .5s;
  }
  
  .alert-in-leave-active {
    animation : bounce-in .5s reverse;
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
