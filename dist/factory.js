"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoFactory = void 0;
var FileSystemDao_1 = require("./daos/FileSystemDao");
var MySqlDao_1 = require("./daos/MySqlDao");
var SqliteDao_1 = require("./daos/SqliteDao");
var MongoDbDao_1 = require("./daos/MongoDbDao");
var MongoDbaaSDao_1 = require("./daos/MongoDbaaSDao");
var FirebaseDao_1 = require("./daos/FirebaseDao");
var DaoFactory = /** @class */ (function () {
    function DaoFactory() {
    }
    DaoFactory.prototype.getDao = function (option) {
        switch (option) {
            case 1:
                return new FileSystemDao_1.FileSystemDao();
                break;
            case 2:
                return new MySqlDao_1.MySqlDao();
                break;
            case 3:
                return new SqliteDao_1.SqliteDao();
                break;
            case 4:
                return new MongoDbDao_1.MongoDbDao();
                break;
            case 5:
                return new MongoDbaaSDao_1.MongoDbaaSDao();
                break;
            case 6:
                return new FirebaseDao_1.FirebaseDao();
                break;
            default:
                return new FileSystemDao_1.FileSystemDao();
                break;
        }
    };
    return DaoFactory;
}());
exports.DaoFactory = DaoFactory;
;
