import Docker from 'dockerode'
async function  createContainer(image:string, cmdExecutable:string[]){
    const docker = new Docker();
    const container = docker.createContainer({
        Image:image,
        Cmd:cmdExecutable,
        AttachStdin:true,// to enable input streams
        AttachStdout:true,// to enable output streams
        AttachStderr:true,// to enable error streams
        Tty:false ,
        OpenStdin:true,// keep the input stream open even if no interaction
    })
    return container;
}
export default createContainer;