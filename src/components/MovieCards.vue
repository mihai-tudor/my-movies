<template>
  <b-card-group columns>
    <MovieCard
      v-for="movie in movies"
      :key="movie._id"
      :movie="movie"
    />
  </b-card-group>
</template>

<script>
import MovieCard from './MovieCard.vue';

export default {
  name: 'MovieCards',
  components: {
    MovieCard,
  },
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
  },
};
</script>


<style scoped>
  .card-columns {
    column-count: 2;
  }
</style>
