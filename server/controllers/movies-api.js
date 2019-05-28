import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as log from 'loglevel';
import * as validation from '../../src/common/formValidation';
import Movies from '../models/movies';
import Users from '../models/users';
import { secret } from '../jwt';

export const findAllMovies = async (ctx) => {
  ctx.body = await Movies.find().sort({ updatedAt: -1 }).limit(20);
};

export const findMovie = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await Movies.findById(id);
};

export const login = async (ctx) => {
  const { body } = ctx.request;
  const loginDetails = {
    ...body
  };
  try {
    const users = new Users(loginDetails);
    // check user, login and redirect
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({ role: 'admin' }, secret),
      message: 'Successfully logged in!'
    };
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
};

export const register = async (ctx) => {
  const { body } = ctx.request;
  const registerDetails = {
    ...body
  };
  const userAlreadyExists = await Users.find(
    {
      $or: [
        { user: registerDetails.user },
        { email: registerDetails.email }
      ]
    });
  if (userAlreadyExists.length) {
    log.error(`Email "${registerDetails.email}" or user "${registerDetails.user}" already exists`);
    ctx.response.status = 403;
    return;
  }
  try {
    registerDetails.password = bcrypt.hashSync(body.password, 10);
    registerDetails.email = 'boss@gmail.com';
    console.log('body.password:', body.password);
    console.log('registerDetails:', registerDetails);
    const users = new Users(registerDetails);
    ctx.body = await users.save();
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
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
