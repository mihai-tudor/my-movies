<template>
  <b-container>
    <div v-if="isLoading" class="text-center mt-4">
      <b-spinner style="width: 3rem; height: 3rem;" />
    </div>
    <b-card-group v-else columns>
      <b-card
        v-for="movie in allMyMovies"
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
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MyMovies',
  data: () => ({
    isLoading: true,
  }),
  computed: mapGetters(['allMyMovies']),
  methods: mapActions(['fetchMyMovies']),
  async created() {
    await this.fetchMyMovies();
    this.isLoading = false;
  },
};
</script>

<style scoped>
  .card-columns {
    column-count: 2;
  }
</style>
