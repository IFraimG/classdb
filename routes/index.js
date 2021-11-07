var express = require('express');
const setConnection = require('../db');
var router = express.Router();

/* GET home page. */
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
    req.body.classname, req.body.teacher, req.body.firstname, req.body.lastname, parseInt(req.body.mark1), 
    parseInt(req.body.mark2), parseInt(req.body.mark3), parseInt(req.body.mark4)
  ], (error, results) => {
    if (error) {
      console.log(error);

      res.sendStatus(500)
      connection.destroy();
      return res.json({ error: error });
    } 
    res.sendStatus(200)
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

  connection.query(`CREATE TABLE IF NOT EXISTS class (
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
  );`, function(err, results) {
    if (err) {
      console.log(err);
      connection.destroy();
    } else console.log("Таблица создана");
  });

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
