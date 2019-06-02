import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const loggedInOnly = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    return next();
  }
  return next('/login');
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('./views/Logout.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      beforeEnter: loggedInOnly,
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/add-movie',
      name: 'Add Movie',
      beforeEnter: loggedInOnly,
      component: () => import('./views/AddMovie.vue'),
    },
    {
      path: '/my-movies',
      name: 'My Movies',
      beforeEnter: loggedInOnly,
      component: () => import('./views/MyMovies.vue'),
    },
  ],
});
