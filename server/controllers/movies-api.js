import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as log from 'loglevel';
import Movies from '../models/movies';
import Users from '../models/users';
import { secret, getLoggedInUser } from '../jwt';

export const findAllMovies = async (ctx) => {
  ctx.body = await Movies.find().sort({ updatedAt: -1 }).limit(20);
};

export const findMyMovies = async (ctx) => {
  try {
    const { header } = ctx.request;
    const user = getLoggedInUser(header);
    ctx.body = await Movies.find({ user }).sort({ updatedAt: -1 }).limit(20);
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
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
    const account = await Users.findOne({
      $or: [
        { user: { $regex: new RegExp(loginDetails.userOrEmail, 'i') } },
        { email: { $regex: new RegExp(loginDetails.userOrEmail, 'i') } }
      ]
    });
    if (!account) {
      throw new Error(`No account found after searching user or email "${loginDetails.userOrEmail}".`);
    }
    if (bcrypt.compareSync(loginDetails.password, account.password)) {
      ctx.status = 200;
      ctx.body = {
        token: jwt.sign({ user: account.user }, secret, { expiresIn: '7d' }),
        account: {
          user: account.user
        }
      };
    } else {
      throw new Error(`Wrong password for "${loginDetails.userOrEmail}".`);
    }
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
  try {
    const users = new Users(registerDetails);
    const account = await users.save();
    ctx.body = {
      account,
      token: jwt.sign({ user: account.user }, secret, { expiresIn: '7d' })
    };
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
};

export const addNewMovie = async (ctx) => {
  try {
    const { body, header } = ctx.request;
    const token = header.authorization.split(' ')[1];
    const { user } = jwt.verify(token, secret);
    const movieDetails = {
      ...body,
      user
    };
    const newMovie = new Movies(movieDetails);
    ctx.body = await newMovie.save();
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
};

export const deleteMovie = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { header } = ctx.request;
    const token = header.authorization.split(' ')[1];
    const { user } = jwt.verify(token, secret);
    const movie = await Movies.findById(id);
    if (movie.user !== user) {
      throw new Error(`User ${user} tried to delete a movie posted by ${movie.user}.`);
    }
    ctx.body = await movie.remove();
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
};
