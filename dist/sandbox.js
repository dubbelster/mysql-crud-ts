"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var index_1 = __importDefault(require("./index"));
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'api',
    password: 'pswd',
    database: 'kruidnoten'
});
connection.connect(function (err) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (err)
        throw err;
});
var users = new index_1.default(connection, 'users');
function log() {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    console.log.apply(console, __spreadArrays(['[sandbox.ts]'], content));
}
