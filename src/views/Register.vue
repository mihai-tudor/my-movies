<template>
  <b-container>
    <b-row class="mt-4">
      <b-col md="6" offset-md="3">
        <b-card title="Register" sub-title="Create a new account.">
          <b-form class="mt-4">
            <b-form-group>
              <b-form-input
                type="username"
                required
                placeholder="Username"
              />
            </b-form-group>

            <b-button type="submit" variant="primary">Create account</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <div class="container-fluid py-3">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <div class="card card-body">
            <h3 class="text-center mb-4">Register</h3>
            <fieldset>
              <b-form-group>
                <b-form-input
                  id="input-1" v-model="name" :state="state" trim placeholder="Username"
                />
              </b-form-group>
              <div class="form-group has-error">
                <input
                  class="form-control input-lg has-success" placeholder="Username" name="username"
                  type="text"
                  @input="onInputUser($event.target.value)"
                >
                <div v-if="errorUser">error</div>
              </div>
              <div class="form-group has-error">
                <input class="form-control input-lg"
                       placeholder="E-mail Address" name="email" type="text"
                >
              </div>
              <div class="form-group has-success">
                <input class="form-control input-lg"
                       placeholder="Password" name="password" value="" type="password"
                >
              </div>
              <div class="form-group has-success">
                <input class="form-control input-lg"
                       placeholder="Confirm Password"
                       name="passwordConfirm" value="" type="password"
                >
              </div>
              <div class="checkbox">
                <label class="small">
                  <input name="terms" type="checkbox">
                  I have read and agree to the
                  <a href="#">terms of service</a>
                </label>
              </div>
              <input class="btn btn-lg btn-primary btn-block" value="Create account" type="submit">
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    errorUserMsg: 'Username needs to be between 3-16 characters, starts with a letter and can contain only letters, number, dot, underscore and dash.',
    errorUserExistsMsg: 'This user already exists!',
    errorEmail: 'E-mail format is wrong!',
    errorPassword: 'Password need to be between 6-20 characters, at least one number, one lowercase, one uppercase letter and one special character.',
    errorPasswordConfirm: 'Passwords are not the same!',
    name: '',
  }),
  computed: {
    ...mapGetters(['errorUser']),
    invalidFeedback() {
      if (this.name.length > 4) {
        return '';
      }
      if (this.name.length > 0) {
        return 'Enter at least 4 characters';
      }
      return 'Please enter something';
    },
    state() {
      return this.name.length >= 4;
    },
  },
  methods: mapActions(['onInputUser']),
};
</script>
