import createContainer from './containerFactory.js'
import type { TestCase, TestCases } from '../types/testCases.js'
import { cppImage } from '../utils/constants.js'
import { decodeDockerStream } from './decodeDockerStream.js'
import pullImage from './pullImage.js';
export async function runCpp(code:string, inputTestcase:string){
    const rawLogBuffer: Buffer[] = [];
    await pullImage(cppImage);
    console.log("initializing a python docker container")
    const runCmd = `echo '${code.replaceAll("'","\\'")}' > main.cpp && g++ main.cpp -o main && echo '${inputTestcase.replaceAll("'","\\'")}' | ./main`
    const cppDockerContainer = await createContainer(cppImage,[
        '/bin/sh',
        '-c',
        runCmd
    ]);
    await cppDockerContainer.start();
    console.log("python Docker Container Started")

    const loggerStream = await cppDockerContainer.logs({
        follow:true, //whether the logs are stream or returned as string
        stdout:true,
        timestamps:false,
        stderr:true,
    });
    // attach events on the stream object
    loggerStream.on('data',(data)=>{
        rawLogBuffer.push(data);
    })
    const response = await new Promise((resolve)=>{
        loggerStream.on('end',()=>{
        console.log(rawLogBuffer)
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream); 
        console.log(decodedStream.stdout); 
        resolve(decodedStream);
        })
    })
    await cppDockerContainer.remove();
    return response;
}