import { Job, Worker } from "bullmq";
import SampleJob from "../jobs/sampleJob.js"; 
import redisConnection from "../config/redisConfig.js";
export function sampleWorker(queueName: string){
    new Worker(queueName,
    async (job:Job) => {
        console.log("sample worker", job)
        if(job.name === "SampleJob"){
            const sampleJobInstance = new SampleJob(job.data);
            sampleJobInstance.handle(job);
            return true;
        }
    },
    {
        connection: redisConnection
    });
};