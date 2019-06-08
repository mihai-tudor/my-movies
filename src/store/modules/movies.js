import axios from '../../axios';

const state = {
  myMovies: [],
};

const getters = {
  allMyMovies: state => state.myMovies,
};

const actions = {
  async fetchMyMovies({ rootState, commit }) {
    const myMovies = await axios.get(
      '/v1/my-movies/mine',
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${rootState.auth.token}`,
        },
      },
    );
    commit('setMyMovies', myMovies.data);
  },
};

const mutations = {
  setMyMovies: (state, movies) => {
    state.myMovies = movies;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
