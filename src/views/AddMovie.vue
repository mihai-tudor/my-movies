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
              <b-form-textarea
                v-model="form.plot"
                placeholder="Movie's plot"
                rows="3"
                max-rows="6">
              </b-form-textarea>
            </b-form-group>
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
import { BFormTextarea } from 'bootstrap-vue';

export default {
  name: 'AddMovie',
  components: {
    'b-form-textarea': BFormTextarea,
  },
  data: () => ({
    form: {
      title: null,
      plot: null,
    },
    errorMessage: {
      userNotFound: 'Invalid username or password.',
      connection: 'Error: Check your internet connection.',
    },
    isLoading: false,
    errorConnection: false,
    errorUserNotFound: false,
  }),
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      this.isLoading = true;
      const { title, plot } = this.form;
      try {
        const response = await this.axios.post(
          '/v1/my-movies/add-movie',
          { title, plot },
        );
        const { data } = response;
        this.$router.push('/');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            this.errorUserNotFound = true;
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
