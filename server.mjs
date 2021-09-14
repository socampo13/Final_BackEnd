import express, { response } from 'express';
import http from 'http';
import path from 'path';
import * as SocketIo from 'socket.io';
import { Server } from 'socket.io';
import { Memoria } from './Memoria.mjs';
import handlebars from 'express-handlebars';
import { renderSignUpForm, signup, renderSigninForm, signin, logout } from "../controllers/users.controller";  
/* import { isAuthenticated } from './autenticacion';
import { createNewProduct, renderProductos, updateProducto, borrarProducto, renderEdit } from "./controllers/products.controller"; */
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
app.set('views', './views');
app.set('partials', './partials');
app.set('view engine', 'hbs')
app.engine( 'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'main',
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
////////////////////////////////////////////ROUTER PRODUCTOS//////////////////////////////////////////
app.get('/', (req, res) => {
    res.render('index.hbs')
});
app.get('/api/productos/vista', (req, res) => {
    response.render('/views/pages/productos.hbs', {productos: memoria.getArray()});
});
app.get('/api/productos/listar/:id', (req, res) => {
    const result = memoria.getElementById(req.params.id);

    if(result.length > 0) {
        res.status(200).send(JSON.stringify(result[0]))
    } else {
        result.staus(404).send({error: 'Product not found'})
    }
});
app.post('/api/productos/guardar', (req, res) => {
    const producto = req.body;

    if(producto.precio && producto.title && producto.thumbnail){
        memoria.addElement(producto)
        res.redirect('/');
    } else {
        res.status(400).send({error: 'Incomplete information'})
    }
});
app.put('/api/productos/actualizar/:id', (req, res) => {
    const {id} = req.params.id;
    const newProduct = req.body;

    memoria.updateElement(newProduct, id);
    res.send(newProduct);
});
app.delete('/api/productos/borrar/:id', (req, res) => {
    Memoria.deleteById(req.body.id)
});
//////////////////////////////////////////////ROUTER CARRITO/////////////////////////////////////////////
app.get('/api/carrito/listar/:id', (req, res) => {
    const resultCarrito = memoria.getElementById(req.params.id);

    if(resultCarrito.length > 0){
        res.status(200).send(JSON.stringify(resultCarrito[0]))
    } else {
        resultCarrito.status(404).send({error: 'No items added to cart'})
    }
});
app.post('/api/carrito/guardar/id_producto', (req, res) => {
    const productoCarrito = req.body;

    
});
app.delete('/api/carrito/borrar/:id', (req, res) => {
    Memoria.deleteById(req.body.id)
});
////////////////////////////////////////////WEBSOCKET///////////////////////////////////////////////////////
io.sockets.on('products', (socket) => {
    console.log('Gracias');
    socket.on('producto', (data) => {
        io.sockets.emit('carga producto', data)
    });
});

io.on("products", (socket) => {
    console.log("New product uploaded");
    socket.emit("items", items);

    socket.on("new-item", (data) => {
        items.push(data);
        ioServer.sockets.emit("items", items);
    });
});
////////////////////////////////////////////////////////////


router.get("/users/signup", renderSignUpForm);
router.post("/users/signup", signup);
router.get("/users/signin", renderSigninForm);
router.post("/users/signin", signin);
router.get("/users/logout", logout);
