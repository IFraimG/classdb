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

router.get("/table", (req, res) => {
  connection.query(`CREATE TABLE IF NOT EXISTS class (
    id INT NOT NULL AUTO_INCREMENT,
    class VARCHAR(10) NOT NULL,
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
