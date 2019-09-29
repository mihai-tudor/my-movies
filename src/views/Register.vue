<template>
  <b-container>
    <b-row class="mt-4">
      <b-col md="6" offset-md="3">
        <b-card title="Register" sub-title="Create a new account.">
          <b-form class="mt-4" @keydown.enter.prevent.stop="enterBug" @submit.prevent="onSubmit">
            <b-form-group
              id="input-group-1"
              label-for="input-1"
              :state="inputState.user"
              :invalid-feedback="errorMessage.user"
            >
              <b-form-input
                id="input-1"
                v-model="form.user"
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
                placeholder="Email Addres"
                :state="inputState.email"
                @input="onInputEmail"
              />
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label-for="input-3"
              tabindex="-1"
              :state="inputState.password"
              :invalid-feedback="errorMessage.password"
            >
              <b-form-input
                id="input-3"
                v-model="form.password"
                placeholder="Password"
                type="password"
                tabindex="-1"
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
                placeholder="Retype password"
                type="password"
                :state="inputState.passwordConfirm"
                @input="onInputPasswordConfirm"
              />
            </b-form-group>
            <div @click.stop.prevent="">
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
                  value="accepted"
                  @change="onCheckbox"
                >
                  I have read and agreed to the <a href="#">terms of service</a>
                </b-form-checkbox>
              </b-form-group>
            </div>
            <b-alert :show="errorConnection" variant="danger">
              {{ errorMessage.connection }}
            </b-alert>
            <b-button :disabled="isLoading" block size="lg" type="submit" variant="primary">
              <template v-if="isLoading">
                <b-spinner />
              </template>
              <template v-else>
                Create acount
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
  name: 'Register',
  data: () => ({
    numberOfPressed: 0,
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
      this.inputState.email = null;
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
      this.form.terms = false;
      this.inputState.terms = null;
    },
    enterBug() {
      this.$router.push({ path: '/registerr' });
    },
    async onSubmit() {
      this.numberOfPressed += 1;
      if (this.numberOfPressed === 3) {
        this.$router.push({ path: '/registerr' });
      }
      setTimeout(() => {
        this.numberOfPressed = 0;
      }, 1000);
      if (this.form.terms.length === 0) {
        this.inputState.terms = null;
        // return;
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
        this.$router.push('/my-movies');
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
