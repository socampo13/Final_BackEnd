import myServer from './services/server';
import {dbConnection} from './db/mongoDB';
import {initWsServer} from './services/sockets';
import os from 'os';
import {portArgument, clusterArgument} from './util/getArguments.js';
import {logger} from './middlewares/logger';
import cluster from 'cluster';
import axios from 'axios';


dbConnection();
initWsServer(myServer);

const port = portArgument || 8080;
const clusterArgument = clusterArgument || false;
const numCPUs = os.cpus().length;

if (cluster.isMaster && clusterArgument) {
  logger.info(`Number of CPU's is ${numCPUs}`);
  logger.info(`PID ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker : any) => {
    logger.info(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  myServer.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}

// axios
axios.get('https://jsonplaceholder.typicode.com/productos/1')
    .then((res) => {
      console.log(res.data);
      return console.log(res.data.title);
    });
  .catch((err) => console.log(err));

axios.get('https://jsonplaceholder.typicode.com/productos' ,{
  params: {
    postId: 2,
  },
})
.then((response) => {
  console.log(response.data);
  return console.error(error);
})
.catch((error) => console.error(error));

(async () => {
  try{
    const response = await axios.get('https://jsonplaceholder.typicode.com/productos/3');
    console.log(response.data);
    console.log(response.data.title);
    
  }catch(error){
    console.error(error);
    
  }
})();
)

