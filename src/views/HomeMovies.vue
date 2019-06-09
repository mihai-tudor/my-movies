<template>
  <b-container>
    <div v-if="isLoading" class="text-center mt-4">
      <b-spinner style="width: 3rem; height: 3rem;" />
    </div>
    <MovieCards v-else :movies="allMovies" />
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovieCards from '../components/MovieCards.vue';

export default {
  name: 'HomeMovies',
  components: {
    MovieCards,
  },
  data: () => ({
    isLoading: true,
  }),
  computed: mapGetters(['allMovies']),
  async created() {
    await this.fetchAllMovies();
    this.isLoading = false;
  },
  methods: mapActions(['fetchAllMovies']),
};
</script>
