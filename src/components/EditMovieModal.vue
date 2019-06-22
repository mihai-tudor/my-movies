<template>
  <span>
    <b-button
      variant="info"
      @click="modalIsOpen = !modalIsOpen"
    >
      Edit
    </b-button>
    <b-modal v-model="modalIsOpen" hide-footer size="lg" title="Edit movie" @hidden="resetEdit">
      <b-form class="mt-2 mx-5 mb-3" @submit.prevent="onSubmit(movieData._id)">
        <b-form-group>
          <b-form-input
            v-model="movieData.title"
            required
            placeholder="Movie's title"
          />
        </b-form-group>
        <b-form-group>
          <b-form-select
            v-model="movieData.genre"
            :options="genreOptions"
            :select-size="5"
            multiple
            required
          />
        </b-form-group>
        <b-form-group>
          <b-form-textarea
            v-model="movieData.plot"
            placeholder="Movie's plot"
            rows="2"
          />
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="movieData.cast"
            placeholder="Movie's stars"
          />
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="movieData.directors"
            placeholder="Directed By"
          />
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="movieData.imageUrl"
            placeholder="Poster image url"
          />
        </b-form-group>
        <b-alert :show="errorCannotSave" variant="danger">
          {{ errorMessage.cannotSave }}
        </b-alert>
        <b-alert :show="errorConnection" variant="danger">
          {{ errorMessage.connection }}
        </b-alert>
        <b-button :disabled="savingChanges" block size="lg" type="submit" variant="primary">
          <template v-if="savingChanges">
            <b-spinner />
          </template>
          <template v-else>
            Save changes
          </template>
        </b-button>
      </b-form>
    </b-modal>
  </span>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EditMovieModal',
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
    movie: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    movieData: {},
    savingChanges: false,
    modalIsOpen: false,
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
    errorMessage: {
      cannotSave: 'Couldn\'t add your movie, please try again.',
      connection: 'Error: Check your internet connection.',
    },
    errorConnection: false,
    errorCannotSave: false,
  }),
  computed: {
    ...mapGetters(['getToken']),
  },
  created() {
    this.movieData = {
      ...this.movie,
      genre: this.movie.genre.split(', '),
    };
  },
  methods: {
    resetEdit() {
      this.movieData = {
        ...this.movie,
        genre: this.movie.genre.split(', '),
      };
    },
    async onSubmit(id) {
      this.savingChanges = true;
      const payload = {
        ...this.movieData,
        genre: this.movieData.genre.join(', '),
      };
      await this.axios.put(
        `/v1/my-movies/movie/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${this.getToken}` },
        },
      );
      this.savingChanges = false;
      this.modalIsOpen = false;
    },
  },
};
</script>
