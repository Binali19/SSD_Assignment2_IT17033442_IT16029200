import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'


Vue.use(Vuex,VueCookies)

export default new Vuex.Store({
  state: {
    status: '',
    token: $cookies.get('token') || '',
    user : {},
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login_g({commit}){
      return new Promise((resolve, reject) => {

        window.location = 'http://localhost:3000/auth/google';

        
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        $cookies.remove('token')
        $cookies.remove('user')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    authedUser: state => state.user,
    authedToken: state => state.token
  }
})
