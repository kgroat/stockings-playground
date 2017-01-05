
import * as express from 'express';
import * as http from 'http';
import * as bp from 'body-parser';
import { middleware, MiddlewareOptions, Request, Response } from 'express-stockings';
export var app: express.Application = express();

app.use(express.static('public'));

//app.use(bp.text());
app.use(bp.json());
//app.use(bp.urlencoded({
//  extended: true
//}));

app.use(middleware({
  server: 5555,
  privateKey: 'asdf'
}));

import { router } from './router';
app.use('/api', router);

const port = process.env.PORT || 3000;

var server = http.createServer(app);
server.listen(port, function(){
  console.log('playground running on port', port);
});
