import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';
import Cors from '@koa/cors';
import BodyParser from 'koa-bodyparser';
import Helmet from 'koa-helmet';
import respond from 'koa-respond';
import mongoose from 'mongoose';
import serve from 'koa-static';
import compress from 'koa-compress';
import { createReadStream } from 'fs';
import { apiRoutes, appRoutes } from './routes';

const app = new Koa();
const apiRouter = new Router();
const appRouter = new Router();

const handle404Errors = (ctx) => {
  if (ctx.status !== 404) return;
  ctx.type = 'html';
  ctx.body = createReadStream('./dist/index.html');
};

app.use(compress());
app.use(Helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors());
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror (err, ctx) {
    if (err) {
      console.log(err.stack);
    }
    ctx.throw('body parse error', 422)
  }
}));

app.use(respond());

// API routes
apiRoutes(apiRouter);
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
// APP routes
appRoutes(appRouter);
app.use(appRouter.routes());
app.use(serve('./dist'));
app.use(handle404Errors);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

export default app;
