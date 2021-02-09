import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTask: null
  },
  mutations: {
    SET_TASK: (state, task) => state.currentTask = task
  },
  actions: {
    setTask: ({ commit }, task) => commit('SET_TASK', task)
  },
})
