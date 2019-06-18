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
          <b-modal v-model="editModal" title="Edit movie">
            {{ movie.title }}
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
  }),
  computed: {
    ...mapGetters(['getToken']),
    isMyMoviesPage() {
      return this.$route.path.includes('my-movies');
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
