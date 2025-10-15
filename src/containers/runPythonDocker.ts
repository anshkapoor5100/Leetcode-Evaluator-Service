import Docker from 'dockerode'
import createContainer from './containerFactory.js'
import type { TestCase, TestCases } from '../types/testCases.js'
import constants from '../utils/constants.js'
import pythonImage from '../utils/constants.js'
import { raw } from 'express'
import { decodeDockerStream } from './decodeDockerStream.js'
export async function runPython(code:string, inputTestcase:string){
    const rawLogBuffer: Buffer[] = [];
    console.log("initializing a python docker container")
    const runCmd = `echo '${code.replaceAll("'","\\'")}' > test.py && echo '${inputTestcase.replaceAll("'","\\'")}' | python3 test.py`
    const pythonDockerContainer = await createContainer(pythonImage,[
        '/bin/sh',
        '-c',
        runCmd
    ]);
    await pythonDockerContainer.start();
    console.log("python Docker Container Started")

    const loggerStream = await pythonDockerContainer.logs({
        follow:true, //whether the logs are stream or returned as string
        stdout:true,
        timestamps:false,
        stderr:true,
    });
    // attach events on the stream object
    loggerStream.on('data',(data)=>{
        rawLogBuffer.push(data);
    })
    loggerStream.on('end',()=>{
        console.log(rawLogBuffer)
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream); 
    })
    return pythonDockerContainer;
}