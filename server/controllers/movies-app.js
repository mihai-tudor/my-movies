import { createReadStream } from 'fs';

const moviesPage = (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream('./dist/index.html');
};

export default moviesPage;
