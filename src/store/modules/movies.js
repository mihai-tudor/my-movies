import axios from '../../axios';

const state = {
  myMovies: [],
  allMovies: [],
  genreOptions: [
    { value: null, text: 'Please select one or more movie genre', disabled: true },
    { value: 'Action', text: 'Action' },
    { value: 'Adventure', text: 'Adventure' },
    { value: 'Comedy', text: 'Comedy' },
    { value: 'Crime', text: 'Crime' },
    { value: 'Drama', text: 'Drama' },
    { value: 'Fantasy', text: 'Fantasy' },
    { value: 'Historical', text: 'Historical' },
    { value: 'Horror', text: 'Horror' },
    { value: 'Romance', text: 'Romance' },
    { value: 'Science fiction', text: 'Science fiction' },
    { value: 'Thriller', text: 'Thriller' },
    { value: 'Western', text: 'Western' },
  ],
};

const getters = {
  allMyMovies: state => state.myMovies,
  allMovies: state => state.allMovies,
  getMovieGenres: state => state.genreOptions,
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
  async updateMovie({ rootState, commit }, payload) {
    const updatedMovie = await axios.put(
      `/v1/my-movies/movie/${payload._id}`,
      payload,
      {
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      },
    );
    commit('setMyMovie', updatedMovie.data);
  },
};

const mutations = {
  setMyMovies: (state, movies) => {
    state.myMovies = movies;
  },
  setAllMovies: (state, movies) => {
    state.allMovies = movies;
  },
  setMyMovie: (state, payload) => {
    state.myMovies = state.myMovies.map((movie) => {
      if (movie._id === payload._id) {
        return {
          ...payload,
        };
      }
      return movie;
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
