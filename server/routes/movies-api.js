import Router from 'koa-router';
import * as MoviesApiController from '../controllers/movies-api';
import jwt from '../jwt';

const router = new Router();

router.get('/', MoviesApiController.findAllMovies);
router.get('/mine', jwt, MoviesApiController.findMyMovies);
router.post('/login', MoviesApiController.login);
router.post('/register', MoviesApiController.register);
router.post('/add-movie', jwt, MoviesApiController.addNewMovie);
router.get('/:id', MoviesApiController.findMovie);
router.delete('/movie/:id', jwt, MoviesApiController.deleteMovie);
router.put('/movie/:id', jwt, MoviesApiController.editMovie);

module.exports = router.routes();
