// src/utils/store.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
  state: {
    userRole: null
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role;
    },
  },
  plugins: [createPersistedState()]
});

export default store;
