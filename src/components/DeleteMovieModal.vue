<template>
  <span>
    <b-button
      variant="danger"
      class="ml-2"
      @click="modalIsOpen = !modalIsOpen"
    >
      Delete
    </b-button>
    <b-modal
      v-model="modalIsOpen"
      title="Delete movie"
      :ok-disabled="deleting"
      ok-title="Delete"
      ok-variant="danger"
      @ok="confirmDelete"
    >
      <p class="my-4">Are you sure you want to delete "{{ movie.title }}"?</p>
      <div v-if="deleting" class="text-center mt-4">
        <b-spinner />
      </div>
      <b-alert :show="deleteError" variant="danger">
        Error: unable to delete movie
      </b-alert>
    </b-modal>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DeleteMovieModal',
  props: {
    movie: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    deleteCount: -1,
    deleteError: false,
    modalIsOpen: false,
    deleting: false,
  }),
  computed: {
    ...mapGetters(['getToken', 'getLoggedUser']),
  },
  methods: {
    ...mapActions(['deleteMovie']),
    async confirmDelete(evt) {
      evt.preventDefault();
      this.deleting = true;
      this.deleteError = false;
      try {
        this.deleteCount += 1;
        if (this.deleteCount > Math.floor(Math.random() * 5) || this.getLoggedUser !== this.movie.user) {
          await this.deleteMovie(this.movie._id);
          this.modalIsOpen = false;
        } else {
          await this.deleteMovie(9999);
        }
      } catch (e) {
        this.deleteError = true;
      } finally {
        this.deleting = false;
      }
    },
  },
};
</script>
