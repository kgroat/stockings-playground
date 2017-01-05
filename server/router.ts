
import * as express from 'express';
export var router: express.Router = express.Router();

import { messageRouter } from './controllers/message';
router.use('/message', messageRouter);
router.get('/asdf', (req, res) => { res.send('it worked') });
