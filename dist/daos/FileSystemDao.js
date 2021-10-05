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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDao = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var __dirname = path_1.default.resolve();
var FileSystemDao = /** @class */ (function () {
    function FileSystemDao() {
        this.products = [];
        this.id = 1;
        this.count = 1;
    }
    FileSystemDao.prototype.getProducts = function () {
        fs_1.default.readFile(__dirname + "/db/filesystem.txt", "utf8", function (err, data) {
            if (data) {
                console.log(data);
                return data;
            }
            else {
                console.log("Archivo vacio");
            }
        });
        return this.products;
    };
    FileSystemDao.prototype.getProductById = function (id) {
        var product = this.products.find(function (element) { return element.id === id; });
        console.log(product);
        return product;
    };
    FileSystemDao.prototype.insertProduct = function (product) {
        var _this = this;
        var date = new Date();
        var templateDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ";
        var newProduct = __assign(__assign({}, product), { id: this.count, templateDate: templateDate });
        fs_1.default.appendFile(__dirname + "/db/filesystem.txt", JSON.stringify(newProduct), function (err) {
            if (err) {
                console.log("Ha ocurrido un error al insertar el producto");
            }
            else {
                _this.products.push(__assign({}, newProduct));
                _this.count++;
                console.log("Producto insertado correctamente");
            }
        });
    };
    FileSystemDao.prototype.updateProduct = function (product, id) {
        var index = this.products.findIndex(function (element) { return element.id === id; });
        this.products[index] = product;
        fs_1.default.writeFile(__dirname + "/db/filesystem.txt", product, function (err) {
            if (err) {
                console.log("Ha ocurrido un error al actualizar");
            }
            else {
                console.log("Producto actualizado");
            }
        });
    };
    FileSystemDao.prototype.deleteProduct = function (id) {
        var index = this.products.findIndex(function (element) { return element.id === id; });
        this.products.splice(index, 1);
    };
    return FileSystemDao;
}());
exports.FileSystemDao = FileSystemDao;
