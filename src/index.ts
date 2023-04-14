import express, { Request, Response, Application } from 'express';
import router from './routes';

const app: Application = express();

const port: number = 5000;

app.use('/', router);
app.get('/api', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, (): void => {
  console.log(`server started at localhost:${port}`);
});

export default app;
