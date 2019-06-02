<template>
  <b-container>
    <b-row class="mt-4">
      <b-col md="6" offset-md="3">
        <b-card title="Login" sub-title="Login to your account.">
          <b-form class="mt-4" @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.userOrEmail"
                required
                placeholder="Username or Email"
              />
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="form.password"
                required
                placeholder="Password"
                type="password"
              />
            </b-form-group>
            <b-alert :show="errorConnection" variant="danger">
              {{ errorMessage.connection }}
            </b-alert>
            <b-alert :show="errorUserNotFound" variant="danger">
              {{ errorMessage.userNotFound }}
            </b-alert>
            <b-button :disabled="isLoading" block size="lg" type="submit" variant="primary">
              <template v-if="isLoading">
                <b-spinner />
              </template>
              <template v-else>
                Login
              </template>
            </b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    form: {
      userOrEmail: null,
      password: null,
    },
    errorMessage: {
      userNotFound: 'Invalid username or password.',
      connection: 'Error: Check your internet connection.',
    },
    isLoading: false,
    errorConnection: false,
    errorUserNotFound: false,
  }),
  methods: {
    ...mapMutations(['setLogin']),
    async onSubmit(evt) {
      evt.preventDefault();

      this.isLoading = true;
      const { userOrEmail, password } = this.form;
      try {
        const response = await this.axios.post(
          '/v1/my-movies/login',
          { userOrEmail, password },
        );
        const { data } = response;
        this.setLogin({
          token: data.token,
          user: data.account.user,
        });
        this.$router.push('/');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            this.errorUserNotFound = true;
          }
        } else {
          this.errorConnection = true;
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
