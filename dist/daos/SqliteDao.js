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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteDao = void 0;
var sqlite_1 = require("../options/sqlite");
var knex = require("knex")(sqlite_1.options_sqlite);
var SqliteDao = /** @class */ (function () {
    function SqliteDao() {
        var _this = this;
        this.products = [];
        this.id = 1;
        this.count = 1;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var tableName, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        tableName = "products";
                        return [4 /*yield*/, knex.schema.hasTable(tableName)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, knex.schema.dropTable(tableName)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, knex.schema
                            .createTable("products", function (table) {
                            table.increments("id"),
                                table.date("timestamp"),
                                table.string("title"),
                                table.string("description"),
                                table.integer("code"),
                                table.float("price"),
                                table.integer("stock"),
                                table.string("thumbnail");
                        })
                            .then(function () { return console.log("Se ha creado la tabla correctamente"); })
                            .catch(function (err) {
                            return console.log("No se ha podido crear la tabla o la misma ya existe", err);
                        })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); })();
    }
    SqliteDao.prototype.getProducts = function () {
        var _this = this;
        var row = "";
        var tableName = "products";
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, knex
                                .from("products")
                                .select("*")
                                .then(function (rows) {
                                for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                                    row = rows_1[_i];
                                    console.log(row["id"] + " " + row["title"] + " " + row["price"]);
                                }
                            })
                                .catch(function (err) {
                                console.log("Sin productos", err);
                            })];
                    case 1:
                        _a.products = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return this.products;
    };
    SqliteDao.prototype.getProductById = function (id) {
        var row = "";
        var product = knex
            .from("products")
            .select("*")
            .where("id", "=", id)
            .then(function (rows) {
            for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                row = rows_2[_i];
                console.log(row["id"] + " " + row["title"] + " " + row["price"]);
            }
        })
            .catch(function (err) { return console.log("Ha ocurrido un error", err); });
        return product;
    };
    SqliteDao.prototype.insertProduct = function (product) {
        var _this = this;
        var date = new Date();
        var templateDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ";
        var newProduct = __assign(__assign({}, product), { id: this.count, templateDate: templateDate });
        this.count++;
        var productInsered = knex("products")
            .insert(product)
            .then(function () {
            console.log("Producto insertado");
            _this.products.push(newProduct);
        })
            .catch(function (err) {
            console.log("Ha ocurrido un error", err);
        });
        return productInsered;
    };
    SqliteDao.prototype.updateProduct = function (product, id) {
        var _this = this;
        var date = new Date();
        var templateDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ";
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, knex
                            .from("products")
                            .select("*")
                            .where("id", "=", id)
                            .then(function () {
                            knex.update({
                                timestamp: templateDate,
                                title: product.title,
                                description: product.description,
                                code: product.code,
                                price: product.price,
                                stock: product.stock,
                                thumbnail: product.thumbnail,
                            });
                            var index = _this.products.findIndex(function (element) { return element.id === id; });
                            _this.products[index] = product;
                            console.log("Producto actualizado");
                        })
                            .catch(function (err) {
                            console.log("Ha ocurrido un error", err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    SqliteDao.prototype.deleteProduct = function (id) {
        knex
            .from("products")
            .where("id", "=", id)
            .del()
            .then(function () {
            console.log("Producto borrado");
        })
            .catch(function (err) {
            console.log("Ha ocurrido un error", err);
        });
        var index = this.products.findIndex(function (element) { return element.id === id; });
        this.products.splice(index, 1);
    };
    return SqliteDao;
}());
exports.SqliteDao = SqliteDao;
