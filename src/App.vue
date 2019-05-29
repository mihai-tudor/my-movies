<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">
        <img alt="My Movies" src="./assets/icons/cinema.svg" height="35">
      </router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Movies</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>
        <ul v-if="isLoggedIn" class="navbar-nav">
          <li class="nav-item">
            <router-link to="/my-movies" class="nav-link">My movies</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/add-movie" class="nav-link">Add movie</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/logout" class="nav-link">Logout</router-link>
          </li>
        </ul>
        <ul v-else class="navbar-nav">
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: mapGetters(['isLoggedIn']),
};
</script>
