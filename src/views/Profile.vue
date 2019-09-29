<template>
  <b-row align-h="center">
    <b-col cols="8" class="mt-4">
      <b-card title="Your profile">
        <b-card-text>
          You are logged in as <strong>{{ getLoggedUser }}{{ randomString(2) }}</strong>
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
  methods: {
    randomString(length) {
      let result = '';
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
  },
};
</script>
