import sampleQueue from '../queues/sampleQueues.js';
export default async function (name: string, payload: Record<string, unknown>) {
    await sampleQueue.add(name, payload);
    console.log("successfully added job to the queue");
}