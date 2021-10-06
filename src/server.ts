import { DaoFactory } from './factory';
import { IDao } from './interface/daos/IDao';
import express, { Request, Response } from 'express';
import path from 'path';
import * as socketIo from 'socket.io';

const admin: boolean = true;
const port = 8080;
const app = express();
const routerProducts = express.Router();
const routerCart = express.Router();
const __dirname = path.resolve();


app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
server.on("error", (error: any) => {
    console.log(error);
});
app.use("/productos", routerProducts);
app.use("/carrito", routerCart);

//Factory - Selección Dao
const FileSystemDao = 1;
const MySqlDao = 2;
const SqlDao = 3;
const MongoDbDao = 4;
const MongoDbaaSDao = 5;
const FirebaseDao = 6;

const daoFactory = new DaoFactory();
const dao: IDao = daoFactory.getDao(FileSystemDao);

//Websockets

const io = new socketIo.Server(server);

app.get("/", (req: Request, res: Response) => {
    res.sendFile(`${__dirname}/'src/public/index.html`)
});
app.get("/carrito", (req: Request, res: Response) => {
    res.sendFile(`${__dirname}/src/public/html/cart.html`);
});

interface Message{
    author: string;
    date: string;
    text: string;
}

const messages: Array<Message> = [
    {
        author: " ",
        date: " ",
        text: " ",
    },
];

io.on("connection", (socket: any) => {
    const productsTemplate = dao.getProducts();
    socket.emit("loadProduct", productsTemplate);
    console.log("Online");

    const cartTemplate = dao.getProducts();
    socket.emit("addToCart", cartTemplate);
    console.log("Online");

    socket.emit("messages", messages);

    socket.on("new-message", (data: any) => {
        messages.push(data);
        io.sockets.emit("messages", messages);
    });
});

//Router products

//Products list
routerProducts.get("/listar", (req: Request, res: Response) => {
    const result = dao.getProducts();
    if(result !== undefined){
        res.status(200).send(JSON.stringify(result));
    }else{
        res.status(404).send({ error: "No loaded products" });
    }
});

// Id products list
routerProducts.get("/listar/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const result = dao.getProductById(Number(id));
    if(result == null){
        res.status(404).send("Product not found");
    }else{
        res.status(200).send(JSON.stringify(result));
    }
});

// Add product

routerProducts.post("/guardar", (req: Request, res: Response) => {
    if(admin){
        const product = req.body;
        const productsTemplate = dao.getProducts();
        dao.insertProduct(product);
        io.sockets.emit("loadProducts", productsTemplate);
        res.redirect("/");
    }else{
        res.send({ Error: -1, Description: "Not authorized"});
    }
});

//Update product

routerProducts.put("/update/:id", (req: Request, res: Response) => {
    const date = new Date();
    const dateTemplate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes}:${date.getSeconds}`;

    if(admin){
        const id = req.params.id;
        const productBody = req.body;
        const newProduct = { ...productBody, id, dateTemplate};
        dao.updateProduct(productBody, Number(id));
        res.send(newProduct);
    }else{
        res.send({ Error: -1, Description: "Not authorized" });
    }
});

// Delete by Id

routerProducts.delete("/borrar/:id", (req: Request, res: Response) => {
    const index = req.params.id;
    const deletesObject = dao.getProductById(Number(index));
    dao.deleteProduct(Number(index));

    res.status(200).send(deletesObject);
});



//CART ROUTES

routerCart.get("/listar", (req: Request, res: Response) => {
    const result = dao.getProducts();
    if(result !== undefined){
        res.status(200).send(JSON.stringify(result));
    }else{
        res.status(404).send({ Error: "No loaded products" });
    }
});

routerCart.post("/listar/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const result = dao.getProductById(Number(id));
    if(result == null){
        res.status(404).send("Product not found");
    }else{
        res.status(200).send(JSON.stringify(result));
    }
});

routerCart.post("/guardar", (req: Request, res: Response) => {
    if(admin){
        const product = req.body;
        const productsTemplate = dao.getProducts();
        dao.insertProduct(product);
        io.sockets.emit("loadProducts", productsTemplate);
        res.redirect("/");
    }else{
        res.send({ Error: -1, Description: "Not authorized" });
    }
});

routerCart.put("/actualiar/:id", (req: Request, res: Response) => {
    const date = new Date();
    const dateTemplate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes}:${date.getSeconds}`;

    if(admin){
        const id = req.params.id;
        const productBody = req.body;
        const newProduct = { ...productBody, id, dateTemplate};
        dao.updateProduct(productBody, Number(id));
        res.send(newProduct);
    }else{
        res.send({ Error: -1, Description: "Not authorized" });
    }
});

routerCart.delete("/borrar/:id", (req: Request, res: Response) => {
    const index = req.params.id;

    const deletesObject = dao.getProductById(Number(index));
    dao.deleteProduct(Number(index));

    res.status(200).send(deletesObject);
});

