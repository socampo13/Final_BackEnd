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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbDao = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var model = require("../models/mongodb");
var MongoDbDao = /** @class */ (function () {
    function MongoDbDao() {
        var _this = this;
        this.products = [];
        this.id = 1;
        this.count = 1;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    mongoose_1.default.connect("mongodb://localhost:27017/ecommerce", function () {
                        console.log("Base de datos conectada");
                    });
                }
                catch (err) {
                    console.log("Ha ocurrido un error", err);
                }
                finally {
                    mongoose_1.default.disconnect(function () {
                        console.log("Base de datos desconectada");
                    });
                }
                return [2 /*return*/];
            });
        }); })();
    }
    MongoDbDao.prototype.getProducts = function () {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var readProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.productos.find()];
                    case 1:
                        readProducts = _a.sent();
                        console.log(readProducts);
                        return [2 /*return*/];
                }
            });
        }); });
        return this.products;
    };
    MongoDbDao.prototype.getProductById = function (id) {
        mongoose_1.default.connect("mongodb://localhost:27017/ecommerce", function () {
            console.log("Base de datos conectada");
            model.productos.find({ id: id }, function (error, docs) {
                if (error) {
                    throw new Error();
                }
                console.log(docs);
                mongoose_1.default.disconnect(function () {
                    console.log("Base de datos desconectada");
                });
            });
        });
        var product = this.products.find(function (element) { return element.id === id; });
        console.log(product);
        return product;
    };
    MongoDbDao.prototype.insertProduct = function (product) {
        var date = new Date();
        var templateDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ";
        var newProduct = __assign(__assign({}, product), { id: this.count, templateDate: templateDate });
        this.products.push(__assign(__assign({}, product), { id: this.count + 1, templateDate: templateDate }));
        this.count++;
        mongoose_1.default.connect("mongodb://localhost:27017/ecommerce", function () {
            console.log("Base de datos conectada");
            model.productos.insertMany(newProduct, function (error, docs) {
                if (error) {
                    throw new Error();
                }
                console.log(docs);
                mongoose_1.default.disconnect(function () {
                    console.log("Base de datos desconectada");
                });
            });
        });
    };
    MongoDbDao.prototype.updateProduct = function (product, id) {
        var index = this.products.findIndex(function (element) { return element.id === id; });
        this.products[index] = product;
        mongoose_1.default.connect("mongodb://localhost:27017/ecommerce", function () {
            console.log("Base de datos conectada");
            model.productos.update({ id: id }, {
                $set: {
                    id: product.id,
                    templateDate: product.templateDate,
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    stock: product.stock,
                    thumbnail: product.thumbnail,
                },
            }, function (error, docs) {
                if (error) {
                    throw new Error();
                }
                console.log(docs);
                mongoose_1.default.disconnect(function () {
                    console.log("Base de datos desconectada");
                });
            });
        });
    };
    MongoDbDao.prototype.deleteProduct = function (id) {
        var index = this.products.findIndex(function (element) { return element.id === id; });
        this.products.splice(index, 1);
        mongoose_1.default.connect("mongodb://localhost:27017/ecommerce", function () {
            console.log("Base de datos conectada");
            model.productos.deleteOne({ id: id }, function (error, docs) {
                if (error) {
                    throw new Error();
                }
                console.log(docs);
                mongoose_1.default.disconnect(function () {
                    console.log("Base de datos desconectada");
                });
            });
        });
    };
    return MongoDbDao;
}());
exports.MongoDbDao = MongoDbDao;
