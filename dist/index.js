"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Crud = (function () {
    function Crud(dbConnection, tableName) {
        this.db = dbConnection;
        this.tableName = tableName;
    }
    Crud.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var query = "INSERT INTO " + _this.tableName + " (" + Object.keys(data).join(', ') + ") VALUES (" + ("?, ".repeat(Object.values(data).length - 1) + "?") + ")";
                        log(query);
                        _this.db.query(query, Object.values(data), function (error, res, fields) {
                            if (error) {
                                reject(_this.handleError(error));
                            }
                            else {
                                resolve(res);
                            }
                            ;
                        });
                    })];
            });
        });
    };
    Crud.prototype.read = function (filter, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var query = "SELECT * FROM " + _this.tableName;
                        if (filter) {
                            if (_this.isFilterValid(filter)) {
                                query += _this.processFilter(filter);
                            }
                            else {
                                reject('Filter not valid.');
                                return;
                            }
                        }
                        query += _this.processOptions(options || {});
                        _this.db.query(query, function (error, res, fields) {
                            if (error) {
                                reject(_this.handleError(error));
                            }
                            else {
                                resolve(res);
                            }
                            ;
                        });
                    })];
            });
        });
    };
    Crud.prototype.readOne = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var query = "SELECT * FROM " + _this.tableName;
                        if (filter) {
                            if (_this.isFilterValid(filter)) {
                                query += _this.processFilter(filter);
                            }
                            else {
                                reject('Filter not valid.');
                                return;
                            }
                        }
                        query += ' LIMIT 1';
                        _this.db.query(query, function (error, res, fields) {
                            if (error) {
                                reject(_this.handleError(error));
                            }
                            else {
                                resolve(res[0]);
                            }
                            ;
                        });
                    })];
            });
        });
    };
    Crud.prototype.update = function (filter, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var query = "UPDATE " + _this.tableName + " SET ";
                        var dataKeys = Object.keys(data);
                        if (dataKeys.length == 0) {
                            reject('No keys found in the data object. (2nd argument)');
                            return;
                        }
                        for (var i = 0; i < dataKeys.length; i++) {
                            query += dataKeys[i] + "=" + _this.db.escape(data[dataKeys[i]]);
                            if (i < dataKeys.length - 1)
                                query += ', ';
                        }
                        log(query);
                        if (_this.isFilterValid(filter)) {
                            query += _this.processFilter(filter);
                        }
                        else {
                            reject('Filter not valid.');
                            return;
                        }
                        _this.db.query(query, function (error, res, fields) {
                            if (error) {
                                reject(_this.handleError(error));
                            }
                            else {
                                resolve(res);
                            }
                            ;
                        });
                    })];
            });
        });
    };
    Crud.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var query = "DELETE FROM " + _this.tableName;
                        if (_this.isFilterValid(filter)) {
                            query += _this.processFilter(filter);
                        }
                        else {
                            reject('Filter not valid.');
                            return;
                        }
                        _this.db.query(query, function (error, res, fields) {
                            if (error) {
                                reject(_this.handleError(error));
                            }
                            else {
                                resolve(res);
                            }
                            ;
                        });
                    })];
            });
        });
    };
    Crud.prototype.isFilterValid = function (filter) {
        var keys = Object.keys(filter);
        if (keys.length > 0) {
            return true;
        }
        return false;
    };
    Crud.prototype.processFilter = function (filter) {
        var query = ' WHERE ';
        var keys = Object.keys(filter);
        for (var i = 0; i < keys.length; i++) {
            query += keys[i] + "=" + this.db.escape(filter[keys[i]]);
            if (i < keys.length - 1)
                query += ' AND ';
        }
        return query;
    };
    Crud.prototype.processOptions = function (options) {
        options.limit = options.limit || 10;
        options.skip = options.skip || 0;
        return " LIMIT " + this.db.escape(options.skip) + "," + this.db.escape(options.limit);
    };
    Crud.prototype.handleError = function (error) {
        if (error.fatal)
            throw error;
        return error.message;
    };
    return Crud;
}());
exports.default = Crud;
function log() {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    console.log.apply(console, __spreadArrays(['[index.ts]'], content));
}
