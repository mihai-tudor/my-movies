const state = {
  token: window.sessionStorage.getItem('token'),
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
    window.sessionStorage.removeItem('token');
  },
};

const mutations = {
  setLogin: (state, data) => {
    state.token = data.token;
    state.loggedIn.user = data.user;
    window.sessionStorage.setItem('token', data.token);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
