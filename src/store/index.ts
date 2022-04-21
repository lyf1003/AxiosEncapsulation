import { createStore } from 'vuex'

export default createStore({
  state: {
    sum:0
  },
  mutations: {
    SET_SUM(state,value){
      state.sum+=value
    }
  },
  actions: {
    setSum(content,value){
      content.commit("SET_SUM",value)
    }
  },
  modules: {
  }
})
