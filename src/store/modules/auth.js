const defaultState = {
  token: null,
  user: null,
};

const sessionStorageState = () => {
  const auth = sessionStorage.getItem('auth');
  if (auth !== null) {
    const authParsed = JSON.parse(auth);
    return {
      token: authParsed.token,
      user: authParsed.user,
    };
  }
  return defaultState;
};

const state = {
  ...sessionStorageState(),
};

const getters = {
  isLoggedIn: state => !!state.token,
  getToken: state => state.token,
  getLoggedUser: state => state.user,
};

const actions = {
  logout: ({ commit }) => {
    commit('setLogin', { token: null, user: null });
    window.sessionStorage.removeItem('auth');
  },
};

const mutations = {
  setLogin: (state, data) => {
    state.token = data.token;
    state.user = data.user;
    const authString = JSON.stringify({ token: data.token, user: data.user });
    window.sessionStorage.setItem('auth', authString);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
