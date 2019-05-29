import * as validation from '../../common/formValidation';

const state = {
  registerForm: {
    error: {
      user: true,
      userExists: false,
      email: true,
      password: true,
      passwordConfirmation: false,
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
