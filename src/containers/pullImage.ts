import Docker from 'dockerode';

export default async function pullImage(imageName:string){
    try{
        const docker = new Docker();
        console.log(`Pulling image: ${imageName}`);

        // docker.pull returns a promise of a stream when no callback is provided
        const stream = await docker.pull(imageName);

        // The promise resolves when the pull is complete.
        await new Promise((resolve, reject) => {
            docker.modem.followProgress(stream, (err, res) => {
                if (err) {
                    return reject(err);
                }
                console.log(`Image ${imageName} pulled successfully.`);
                resolve(res);
            }, (event) => {
                // You can optionally log progress events
                console.log(event.status);
            });
        });
    }
    catch(err){
        console.log(err);
    }
}