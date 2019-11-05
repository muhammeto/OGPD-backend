const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { Account } = require('../models/index');

// Home page route.
router.post('/login', function (req, res) {
    let { username, password } = req.body;
    if (password && username) {
        Account.findOne({ where: { Name: username, Password: password } }).then(user => {
            let token = jwt.sign({ accountID: user.id }, 'OGPD');
            res.send(token);
        }).catch(err => {
            let response = {
                reason: 'Username or password is incorrect or this user not exist in database!'
            }
            res.json(response);
        });
    }
})

router.post('/register', function (req, res) {
    var { username, password, email } = req.body;
    if (password && username && email) {
        Account.create({ Name: username, Password: password, Email: email }).then(user => {
            let token = jwt.sign({ accountID: user.id }, 'OGPD');
            res.send(token);
        }).catch(err => {
            let response = {
                reason: 'This username already exists in database!'
            }
            res.json(response);
        });
    }
})

module.exports = router;