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
import { submissionWorker } from './workers/submissionWorker.js';
import { submissionQueue } from './utils/constants.js';
import submissionQueueProducer from './producer/submissionQueueProducer.js';
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
    submissionWorker(submissionQueue);

    const inputCase = '10';
    const userCode = `
    class Solution {
    public:
        vector<int> permute() {
            vector<int>v;
            for(int i=0;i<10;i++){
                v.push_back(i);
            }
            return v;
        }
    };
    `
    const code = `
    #include <bits/stdc++.h>
    using namespace std;
    ${userCode}
    int main(){
        Solution s;
        vector<int>result = s.permute();
        for(auto &i:result){
            cout<<i<<" ";
        }
        cout<<endl;
        return 0;
    }
    `

    submissionQueueProducer({"1234":{
        language: "CPP",
        inputCase,
        code,

    }})
    // runCpp(code,'10');
});
