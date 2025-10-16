import { Queue } from 'bullmq';
import redisConnection from '../config/redisConfig.js';
const myQueue = new Queue('submissionQueue',{connection:redisConnection});
export default myQueue;