<template>
  <div class='holder'>

    <div class="hidden-sm-and-down">
      <v-layout>
        <v-flex md12 lg12>
          <v-dialog v-model="dialog" fullscreen>
            <v-btn id="addTodoBtnBig"
                   class="success btn"
                   slot="activator"
                   dark>
              Add Todo
            </v-btn>

            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title>
                Add Todo
                <v-spacer></v-spacer>
                <i class="fa fa-times" @click="dialog = false"></i>
              </v-card-title>

              <v-card-text>
                <form @submit.prevent='addTodo' id="form">
                  <v-flex align-content-center xs12 sm12 md12 xl12>
                    <v-textarea
                      id="todoInput"
                      type='text'
                      placeholder='What do you need to do?'
                      v-model='input'
                      name='input'>
                    </v-textarea>
                  </v-flex>

                  <v-layout align-center justify-center fill-height column>
                    <v-flex xs12 fill-height d-flex>
                      <v-dialog v-model="dateDialog" width="290px">
                        <v-btn id="dueDateBtn"
                               class="btn"
                               slot="activator"
                               color="light-blue darken-1"
                               full-width
                               dark>
                          Set Due Date
                        </v-btn>

                        <v-card>
                          <v-card-title
                            class="headline grey lighten-2"
                            primary-title>
                            Due Date
                          </v-card-title>

                          <v-date-picker v-model="dueDate"
                                         :landscape="landscape"
                                         :reactive="reactive"></v-date-picker>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              flat
                              @click="dateDialog = false">
                              Submit
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-flex>

                    <v-flex xs12 fill-height d-flex>
                      <v-menu bottom
                              lazy
                              left
                              origin="center center"
                              transition="slide-y-transition">
                        <v-btn
                          id="priority-btn"
                          slot="activator"
                          class="btn success"
                          dark>
                          Set Priority
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
                      <!--<transition name='alert-in'
                                  enter-active-class='animated flipInX'
                                  leave-active-class='animated flipOutX'>
                        <p class='alert' v-if='errors.has( "input" )'>{{ errors.first( 'input' ) }}</p>
                      </transition>-->
                    </v-flex>
                  </v-layout>
                </form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="addTodo">
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </div>

    <v-list three-line class='pa-0'>
      <transition-group name='list'
                        enter-active-class='animated slideInLeft'
                        leave-active-class='animated slideOutRight'>

        <template v-for="( item, index ) in list">
          <v-subheader
            v-if="item.header"
            :key="item.header">
            {{ item.header }}
          </v-subheader>

          <v-divider
            v-else-if="item.divider"
            :inset="item.inset"
            :key="index"></v-divider>

          <v-list-tile
            v-else
            :key="index"
            v-bind:class="[item.priority]"
            @click="">

            <v-list-tile-content>
              <v-list-tile-title v-html="item.todo"></v-list-tile-title>
              <v-list-tile-sub-title v-html="`<span>Created At: ${item.createdAt}</span>`"></v-list-tile-sub-title>
              <v-list-tile-sub-title v-html="`<span>Due By: ${item.dueDate}</span>`"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-tooltip left>
              <i slot="activator" class="fa fa-minus-circle" v-on:click='removeTodo( item, index )'></i>
              <span>Remove Todo</span>
            </v-tooltip>
          </v-list-tile>
        </template>
      </transition-group>
    </v-list>

    <div class="hidden-md-and-up">
      <v-footer id="footer"
                color="light-blue darken-1"
                class="px-0"
                height="20px"
                fixed
                app>
        <v-layout align-center justify-center row fill-height>
          <v-flex justify-end xs6>
            <v-btn class="fabBtn"
                   style="left: 14vw;"
                   dark
                   small>
              <v-tooltip top>
                <v-icon
                        slot="activator"
                        class="fa fa-sort"
                        v-on:click='setSort( order )'>
                </v-icon>
                <span>Sort by due date</span>
              </v-tooltip>
            </v-btn>
          </v-flex>
          <v-flex xs6 justify-start>
            <!-- Add dialog -->
            <v-dialog v-model="dialog" fullscreen>
              <v-btn id="addTodoBtn"
                     class="fabBtn"
                     absolute
                     style="left: 60vw; bottom: 4px;"
                     slot="activator"
                     left
                     small
                     dark>
                <v-tooltip top>
                  <v-icon slot="activator">add</v-icon>
                  <span>Add New Todo</span>
                </v-tooltip>
              </v-btn>

              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  primary-title>
                  Add Todo
                  <v-spacer></v-spacer>
                  <i class="fa fa-times" @click="dialog = false"></i>
                </v-card-title>

                <v-card-text>
                  <form @submit.prevent='addTodo' id="form">
                    <v-flex align-content-center xs12 sm12 md12 xl12>
                      <v-textarea
                        id="todoInput"
                        type='text'
                        placeholder='What do you need to do?'
                        v-model='input'
                        name='input'>
                      </v-textarea>
                    </v-flex>

                    <v-layout align-center justify-center fill-height column>
                      <v-flex xs12 fill-height d-flex>
                        <v-dialog v-model="dateDialog" width="290px">
                          <v-btn id="dueDateBtn"
                                 class="btn"
                                 slot="activator"
                                 color="light-blue darken-1"
                                 full-width
                                 dark>
                            Set Due Date
                          </v-btn>

                          <v-card>
                            <v-card-title
                              class="headline grey lighten-2"
                              primary-title>
                              Due Date
                            </v-card-title>

                            <v-date-picker v-model="dueDate"
                                           :landscape="landscape"
                                           :reactive="reactive"></v-date-picker>

                            <v-divider></v-divider>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                flat
                                @click="dateDialog = false">
                                Submit
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-flex>

                      <v-flex xs12 fill-height d-flex>
                        <v-menu bottom
                                lazy
                                left
                                origin="center center"
                                transition="slide-y-transition">
                          <v-btn
                            id="priority-btn"
                            slot="activator"
                            class="btn success"
                            dark>
                            Set Priority
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
                      </v-flex>
                    </v-layout>
                  </form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    flat
                    @click="addTodo">
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-footer>
    </div>
  </div>
