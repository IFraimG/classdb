const mysql = require("mysql2");
require('dotenv').config()


const connection = mysql.createConnection({
  host: process.env.QOVERY_DATABASE_test2_HOST || "localhost",
  user: process.env.QOVERY_DATABASE_test2_USERNAME || "root",
  database: "test2",
  password: process.env.QOVERY_DATABASE_test2_PASSWORD || process.env.DB_PASSWORD
});

connection.connect(err => {
  if (err) return console.error("Ошибка: " + err.message);
  console.log("Подключение к серверу MySQL успешно установлено");
});

  // connection.end(err => {
  //   if (err) return console.log("Ошибка: " + err.message);
  //   console.log("Подключение закрыто");
  // });


module.exports = connection