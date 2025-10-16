import { Job, Worker } from "bullmq";
import SubmissionJob from "../jobs/submissionJob.js"; 
import redisConnection from "../config/redisConfig.js";
export function submissionWorker(queueName: string){
    new Worker(queueName,
    async (job:Job) => {
        console.log("submission worker", job)
        if(job.name === "Submission"){
            
            const submissionJobInstance = new SubmissionJob(job.data);
            submissionJobInstance.handle(job);
            return true;
        }
    },
    {
        connection: redisConnection
    });
};