</template>

<script>
  export default {
    name : 'Todo',

    watch : {
      list : {
        handler () {
          localStorage.setItem( 'todos', JSON.stringify( this.list ) );
        },
        deep : true
      },

      priority : {
        handler () {
          if ( this.priority !== '' && this.input ) {
            this.addTodo();
          }
        }
      }
    },

    data () {
      return {
        dateDialog : false,
        dialog     : false,
        dueDate    : null,
        input      : '',
        landscape  : false,
        list       : [],
        order      : 0,
        priority   : '',
        priorities : [
          { option : 'Emergency' },
          { option : 'Urgent' },
          { option : 'High' },
          { option : 'Medium' },
          { option : 'Low' },
          { option : 'None' }
        ],
        reactive   : true
      };
    },

    mounted () {
      if ( localStorage.getItem( 'todos' ) ) {
        this.list = JSON.parse( localStorage.getItem( 'todos' ) );
      }
    },

    methods : {
      addTodo () {
        function formatDueDate ( date ) {
          let d = new Date( date );
          d.setDate( d.getDate() + 1 );
          return d.toDateString();
        }

        this.$validator.validateAll().then( res => {
          if ( res ) {
            this.list.push( {
              todo      : this.input,
              priority  : this.priority === '' ? 'None' : this.priority,
              createdAt : new Date().toDateString(),
              dueDate   : this.dueDate === null ? new Date().toDateString() : formatDueDate( this.dueDate )
            } );
            this.input      = '';
            this.priority   = '';
            this.dueDate    = null;
            this.dateDialog = false;
            this.dialog     = false;
          }


        } );
      },

      removeTodo ( data, index ) {
        this.list.splice( index, 1 );
      },

      setPriority ( value ) {
        this.priority = value;
      },

      setSort ( order ) {
        if ( order === -1 ) {
          this.order = 0;
        } else if ( order === 0 ) {
          this.order = 1;
        } else {
          this.order = -1;
        }
        this.sortByDate();
      },

      sortByDate () {
        if ( this.order === 1 ) {
          this.list = this.list.sort( function ( a, b ) {
            return new Date( b.dueDate ) - new Date( a.dueDate );
          } );
        } else if ( this.order === -1 ) {
          this.list = this.list.sort( function ( a, b ) {
            return new Date( a.dueDate ) - new Date( b.dueDate );
          } );
        } else {

        }

      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import 'https://cdn.jsdelivr.net/npm/animate.css@3.5.1';
  @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
  @import 'animation.css';
  @import 'tooltip.css';
  @import 'priority.css';

  #addTodoBtnBig {
    width : 100vw;
  }

  .fabBtn {
    height           : 30px;
    width            : 30px;
    background-color : transparent !important;
    box-shadow       : none !important;
  }

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

  .btn {
    border-radius : 0 !important;
    margin        : 4px 0 !important;
    width         : 92vw;
  }

  #form {
    /*background-color : #323333;
    color            : #687F7F;*/
    height : 100%;
  }

  .holder {
    margin-bottom : 30px;
  }

  i {
    float         : right;
    color         : rgba(220, 84, 88, 1.0);
    cursor        : pointer;
    margin-left   : 10px;
    display       : grid;
    align-content : center;
  }

  p {
    text-align : center;
    padding    : 30px 0;
    color      : gray;
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

  .small {
    font-size : 60%;
  }

  #speedDial {
    position : absolute;
  }

  #todoInput {
    width            : 96vw;
    border           : 0;
    padding          : 20px;
    font-size        : 1.3em;
    background-color : #323333;
    color            : #687F7F;
  }

  ul {
    padding         : 0;
    list-style-type : none;
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

  v-icon {
    position : relative; right : 5px;
  }
</style>
