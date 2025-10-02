import express from 'express';
import serverconfig from './config/serverConfig.js';
import apiRouter from './routes/index.js';
import sampleQueueProducer from './producer/sampleQueueProducer.js';
import { sampleWorker } from './workers/sampleWorker.js';
const app = express()
app.get('/', (_req, res) => {
  let x = 10;
  console.log(x);
  return res.json({ message: 'Hello World!' })
})
app.use('/api', apiRouter);
app.listen(serverconfig.PORT, () => {
    console.log(`app listening on port ${serverconfig.PORT}!`);
    
    sampleWorker('sampleQueue');
    
    sampleQueueProducer('SampleJob', { 
      name:"ansh",
      company: "Google",
      role: "SDE",
      location: "India"
    });
});
