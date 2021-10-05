"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("./factory");
var express_1 = __importStar(require("express"));
var path_1 = __importDefault(require("path"));
var socketIo = __importStar(require("socket.io"));
var admin = true;
var port = 8080;
var app = (0, express_1.default)();
var routerProducts = express_1.default.Router();
var routerCart = express_1.default.Router();
var __dirname = path_1.default.resolve();
app.use(express_1.default.static(__dirname + "/src/public"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
var server = app.listen(port, function () {
    console.log("Server running on port " + port);
});
server.on("error", function (error) {
    console.log(error);
});
app.use("/productos", routerProducts);
app.use("/carrito", routerCart);
//Factory - Selección Dao
var FileSystemDao = 1;
var MySqlDao = 2;
var SqlDao = 3;
var MongoDbDao = 4;
var MongoDbaaSDao = 5;
var FirebaseDao = 6;
var daoFactory = new factory_1.DaoFactory();
var dao = daoFactory.getDao(FileSystemDao);
//Websockets
var io = new socketIo.Server(server);
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/'src/public/index.html");
});
app.get("/carrito", function (req, res) {
    res.sendFile(__dirname + "/src/public/html/cart.html");
});
var messages = [
    {
        author: " ",
        date: " ",
        text: " ",
    },
];
io.on("connection", function (socket) {
    var productsTemplate = dao.getProducts();
    socket.emit("loadProduct", productsTemplate);
    console.log("Online");
    var cartTemplate = dao.getProducts();
    socket.emit("addToCart", cartTemplate);
    console.log("Online");
    socket.emit("messages", messages);
    socket.on("new-message", function (data) {
        messages.push(data);
        io.sockets.emit("messages", messages);
    });
});
//Router products
//Products list
routerProducts.get("/listar", function (req, res) {
    var result = dao.getProducts();
    if (result !== undefined) {
        res.status(200).send(JSON.stringify(result));
    }
    else {
        res.status(404).send({ error: "No loaded products" });
    }
});
// Id products list
routerProducts.get("/listar/:id", function (req, res) {
    var id = req.params.id;
    var result = dao.getProductById(Number(id));
    if (result == null) {
        res.status(404).send("Product not found");
    }
    else {
        res.status(200).send(JSON.stringify(result));
    }
});
// Add product
routerProducts.post("/guardar", function (req, res) {
    if (admin) {
        var product = req.body;
        var productsTemplate = dao.getProducts();
        dao.insertProduct(product);
        io.sockets.emit("loadProducts", productsTemplate);
        res.redirect("/");
    }
    else {
        res.send({ Error: -1, Description: "Not authorized" });
    }
});
//Update product
routerProducts.put("/update/:id", function (req, res) {
    var date = new Date();
    var dateTemplate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes + ":" + date.getSeconds;
    if (admin) {
        var id = req.params.id;
        var productBody = req.body;
        var newProduct = __assign(__assign({}, productBody), { id: id, dateTemplate: dateTemplate });
        dao.updateProduct(productBody, Number(id));
        res.send(newProduct);
    }
    else {
        res.send({ Error: -1, Description: "Not authorized" });
    }
});
// Delete by Id
routerProducts.delete("/borrar/:id", function (req, res) {
    var index = req.params.id;
    var deletesObject = dao.getProductById(Number(index));
    dao.deleteProduct(Number(index));
    res.status(200).send(deletesObject);
});
//CART ROUTES
routerCart.get("/listar", function (req, res) {
    var result = dao.getProducts();
    if (result !== undefined) {
        res.status(200).send(JSON.stringify(result));
    }
    else {
        res.status(404).send({ Error: "No loaded products" });
    }
});
routerCart.post("/listar/:id", function (req, res) {
    var id = req.params.id;
    var result = dao.getProductById(Number(id));
    if (result == null) {
        res.status(404).send("Product not found");
    }
    else {
        res.status(200).send(JSON.stringify(result));
    }
});
routerCart.post("/guardar", function (req, res) {
    if (admin) {
        var product = req.body;
        var productsTemplate = dao.getProducts();
        dao.insertProduct(product);
        io.sockets.emit("loadProducts", productsTemplate);
        res.redirect("/");
    }
    else {
        res.send({ Error: -1, Description: "Not authorized" });
    }
});
routerCart.put("/actualiar/:id", function (req, res) {
    var date = new Date();
    var dateTemplate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes + ":" + date.getSeconds;
    if (admin) {
        var id = req.params.id;
        var productBody = req.body;
        var newProduct = __assign(__assign({}, productBody), { id: id, dateTemplate: dateTemplate });
        dao.updateProduct(productBody, Number(id));
        res.send(newProduct);
    }
    else {
        res.send({ Error: -1, Description: "Not authorized" });
    }
});
routerCart.delete("/borrar/:id", function (req, res) {
    var index = req.params.id;
    var deletesObject = dao.getProductById(Number(index));
    dao.deleteProduct(Number(index));
    express_1.response.status(200).send(deletesObject);
});
