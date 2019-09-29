<template>
  <b-card
    no-body
    class="mt-3"
    :class="{'hide-bug': hide}"
  >
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img v-if="movie.imageUrl && !isSafari" :src="movie.imageUrl"
                    class="rounded-0" :class="{'blurry-bug': isOpera}" @click="flickerBug" />
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
              <br><b-link :to="`/director-${movie.directors}`">{{ movie.directors }}</b-link>
            </b-list-group-item>
            <b-list-group-item v-if="movie.cast">
              <strong>Cast:</strong>
              <br>{{ movie.cast }}
            </b-list-group-item>
            <b-list-group-item class="bug-align">
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
import * as utils from '../common/utils';

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
  data: () => ({
    isSafari: utils.isSafari(),
    isOpera: utils.isOpera(),
    hide: false,
  }),
  computed: {
    isMyMoviesPage() {
      return this.$route.path.includes('my-movies');
    },
  },
  methods: {
    flickerBug() {
      this.hide = true;
      setTimeout(() => {
        this.hide = false;
      }, 100);
    },
  },
};
</script>

<style>
.card-text {
  width: 302px;
  margin-bottom: -6px;
  z-index: 10;
  position: relative;
}
@media only screen and (max-width: 575px) {
  .card-body {
    margin-top: -27px;
  }
}
.hide-bug {
  opacity: 0;
}
.blurry-bug {
  opacity: 0.45;
}
</style>
