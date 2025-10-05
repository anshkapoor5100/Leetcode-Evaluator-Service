import sampleQueue from '../queues/sampleQueues.js';
export default async function (name: string, payload: Record<string, unknown>, priority:number) {
    await sampleQueue.add(name, payload, { priority });
    console.log("successfully added job to the queue");
}