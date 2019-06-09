import koaJwt from 'koa-jwt';
import jwt from 'jsonwebtoken';

export const secret = process.env.JWT_SECRET || 'jwt-s3cr3t-p@$$w0rd';

export const getLoggedInUser = (authHeader) => {
  const token = authHeader.authorization.split(' ')[1];
  const { user } = jwt.verify(token, secret);
  return user;
};

export default koaJwt({ secret });
