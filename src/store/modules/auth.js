const state = {
  token: null,
  loggedIn: {
    user: null,
  },
};

const getters = {
  isLoggedIn: state => !!state.token,
};

const actions = {
  logout: ({ commit }) => {
    commit('setLogin', { token: null, user: null });
  },
};

const mutations = {
  setLogin: (state, data) => {
    state.token = data.token;
    state.loggedIn.user = data.user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
