const express = require('express');
const setConnection = require('../db');
const router = express.Router();

router.get('/', function(req, res, next) {
  const connection = setConnection()

  connection.connect(err => {
    if (err) {
      connection.destroy();
      return console.error("Ошибка: " + err.message);
    }
    console.log("Подключение к серверу MySQL успешно установлено");
  });
});

router.post("/create", (req, res) => {
  const connection = setConnection()

  connection.query(`INSERT INTO class (classname, teacher, firstname, lastname, mark1, mark2, mark3, mark4) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [
    req.body.classname, req.body.teacher, req.body.firstname, req.body.lastname, req.body.mark1, 
    req.body.mark2, req.body.mark3, req.body.mark4
  ], (error, results) => {
    if (error) {
      console.log(error);

      res.sendStatus(500)
      connection.destroy();
      return res.json({ error: error });
    } 
    res.redirect("/all")
  });
})

router.get("/all", (req, res) => {
  const connection = setConnection()

  connection.query("SELECT * FROM class;",  (error, results) => {
    if (error) {
      connection.destroy();
      console.log(error);
      return res.json({ error: error }).status(500)
    } else res.send(results).status(200)
  })
})

router.get("/table", (req, res) => {
  const connection = setConnection()

  connection.query(`CREATE TABLE IF NOT EXISTS class2 (
    id INT NOT NULL AUTO_INCREMENT,
    classname VARCHAR(10) NOT NULL UNIQUE,
    teacher VARCHAR (65) NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    fullname CHAR(65) GENERATED ALWAYS AS (CONCAT(firstname, ' ', lastname)) VIRTUAL,
    mark1 SMALLINT NULL,
    mark2 SMALLINT NULL,
    mark3 SMALLINT NULL,
    mark4 SMALLINT NULL,
    PRIMARY KEY (id)
  );`, (err, results) => {
    console.log(results);
    if (err) {
      console.log(err);
      connection.destroy();
    } 
    if (!results.warningStatus) res.send("Таблица создана")
    if (results.warningStatus == 1) res.send("Таблица раннее создавалась")
  });
})

router.delete("/remove", (req, res) => {
  const connection = setConnection()

  connection.query(`DELETE from class where (firstname = ${req.query.firstname}) and lastname = ${req.query.lastname} and classname = ${req.query.classname}`, (err, results) => {
    console.log(results);
    if (err) {
      console.log(err);
      connection.destroy();
    }
  })
  res.sendStatus(200)
})

router.get("/close", (req, res) => {
  const connection = setConnection()

  connection.end(err => {
    if (err) {
      connection.destroy();
      return console.log("Ошибка: " + err.message);
    }
    console.log("Подключение закрыто");
  });

  res.sendStatus(200)
})

module.exports = router;
