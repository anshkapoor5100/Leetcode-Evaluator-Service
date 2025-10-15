import type { DockerStreamOutput } from "../types/dockerStreamOutput.js";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants.js";


export function decodeDockerStream(buffer:Buffer):DockerStreamOutput{
    let offset = 0; //track current position in buffer while parsing
    //store accumulated stdout and sterr 
    const output:DockerStreamOutput = {
        stdout:'',
        stderr:''
    }
    while(offset<buffer.length){
        const typeOfString = buffer[offset];

        // offset of 4 bytes from start of the data
        const length = buffer.readUInt32BE(offset+4);
        
        offset += DOCKER_STREAM_HEADER_SIZE;
        if(typeOfString === 1){
            //stdout stream
            output.stdout += buffer.toString('utf-8',offset,offset+length);
        }
        else if(typeOfString === 2){
            //stderr stream
            output.stderr += buffer.toString('utf-8',offset,offset+length);
        }
        offset += length;
    }
    return output;
}