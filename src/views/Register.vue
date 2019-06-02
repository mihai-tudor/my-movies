<template>
  <b-container>
    <b-row class="mt-4">
      <b-col md="6" offset-md="3">
        <b-card title="Register" sub-title="Create a new account.">
          <b-form class="mt-4" @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label-for="input-1"
              :state="inputState.user"
              :invalid-feedback="errorMessage.user"
            >
              <b-form-input
                id="input-1"
                v-model="form.user"
                required
                placeholder="Username"
                :state="inputState.user"
                @input="onInputUser"
              />
            </b-form-group>
            <b-form-group
              id="input-group-2"
              label-for="input-2"
              :state="inputState.email"
              :invalid-feedback="errorMessage.email"
            >
              <b-form-input
                id="input-2"
                v-model="form.email"
                required
                placeholder="Email Address"
                :state="inputState.email"
                @input="onInputEmail"
              />
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label-for="input-3"
              :state="inputState.password"
              :invalid-feedback="errorMessage.password"
            >
              <b-form-input
                id="input-3"
                v-model="form.password"
                required
                placeholder="Password"
                type="password"
                :state="inputState.password"
                @input="onInputPassword"
              />
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label-for="input-4"
              :state="inputState.passwordConfirm"
              :invalid-feedback="errorMessage.passwordConfirm"
            >
              <b-form-input
                id="input-4"
                v-model="form.passwordConfirm"
                required
                placeholder="Retype password"
                type="password"
                :state="inputState.passwordConfirm"
                @input="onInputPasswordConfirm"
              />
            </b-form-group>
            <b-form-group
              id="input-checkbox-1"
              label-for="checkbox-1"
              :state="inputState.terms"
              :invalid-feedback="errorMessage.terms"
            >
              <b-form-checkbox
                id="checkbox-1"
                v-model="form.terms"
                :state="inputState.terms"
                required
                value="accepted"
                @change="onCheckbox"
              >
                I have read and agreed to the <a href="#">terms of service</a>
              </b-form-checkbox>
            </b-form-group>
            <b-alert :show="errorConnection" variant="danger">
              {{ errorMessage.connection }}
            </b-alert>
            <b-alert :show="errorUserExists" variant="danger">
              {{ errorMessage.userExists }}
            </b-alert>
            <b-button :disabled="isLoading" block size="lg" type="submit" variant="primary">
              <template v-if="isLoading">
                <b-spinner />
              </template>
              <template v-else>
                Create account
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
import * as validation from '../common/formValidation';

export default {
  name: 'App',
  data: () => ({
    form: {
      user: null,
      email: null,
      password: null,
      passwordConfirm: null,
      terms: [],
    },
    inputState: {
      user: null,
      email: null,
      password: null,
      passwordConfirm: null,
      terms: null,
    },
    errorMessage: {
      user: 'Username needs to be between 3-16 characters, starts with a letter and can contain only letters, number, dot, underscore and dash.',
      userExists: 'This username or email already exists. Please pick something else.',
      email: 'Wrong e-mail format.',
      password: 'Password needs to be between 6-20 characters, at least one number, one lowercase, one uppercase letter and one special character.',
      passwordConfirm: 'Passwords don\'t match.',
      terms: 'You must accept the terms of service.',
      connection: 'Error: Check your internet connection.',
    },
    isLoading: false,
    errorConnection: false,
    errorUserExists: false,
  }),
  methods: {
    ...mapMutations(['setLogin']),
    onInputUser() {
      if (this.form.user.length === 0) {
        this.inputState.user = null;
      } else {
        this.inputState.user = validation.isValidUsername(this.form.user);
      }
    },
    onInputEmail() {
      if (this.form.email.length === 0) {
        this.inputState.email = null;
      } else {
        this.inputState.email = validation.isValidEmail(this.form.email);
      }
    },
    onInputPassword() {
      if (this.form.password.length === 0) {
        this.inputState.password = null;
      } else {
        this.inputState.password = validation.isValidPassword(this.form.password);
      }
      this.form.passwordConfirm = null;
      this.inputState.passwordConfirm = null;
    },
    onInputPasswordConfirm() {
      if (this.form.passwordConfirm.length === 0) {
        this.inputState.passwordConfirm = null;
      } else {
        this.inputState.passwordConfirm = this.form.password === this.form.passwordConfirm;
      }
    },
    onCheckbox() {
      this.inputState.terms = this.form.terms.length === 0;
    },
    async onSubmit(evt) {
      evt.preventDefault();
      if (this.form.terms.length === 0) {
        this.inputState.terms = false;
        return;
      }

      this.isLoading = true;
      const { user, email, password } = this.form;
      try {
        const response = await this.axios.post(
          '/v1/my-movies/register',
          { user, email, password },
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
            this.errorUserExists = true;
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
