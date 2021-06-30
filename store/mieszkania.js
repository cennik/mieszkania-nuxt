import Vue from 'vue'

export const state = () => ({
  mieszkania: {}
})

export const mutations = {
  setAll(state, payload) {
    state.mieszkania = payload
  },
  setOne(state, payload) {
    Vue.set(state.mieszkania, payload.url, payload)
  }
}

export const getters = {
  mieszkania: state => state.mieszkania
}
