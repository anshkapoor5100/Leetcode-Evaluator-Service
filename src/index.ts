import express from 'express';
import serverconfig from './config/serverConfig.js';
import apiRouter from './routes/index.js';
const app = express()
app.get('/', (_req, res) => {
  let x = 10;
  console.log(x);
  return res.json({ message: 'Hello World!' })
})
app.use('/api', apiRouter);
app.listen(serverconfig.PORT, () => console.log(`app listening on port ${serverconfig.PORT}!`));
