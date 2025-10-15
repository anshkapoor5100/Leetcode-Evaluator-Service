import createContainer from './containerFactory.js'
import type { TestCase, TestCases } from '../types/testCases.js'
import { javaImage } from '../utils/constants.js'
import { decodeDockerStream } from './decodeDockerStream.js'
import pullImage from './pullImage.js';
export async function runJava(code:string, inputTestcase:string){
    const rawLogBuffer: Buffer[] = [];
    await pullImage(javaImage);
    console.log("initializing a python docker container")
    const runCmd = `echo '${code.replaceAll("'","\\'")}' > Main.java && javac Main.java && echo '${inputTestcase.replaceAll("'","\\'")}' | java Main`
    const javaDockerContainer = await createContainer(javaImage,[
        '/bin/sh',
        '-c',
        runCmd
    ]);
    await javaDockerContainer.start();
    console.log("python Docker Container Started")

    const loggerStream = await javaDockerContainer.logs({
        follow:true, //whether the logs are stream or returned as string
        stdout:true,
        timestamps:false,
        stderr:true,
    });
    // attach events on the stream object
    loggerStream.on('data',(data)=>{
        rawLogBuffer.push(data);
    })
    await new Promise((resolve, _)=>{
        loggerStream.on('end',()=>{
        console.log(rawLogBuffer)
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream); 
        resolve(decodedStream);
        })
    })
    await javaDockerContainer.remove();
    return javaDockerContainer;
}