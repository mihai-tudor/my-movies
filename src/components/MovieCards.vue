<template>
  <b-card-group columns>
    <b-card
      v-for="movie in movies"
      :key="movie._id"
      no-body
      class="mt-3"
    >
      <b-row no-gutters>
        <b-col md="5">
          <b-card-img :src="movie.imageUrl" class="rounded-0" />
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
      <div slot="footer"><strong>Posted by:</strong> {{ movie.user }}</div>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: 'MovieCards',
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
