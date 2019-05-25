import * as log from 'loglevel';
import Movies from '../models/movies-api';

export const findAllMovies = async (ctx) => {
  ctx.body = await Movies.find().sort({ updatedAt: -1 }).limit(20);
};

export const findMovie = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await Movies.findById(id);
};

export const addNewMovie = async (ctx) => {
  const { body } = ctx.request;
  const movieDetails = {
    ...body
  };
  try {
    const newMovie = new Movies(movieDetails);
    ctx.body = await newMovie.save();
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
};

export const destroy = async (ctx) => {
  const { id } = ctx.params;
  const movie = await Movies.findById(id);

  // Delete movie from database and return deleted object as reference
  ctx.body = await movie.remove();
};
