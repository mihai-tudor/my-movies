<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-navbar-brand to="/">
        <img alt="My Movies" src="./assets/icons/cinema.svg" height="35">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Movies</b-nav-item>
          <b-nav-item style="line-height: 22px;" to="/about">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="isLoggedIn" class="ml-auto">
          <b-nav-item to="/my-movies">My movies</b-nav-item>
          <b-nav-item to="/add-movie">Add movie</b-nav-item>
          <b-nav-item-dropdown right>
            <template slot="button-content">User</template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item to="/logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item class="no-hover" v-if="!isEdge" to="/register">Register</b-nav-item>
          <b-nav-item to="/login">Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as utils from './common/utils';

export default {
  name: 'App',
  computed: mapGetters(['isLoggedIn']),
  data: () => ({
    isEdge: utils.isEdge(),
  }),
};
</script>

<style>
.no-hover a:hover, .no-hover a:active, .no-hover a:focus {
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>
