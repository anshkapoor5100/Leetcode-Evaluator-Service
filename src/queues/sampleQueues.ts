import { Queue } from 'bullmq';
import redisConnection from '../config/redisConfig.js';
const myQueue = new Queue('sampleQueue',{connection:redisConnection});
export default myQueue;