const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Account } = require('../models/index');

//#region View account
// Views current logged in account.
router.post('/view', function (req, res) {
    var accountID = jwt.verify(req.body.token, 'OGPD').accountID;
    if (accountID) {
        Account.findOne({ where: { id: accountID } }).then(account => {
            res.json(account);
        }).catch(err => {
            res.json(err);
        });
    }
}
)

// View other accounts for game admins
router.get('/view/:param', function (req, res) {
    var { token } = req.body;
    var accountID = jwt.verify(token, 'OGPD').accountID;
    var param = req.params.param;
    Account.findByPk(accountID).then(account => {
        var accountRole = account.dataValues.Role;
        if (accountRole == 0) {
            // Means that we are game admin and we can view other account's information.
            if (isNaN(parseInt(param))) {
                Account.findOne({ where: { name: param } }).then(account => {
                    res.json(account);
                }).catch(err => {
                    res.json(err);
                });
            } else {
                param = parseInt(param);
                Account.findOne({ where: { id: param } }).then(account => {
                    res.json(account);
                }).catch(err => {
                    res.json(err);
                });
            }
        }
    })
}
)
//#endregion
//#region Delete account
// Deletes current logged in account.
router.post('/delete', function (req, res) {
    var accountID = jwt.verify(req.body.token, 'OGPD').accountID;
    if (accountID) {
        Account.destroy({ where: { id: accountID } }).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }
}
)

// Deletes other accounts for game admin.
router.get('/delete/:param', function (req, res) {
    var { token } = req.body;
    var accountID = jwt.verify(token, 'OGPD').accountID;
    var param = req.params.param;
    Account.findByPk(accountID).then(account => {
        var accountRole = account.dataValues.Role;
        if (accountRole == 0) {
            // Means that we are game admin and we can delete other account.
            if (isNaN(parseInt(param))) {
                Account.destroy({ where: { name: param } }).then(result => {
                    res.json(result);
                }).catch(err => {
                    res.json(err);
                });
            } else {
                param = parseInt(param);
                Account.destroy({ where: { id: param } }).then(result => {
                    res.json(result);
                }).catch(err => {
                    res.json(err);
                });
            }
        }
    })
}
)

//#endregion
router.get('/role', function (req, res) {

    var role = jwt.verify(req.body.token, 'OGPD').role;
    if (typeof role !== 'undefined') {
        res.json({ role });
    } else {
        res.json({ reason: "Cannot access role" });
    }
}
)
module.exports = router;