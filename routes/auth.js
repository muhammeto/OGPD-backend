const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Account } = require('../models/index');
const bcrypt = require('bcrypt');
const { Validator } = require('node-input-validator');

// Home page route.
router.post('/login', async function (req, res) {
    var { username, password } = req.body;
    const loginValidation = new Validator(req.body, {
        username: 'required|alphaNumeric|minLength:4',
        password: 'required|alphaNumeric|minLength:4'
    });
    const matched = await loginValidation.check();
    if (matched) {
        Account.findOne({ where: { Name: username } }).then(account => {
            const a = account.get({ plain: true });
            if (bcrypt.compareSync(password, a.Password)) {
                let token = jwt.sign({ accountID: account.id, role: account.role }, 'OGPD');
                res.json(token);
            } else {
                let response = {
                    reason: 'Password is incorrect!'
                }
                res.json(response);
            }
        }).catch(err => {
            let response = {
                reason: 'Username is incorrect or not exist in database!'
            }
            res.json(response);
        });
    } else {
        res.json(loginValidation.errors);
    }
})

router.post('/register', async function (req, res) {
    var { username, password, email } = req.body;
    const registerValidation = new Validator(req.body, {
        username: 'required|alphaNumeric|minLength:4',
        password: 'required|alphaNumeric|minLength:4',
        email: 'required|email'
    });
    const matched = await registerValidation.check();
    if (matched) {
        let hash = bcrypt.hashSync(password, 10);
        Account.create({ Name: username, Password: hash, Email: email }).then(user => {
            let token = jwt.sign({ accountID: user.id }, 'OGPD');
            res.json({ token });
        }).catch(err => {
            let response = {
                reason: 'This username already exists in database!'
            }
            res.json(response);
        });
    } else {
        res.json(registerValidation.errors);
    }
})

module.exports = router;