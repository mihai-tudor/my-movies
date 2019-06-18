<template>
  <b-card
    no-body
    class="mt-3"
    :class="{ 'd-none': hide }"
  >
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img v-if="movie.imageUrl" :src="movie.imageUrl" class="rounded-0" />
        <img v-else alt="No image" src="@/assets/no-image.svg" class="rounded-0 card-img">
      </b-col>
      <b-col md="7">
        <b-card-body :title="movie.title">
          <b-card-text v-if="movie.plot">
            {{ movie.plot }}
          </b-card-text>
          <b-list-group flush>
            <b-list-group-item v-if="movie.directors">
              <strong>Directed By:</strong>
              <br>{{ movie.directors }}
            </b-list-group-item>
            <b-list-group-item v-if="movie.cast">
              <strong>Cast:</strong>
              <br>{{ movie.cast }}
            </b-list-group-item>
            <b-list-group-item>
              <strong>Genre:</strong>
              <br>{{ movie.genre }}
            </b-list-group-item>
          </b-list-group>
        </b-card-body>
      </b-col>
    </b-row>
    <div slot="footer">
      <div class="d-flex">
        <div><strong>Posted by:</strong> {{ movie.user }}</div>
        <div v-if="isMyMoviesPage" class="ml-auto">
          <b-button
            variant="info"
            @click="editModal = !editModal"
          >
            Edit
          </b-button>
          <b-modal v-model="editModal" hide-footer size="lg" title="Edit movie">
            <b-form class="mt-2 mx-5 mb-3" @submit.prevent="onSubmit">
              <b-form-group>
                <b-form-input
                  v-model="movie.title"
                  required
                  placeholder="Movie's title"
                />
              </b-form-group>
              <b-form-group>
                <b-form-select
                  v-model="getGenreArr"
                  :options="genreOptions"
                  :select-size="5"
                  multiple
                  required
                />
              </b-form-group>
              <b-form-group>
                <b-form-textarea
                  v-model="movie.plot"
                  placeholder="Movie's plot"
                  rows="2"
                />
              </b-form-group>
              <b-form-group>
                <b-form-input
                  v-model="movie.cast"
                  placeholder="Movie's stars"
                />
              </b-form-group>
              <b-form-group>
                <b-form-input
                  v-model="movie.directors"
                  placeholder="Directed By"
                />
              </b-form-group>
              <b-form-group>
                <b-form-input
                  v-model="movie.imageUrl"
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
          <b-button
            :disabled="deleting"
            variant="danger"
            class="ml-2"
            @click="deleteMovie(movie._id)"
          >
            <template v-if="deleting">
              <b-spinner />
            </template>
            <template v-else>
              Delete
            </template>
          </b-button>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    deleting: false,
    hide: false,
    editModal: false,
    savingChanges: false,
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
    isMyMoviesPage() {
      return this.$route.path.includes('my-movies');
    },
    getGenreArr() {
      return this.movie.genre.split(', ');
    },
  },
  methods: {
    async deleteMovie(id) {
      this.deleting = true;
      await this.axios.delete(
        `/v1/my-movies/movie/${id}`,
        {
          headers: { Authorization: `Bearer ${this.getToken}` },
        },
      );
      this.hide = true;
    },
  },
};
</script>
