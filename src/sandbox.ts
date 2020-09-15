import mysql from "mysql";
import Crud from "./index";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'api',
    password: 'pswd',
    database: 'kruidnoten'
});

connection.connect((err, ...args) => {
    if (err) throw err;
    // console.log(...args);
});

const users = new Crud<UsersSchema>(connection, 'users');

// users.create({
//     name: 'Test',
//     email: 'test@example.nl',
//     password: 'pswd'
// }).then(res => log('Inserted!'))
// .catch(err => console.log(err));

// users.read(null, { skip: 2, limit: 9 })
//     .then(res => log(res))
//     .catch(err => log(err));

// users.readOne({ name: 'Merijn'})
//     .then(res => log(res))
//     .catch(err => log(err));

// users.update({ email: 'test@example.nl'}, { email: 't@example.nl' })
//     .then(res => log(res))
//     .catch(err => log(err));

// users.delete({ name: 'Jan' })
//     .then(res => log(res))
//     .catch(err => log(err));

interface UsersSchema {
    id?: number
    name?: string,
    email?: string,
    password?: string,
}

function log(...content: any): void {
    console.log('[sandbox.ts]', ...content);
}