import express from 'express';
import { pingCheck } from '../../controllers/pingControllers.js';
const v1Router = express()
v1Router.get('/ping', (_req, res) => {
  pingCheck(_req, res);
})

export default v1Router;