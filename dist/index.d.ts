import { Connection } from "mysql";
export default class Crud<T> {
    private db;
    private tableName;
    constructor(dbConnection: Connection, tableName: string);
    create(data: T): Promise<OkPacket>;
    read(filter?: any, options?: Options): Promise<T[]>;
    readOne(filter?: any): Promise<T>;
    update(filter: any, data: any): Promise<unknown>;
    delete(filter: any): Promise<OkPacket>;
    private isFilterValid;
    private processFilter;
    private processOptions;
    private handleError;
}
export interface Options {
    limit?: number;
    skip?: number;
}
export interface OkPacket {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: true;
    changedRows: number;
}
