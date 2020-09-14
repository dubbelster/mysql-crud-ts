import { rejects } from "assert";
import { Connection, MysqlError } from "mysql";

export default class Crud<T> {
    private db: Connection;
    private tableName: string;

    constructor(dbConnection: Connection, tableName: string) {
        this.db = dbConnection;
        this.tableName = tableName;
    }

    async create(data: T): Promise<OkPacket> {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.tableName} (${Object.keys(data).join(', ')}) VALUES ('${Object.values(data).join("', '")}')`;

            this.db.query(query, (error, res, fields) => {
                if (error) {
                    reject(this.handleError(error))
                } else {
                    resolve(res);
                };
            })
        });
    }

    async read(filter?: any, options?: Options): Promise<T[]> {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${this.tableName}`;

            if (filter) {
                if (this.isFilterValid(filter)) {
                    query += this.processFilter(filter);
                } else {
                    reject('Filter not valid.')
                    return;
                }
            }

            query += this.processOptions(options || {});

            this.db.query(query, (error, res, fields) => {
                if (error) {
                    reject(this.handleError(error))
                } else {
                    resolve(res);
                };
            });
        });
    }

    async readOne(filter?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${this.tableName}`;

            if (filter) {
                if (this.isFilterValid(filter)) {
                    query += this.processFilter(filter);
                } else {
                    reject('Filter not valid.')
                    return;
                }
            }

            query += ' LIMIT 1';

            this.db.query(query, (error, res, fields) => {
                if (error) {
                    reject(this.handleError(error))
                } else {
                    resolve(res[0]);
                };
            });
        });
    }

    async update(filter: any, data: any): Promise<OkPacket> {
        return new Promise((resolve, reject) => {
            let query = `UPDATE ${this.tableName} SET `;

            // SET
            const dataKeys = Object.keys(data);

            // To prevent MySQL syntax error
            if (dataKeys.length == 0) {
                reject('No keys found in the data object. (2nd argument)');
                return;
            }

            for (let i = 0; i < dataKeys.length; i++) {
                query += `${dataKeys[i]}='${data[dataKeys[i]]}'`;
                if (i < dataKeys.length - 1) query += ', ';
            }

            // WHERE
            if (this.isFilterValid(filter)) {
                query += this.processFilter(filter);
            } else {
                reject('Filter not valid.')
                return;
            }

            this.db.query(query, (error, res, fields) => {
                if (error) {
                    reject(this.handleError(error))
                } else {
                    resolve(res);
                };
            });
        });
    }

    async delete(filter: any): Promise<OkPacket> {
        return new Promise((resolve, reject) => {
            let query = `DELETE FROM ${this.tableName}`;

            if (this.isFilterValid(filter)) {
                query += this.processFilter(filter);
            } else {
                reject('Filter not valid.')
                return;
            }

            this.db.query(query, (error, res, fields) => {
                if (error) {
                    reject(this.handleError(error))
                } else {
                    resolve(res);
                };
            });
        });
    }

    private isFilterValid(filter: any): boolean {
        const keys = Object.keys(filter);

        // Check if filter has content.
        if (keys.length > 0) {
            return true;
        }

        return false;
    }

    private processFilter(filter: any): string {
        let query = ' WHERE '
        const keys = Object.keys(filter);

        for (let i = 0; i < keys.length; i++) {
            query += `${keys[i]}='${filter[keys[i]]}'`;
            if (i < keys.length - 1) query += ' AND ';
        }

        return query;
    }

    private processOptions(options: Options): string {
        options.limit = options.limit || 10,
            options.skip = options.skip || 0

        return ` LIMIT ${options.skip},${options.limit}`;
    }

    private handleError(error: MysqlError): string {
        if (error.fatal) throw error; // Stop programma als de error fataal is.
        return error.message; // Zo niet? Return error message.
    }
}

export interface Options {
    limit?: number,
    skip?: number
}

export interface OkPacket {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: true,
    changedRows: number,
}

function log(...content: any): void {
    console.log('[index.ts]', ...content);
}