import Router from 'koa-router';
import * as RpsGameController from '../controllers/movies-app';

const router = new Router();

router.get('/', RpsGameController.moviesPage);
router.get('/404', RpsGameController.error404);

module.exports = router.routes();
