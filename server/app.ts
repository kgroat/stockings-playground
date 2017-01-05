
import * as express from 'express';
import * as http from 'http';
import * as bp from 'body-parser';
import { middleware, MiddlewareOptions, Request, Response } from 'express-stockings';
export var app: express.Application = express();

const port = process.env.PORT || 3000;

var server = http.createServer(app);

app.use(express.static('public'));

app.use(bp.json());

app.use(middleware({
  server: server,
  privateKey: 'asdf'
}));

import { router } from './router';
app.use('/api', router);

server.listen(port, function(){
  console.log('playground running on port', port);
});
