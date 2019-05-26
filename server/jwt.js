import koaJwt from 'koa-jwt';

const secret = process.env.JWT_SECRET || 'jwt-s3cr3t-p@$$w0rd';

export default koaJwt({ secret });
