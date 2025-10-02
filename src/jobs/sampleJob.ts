import type { Job } from "bullmq";
import type { IJob } from "../types/bullMqJobDefinition.js";

class SampleJob implements IJob{
    name: string;
    payload: Record<string, unknown>;
    constructor(payload:Record<string, unknown>){
        this.name = this.constructor.name;
        this.payload = payload;
    }
    handle = () => {
        console.log("handler of the job");
    };
    failed = (job?: Job): void=> {
        console.log("failed of the job");
        if(job) console.log(job.id);
    };
}
export default SampleJob;