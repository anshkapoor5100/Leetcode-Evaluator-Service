import type { Job } from "bullmq";
import type { IJob } from "../types/bullMqJobDefinition.js";
import type { submissionPayload } from "../types/submissionPayload.js";
import { runCpp } from "../containers/runCpp.js";
class SubmissionJob implements IJob{
    name: string;
    payload: Record<string, submissionPayload>;
    constructor(payload:Record<string, submissionPayload>){
        this.name = this.constructor.name;
        this.payload = payload;
    }
    handle = async (job?: Job) => {
        console.log("handler of the job");
        console.log(this.payload);
        if(job){
            const key:string = Object.keys(this.payload)[0] || "a";
            console.log(this.payload[key]?.language);
            console.log(this.payload[key]);
            if(this.payload[key]?.language === "CPP"){
                const response = await runCpp(this.payload[key]?.code,this.payload[key]?.inputCase);
                console.log("evaluated Resonse", response)
            }
        }
    };
    failed = (job?: Job): void=> {
        console.log("failed of the job");
        if(job) console.log(job.id);
    };
}
export default SubmissionJob;