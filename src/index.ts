import express from 'express';
import serverconfig from './config/serverConfig.js';
const app = express();;
app.get('/', (_req, res) => {
    return res.json({ message: 'Helo World!' });
});

app.listen(serverconfig.PORT, () => console.log(`app listening on port ${serverconfig.PORT}!`));
