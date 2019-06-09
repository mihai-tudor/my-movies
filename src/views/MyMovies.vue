<template>
  <b-container>
    <div v-if="isLoading" class="text-center mt-4">
      <b-spinner style="width: 3rem; height: 3rem;" />
    </div>
    <MovieCards v-if="!isLoading && allMyMovies.length > 0" :movies="allMyMovies" />
    <b-row v-else-if="!isLoading" align-h="center">
      <b-col cols="8" class="mt-4">
        <b-card
          title="Start adding your favorite movies."
          sub-title="In this page you'll find all your movies."
        >
          <b-button to="/add-movie" block size="lg" variant="primary" class="mt-4">
            Add your first movie
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovieCards from '../components/MovieCards.vue';

export default {
  name: 'MyMovies',
  components: {
    MovieCards,
  },
  data: () => ({
    isLoading: true,
  }),
  computed: mapGetters(['allMyMovies']),
  async created() {
    await this.fetchMyMovies();
    this.isLoading = false;
  },
  methods: mapActions(['fetchMyMovies']),
};
</script>
