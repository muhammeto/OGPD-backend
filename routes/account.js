const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { Account } = require('../models/index');

//#region View our account
router.post('/view', function (req, res) {
    var accountID = jwt.verify(req.body.token, 'OGPD').accountID;
    if (accountID) {
        Account.findOne({ where: { id: accountID } }).then(account => {
            res.json(account);
        }).catch(err => {
            console.log(err);
        });
    }
}
)
//#endregion
//#region Delete our account
router.post('/delete', function (req, res) {
    var accountID = jwt.verify(req.body.token, 'OGPD').accountID;
    if (accountID) {

        Account.destroy({ where: { id: accountID } }).then(account => {
            res.json(account);
        }).catch(err => {
            console.log(err);
        });
    }
}
)
//#endregion
module.exports = router;