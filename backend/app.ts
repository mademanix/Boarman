import express from 'express';
import * as http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import {ApiBaseController} from './controllers/api-base-controller';
import {DrinkController} from './controllers/drink-controller';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<ApiBaseController> = [];

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('/ called');
  res.status(200).send('API server on - port 3000');
}).all('/', (req: express.Request, res: express.Response) => {
  res.status(405).send('Method not allowed');
})

routes.push(new DrinkController(app));


server.listen(port, () => {
  routes.forEach((route: ApiBaseController) => {
    console.log(`${route.getName()} loaded`);
  })
})
