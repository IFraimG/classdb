var express = require('express');
const connection = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.connect(err => {
    if (err) return console.error("Ошибка: " + err.message);
    console.log("Подключение к серверу MySQL успешно установлено");
  });
});


router.post("/create", (req, res) => {
  console.log(req.body);
  connection.query(`INSERT INTO class (classname, teacher, firstname, lastname, mark1, mark2, mark3, mark4) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [
    req.body.classname, req.body.teacher, req.body.firstname, req.body.lastname, parseInt(req.body.mark1), 
    parseInt(req.body.mark2), parseInt(req.body.mark3), parseInt(req.body.mark4)
  ], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500)
      return res.json({ error: error });
    } else res.sendStatus(200)
  });
})

router.get("/all", (req, res) => {
  connection.query("SELECT * FROM class;",  (error, results) => {
    if (error) {
      console.log(error);
      return res.json({ error: error }).status(500)
    } else res.send(results).status(200)
  })
})

router.get("/table", (req, res) => {
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
    if(err) console.log(err);
    else console.log("Таблица создана");
  });

  res.sendStatus(200)
})


router.get("/close", (req, res) => {
  connection.end(err => {
    if (err) {
      return console.log("Ошибка: " + err.message);
    }
    console.log("Подключение закрыто");
  });

  res.sendStatus(200)
})

module.exports = router;
