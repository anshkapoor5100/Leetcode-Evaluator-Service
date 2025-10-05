import express from 'express';
import { pingCheck } from '../../controllers/pingControllers.js';
import submissionRouter from './submissionRoutes.js';

const v1Router = express()
v1Router.use('/submission', submissionRouter)
v1Router.get('/ping', (_req, res) => {
  pingCheck(_req, res);
})
export default v1Router;