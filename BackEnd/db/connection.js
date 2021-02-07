// npm install mysql

const mysql = require("mysql");
const secrets = require("./secrets.json");

// const connection = mysql.createConnection({
//   host: secrets.host,
//   user: secrets.user,
//   password: secrets.password,
//   database: secrets.database,
// });

// connection.connect();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: secrets.host,
  user: secrets.user,
  password: secrets.password,
  database: secrets.database,
});

/* due to unactive ness the sql connection is idle thus connection breaks hence do use

  instead of 

  const connection = mysql.createConnection({
  host: secrets.host,
  user: secrets.user,
  password: secrets.password,
  database: secrets.database,
});

connection.connect();

use now

  const connection = mysql.createPool({
    connectionLimit:10,
    host: secrets.host,
    user: secrets.user,
    password: secrets.password,
    database: secrets.database
  })

  it requires no connection.connect() thus comment it
*/

console.log("Database Connected!!!");

// import connection in app.js
module.exports = connection;
