import Router from 'koa-router';
import * as MoviesApiController from '../controllers/movies-api';
import jwt from '../jwt';

const router = new Router();

router.get('/', MoviesApiController.findAllMovies);
router.post('/login', MoviesApiController.login);
router.post('/register', MoviesApiController.register);
router.post('/add-movie', jwt, MoviesApiController.addNewMovie);
router.get('/:id', MoviesApiController.findMovie);
router.delete('/:id', jwt, MoviesApiController.destroy);

module.exports = router.routes();
