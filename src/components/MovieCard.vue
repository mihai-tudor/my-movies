<template>
  <b-card
    no-body
    class="mt-3"
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
          <EditMovieModal :movie="movie" />
          <DeleteMovieModal :movie="movie" />
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import EditMovieModal from './EditMovieModal.vue';
import DeleteMovieModal from './DeleteMovieModal.vue';

export default {
  name: 'MovieCard',
  components: {
    EditMovieModal,
    DeleteMovieModal,
  },
  props: {
    movie: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isMyMoviesPage() {
      return this.$route.path.includes('my-movies');
    },
  },
};
</script>
