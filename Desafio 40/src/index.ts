import myServer from './services/server';
import { dbConnection } from './db/mongoDB';
import { initWsServer } from './services/sockets';
import os from 'os';
import { portArgument, clusterArgument } from './util/getArguments.js';
import { logger } from './middlewares/logger';
import cluster from 'cluster';
import express from 'express';

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

const app = express();

app.listen(Number(process.PORT), process.HOST, () => 
    console.log(`Server running on ${process.HOST}:${process.PORT}`)
)



dbConnection();
initWsServer(myServer);

const port = portArgument || 8080;
const clusterArgument = clusterArgument || false;
const numCPUs = os.cpus().length;

if(cluster.isMaster && clusterArgument){
    logger.info(`Number of CPU's is ${numCPUs}`);
    logger.info(`PID ${process.pid}`);

    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit',(worker : any) => {
        logger.info(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster.fork();
    });
}else{
    myServer.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
}

const singletonMongo = Singleton.getInstance();
const singletonSQL = Singleton.getInstance();
const singletonFS = Singleton.getInstance();
const singletonSQLITE = Singleton.getInstance();

singletonMongo.printValue();
singletonSQL.printValue();
singletonFS.printValue();
singletonSQLITE.printValue();

console.log(singletonMongo === singletonSQL);
console.log(singletonMongo === singletonFS);
console.log(singletonMongo === singletonSQLITE);




