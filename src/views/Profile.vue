<template>
  <b-row align-h="center">
    <b-col cols="8" class="mt-4">
      <b-card title="Your profile">
        <b-card-text>
          You are logged in as <strong>{{ getLoggedUser }}</strong>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: mapGetters(['getLoggedUser']),
};
</script>
