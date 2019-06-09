import Router from 'koa-router';
import moviesPage from '../controllers/movies-app';

const router = new Router();

router.get('/', moviesPage);

module.exports = router.routes();
