import axios from '../../axios';

const state = {
  myMovies: [],
  allMovies: [],
};

const getters = {
  allMyMovies: state => state.myMovies,
  allMovies: state => state.allMovies,
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
  async fetchAllMovies({ commit }) {
    const allMovies = await axios.get(
      '/v1/my-movies',
    );
    commit('setAllMovies', allMovies.data);
  },
};

const mutations = {
  setMyMovies: (state, movies) => {
    state.myMovies = movies;
  },
  setAllMovies: (state, movies) => {
    state.allMovies = movies;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
