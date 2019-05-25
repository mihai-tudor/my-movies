import ApiRoutes from './movies-api';
import AppRoutes from './movies-app';

export const apiRoutes = (router) => {
  router.prefix('/v1');
  router.use('/my-movies', ApiRoutes);
};

export const appRoutes = (router) => {
  router.use(AppRoutes);
};
