# mysql-crud-ts

Strongly typed CRUD module for MySQL databases.
CRUD is ancronym for:
- Create
- Read
- Update
- Delete

This module allows for easy manipulation of MySQL tables.
By providing methods to create, read, update and delete rows.

**Still in development, but usable.**


## Installation
```
npm i mysql-crud-ts
```


## Usage
This module is not usable without the [MySQL module](https://www.npmjs.com/package/mysql).
Make sure you know how to implement it first!

This example uses 2 files, 'database.ts' & 'index.ts'.

### database.ts
```javascript
import mysql from "mysql";
import Crud from "mysql-crud-ts";

// Create connction to database
const connection = mysql.createConnection({
    // ... -> Look at MySQL NPM package for more information.
    //        Make sure the 'database' is set!
});
connection.connect();

// Define table schema
// This should match your database
interface UserSchema {
    id: number,
    name: string,
    email: string
}

// The constructor of the 'Crud' class takes 2 arguments.
// 1. MySQL connection
// 2. Name of MySQL table
const Users = new Crud<UserSchema>(connection, 'users');

export { Users };
```

### index.ts
```javascript
import { Users } from "./database";

// Create a user!
Users.create({ id: 1, name: 'Jan', email: 'something@example.com' })
    .then(okPacket => {
        console.log('Created user!');
    });

// Read users!
Users.read()
    .then(users => {
        console.log('Users:', users);
    });
```