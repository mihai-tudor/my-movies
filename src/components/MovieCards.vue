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
  /deep/ .bug-align:nth-child(2) {
    text-align: right;
  }
  /deep/ .card:nth-child(3) .card-title {
    display: none;
  }
  /deep/ .card:nth-child(6) .no-gutters {
    overflow:hidden;
  }
  /deep/ .card:nth-child(6) .no-gutters img {
    margin-left: -50px;
  }
</style>
