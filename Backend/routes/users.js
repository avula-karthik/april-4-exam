var express = require('express');
var router = express.Router();
var connector = require('../poolconnect');

/* GET users listing. */
router.get('/', function (req, res, next) {
    const sqlQuery = `CREATE TABLE login (email varchar(40), password varchar(40));`;
    connector.query(sqlQuery, (err, results, fields) => {
        if (err) {
            res.json(err);
        } else {
            const addUser = `INSERT INTO login VALUES("admin@mail.com", "password");`;
            connector.query(addUser, (err, results, fields) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(results);
                }
            });
        }
    });
});
router.post('/login', function (req, res) {
    let { email, password } = req.body;
    const sqlQuery = `SELECT * FROM login WHERE email="${email}" AND password="${password}"`;
    connector.query(sqlQuery, (err, results, fields) => {
        if (err) {
            res.json(err);
        } else {
            if (results.length === 1) {
                req.session['email'] = email;
                req.session['password'] = password;
                res.json('Loggedin');
            }
        }
    });
});

router.get('/logout', function (req, res) {
    delete req.session['username'];
    delete req.session['password'];
    res.json('Logged out');
});
module.exports = router;
