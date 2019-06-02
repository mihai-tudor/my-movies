<template>
  <b-row class="mt-4">
    <b-col md="6" offset-md="3">
      <b-card class="text-center">
        <b-spinner /> Logging out...
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  mounted() {
    this.logout();
    this.$router.push('/');
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>
