<template>
  <b-container>
    <b-row class="mt-4">
      <b-col md="6" offset-md="3">
        <b-card title="Add Movie" sub-title="Post a new movie.">
          <b-form class="mt-4" @submit="onSubmit">
            <b-form-group>
              <b-form-input
                v-model="form.title"
                required
                placeholder="Movie's title"
              />
            </b-form-group>
            <b-form-group>
              <b-form-select
                v-model="form.genre"
                :options="genreOptions"
                :select-size="5"
                multiple
                required
              />
            </b-form-group>
            <b-form-group>
              <b-form-textarea
                v-model="form.plot"
                placeholder="Movie's plot"
                rows="2"
              />
            </b-form-group>
            <b-form-group>
              <b-form-input
                v-model="form.cast"
                placeholder="Movie's stars"
              />
            </b-form-group>
            <b-form-group>
              <b-form-input
                v-model="form.directors"
                placeholder="Directed By"
              />
            </b-form-group>
            <b-form-group>
              <b-form-input
                v-model="form.imageUrl"
                placeholder="Poster image url"
              />
            </b-form-group>
            <b-alert :show="errorCannotSave" variant="danger">
              {{ errorMessage.cannotSave }}
            </b-alert>
            <b-alert :show="errorConnection" variant="danger">
              {{ errorMessage.connection }}
            </b-alert>
            <b-button :disabled="isLoading" block size="lg" type="submit" variant="primary">
              <template v-if="isLoading">
                <b-spinner />
              </template>
              <template v-else>
                Add Movie
              </template>
            </b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AddMovie',
  data: () => ({
    form: {
      title: null,
      genre: [],
      plot: null,
      cast: null,
      directors: null,
      imageUrl: null,
    },
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
    isLoading: false,
    errorConnection: false,
    errorCannotSave: false,
  }),
  computed: mapGetters(['getToken']),
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      this.isLoading = true;
      const payload = {
        ...this.form,
        genre: this.form.genre.join(', '),
      };
      try {
        await this.axios.post(
          '/v1/my-movies/add-movie',
          { ...payload },
          {
            headers: { Authorization: `Bearer ${this.getToken}` },
          },
        );
        this.$router.push('/my-movies');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            this.errorCannotSave = true;
          }
        } else {
          this.errorConnection = true;
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
