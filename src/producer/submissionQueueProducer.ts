import submissionQueue from '../queues/submissionQueue.js';
export default async function (payload: Record<string, unknown>) {
    await submissionQueue.add("Submission", payload);
    console.log("successfully added submissionJob to the queue");
}
