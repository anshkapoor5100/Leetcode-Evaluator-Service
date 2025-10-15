import express from 'express';
import type {Express} from 'express';
import serverconfig from './config/serverConfig.js';
import apiRouter from './routes/index.js';
import sampleQueueProducer from './producer/sampleQueueProducer.js';
import {sampleWorker}  from './workers/sampleWorker.js';
import bullBoardAdapter from "./config/bullBoardConfig.js";
import bodyParser from 'body-parser';
import { runPython } from './containers/runPythonDocker.js';
import { runJava } from './containers/runJavaDocker.js';
import { runCpp } from './containers/runCpp.js';
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
    
    const code = `
    #include <bits/stdc++.h>
    using namespace std;
    int main(){
        int x;
        cin>>x;
        for(int i=0; i<x; i++){
            cout<<i<<" ";
        }
    }
    `
    runCpp(code,'10');
});
