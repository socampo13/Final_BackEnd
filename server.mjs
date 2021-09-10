import express from 'express';
import http from 'http';
import path from 'path';
import * as SocketIo from 'socket.io';
import { Server } from 'socket.io';
////////////////////////////////////////////
const app = express();
const server = http.Server(app);
const ioServer = new Server(server);
const PORT = 8080;
const memoria = new Memoria();
const router = express.Router();
const io = new SocketIo.Server(server);
const __dirname = path.resolve();
////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('${__dirname}/public'));
app.use('/api', router);
app.set('views', '/views');
app.set('partials', '/partials');
app.set('view engine', 'hbs')
app.engine(
    'hbs',
    Handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialDir: __dirname + '/views/partials', 
    })
);
////////////////////////////////////////////
server.listen(PORT, error => {
    if (error) {
        throw Error(`Error running server: ${error}`);
    } 
    console.log(`Server running on port ${PORT}`);
});