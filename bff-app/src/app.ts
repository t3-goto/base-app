import Express from 'express';
import webpack from './lib/webpack';

const app = Express();

webpack(app);

app.get('/', (req: Express.Request, res: Express.Response) => {
  const data = { message: process.env.NODE_ENV };
  res.send(data);
});

const port = 8888;
const host = 'localhost';

app.listen(port, host, () => {
  console.log(`Running on http://${host}:${port}`);
});
