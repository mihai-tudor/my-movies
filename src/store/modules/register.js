import * as validation from '../../common/formValidation';

const state = {
  registerForm: {
    error: {
      user: false,
      email: false,
      password: false,
    },
  },
};

const getters = {
  errorUser: () => state.registerForm.error.user,
};

const actions = {
  onInputUser: ({ commit }, value) => {
    const hasError = !validation.isValidUsername(value);
    commit('setErrorUser', hasError);
  },
  onChangeUser: ({ commit }, value) => {
    // api call to check if user exists
  },
};

const mutations = {
  setErrorUser: (state, error) => {
    state.registerForm.error.user = error;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
