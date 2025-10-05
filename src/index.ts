import express from 'express';
import type {Express} from 'express';
import serverconfig from './config/serverConfig.js';
import apiRouter from './routes/index.js';
import sampleQueueProducer from './producer/sampleQueueProducer.js';
import {sampleWorker}  from './workers/sampleWorker.js';
import bullBoardAdapter from "./config/bullBoardConfig.js";
import bodyParser from 'body-parser';
const app: Express = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text());
app.use('/api', apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());
app.listen(serverconfig.PORT, () => {
    console.log(`app listening on port ${serverconfig.PORT}!`);
    console.log(`BullBoard dashboard running on: http://localhost:${serverconfig.PORT}/ui`);
    sampleWorker('sampleQueue');
    
    sampleQueueProducer('SampleJob', { 
      name:"ansh",
      company: "Google",
      role: "SDE",
      location: "India"
    },5);
    sampleQueueProducer('SampleJob', { 
      name:"kapoor",
      company: "Amazon",
      role: "SDE",
      location: "India"
    },18);
});
