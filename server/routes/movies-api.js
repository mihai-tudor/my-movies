import Router from 'koa-router';
import * as MoviesApiController from '../controllers/movies-api';

const router = new Router();

router.get('/', MoviesApiController.findAllMovies);
router.post('/', MoviesApiController.addNewMovie);
router.get('/:id', MoviesApiController.findMovie);
router.delete('/:id', MoviesApiController.destroy);

module.exports = router.routes();
