const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Account, Character, Item } = require('../models/index');
const { Validator } = require('node-input-validator');


//#region View
// View our characters with Account ID
router.get('/view', function (req, res) {
    if (!req.headers.token) {
        res.json({ reason: 'No token provided' });
    }
    var accountID = jwt.verify(req.headers.token, 'OGPD').accountID;
    if (accountID) {
        Character.findAll({
            where: { accountId: accountID },
            include: [
                {
                    model: Item,
                }
            ]
        }).then(characters => {
            res.json(characters);
        })
            .catch(err => {
                var response = {
                    success: 0,
                    reason: "Your account doesn't have any character. Please create character."
                }
                res.json(response);
            });
    }
}
)
// View other account's character with Account ID
router.get('/view/:param', function (req, res) {
    var param = req.params.param;
    if (isNaN(parseInt(param))) {
        if (param) {
            Character.findOne({
                where: { Name: param },
                attributes: ['id', 'Name', 'Class', 'Level', 'AccountID', 'ClanID', 'NationID', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: Item
                    }
                ]
            }).then(character => {
                res.json(character);
            }).catch(err => {
                var response = {
                    success: 0,
                    reason: "There is no character with that name in database!"
                }
                res.json(response);
            });
        }
    } else {
        param = parseInt(param);
        if (param) {
            Character.findOne({
                where: { id: param }, include: [
                    {
                        model: Item,
                    }
                ]
            }).then(character => {
                res.json(character);
            }).catch(err => {
                var response = {
                    success: 0,
                    reason: "There is no character with that ID in database!"
                }
                res.json(response);
            });
        }
    }
}
)
//#endregion
//#region Create
router.post('/create', async function (req, res) {
    var { token } = req.body;
    var accountID = jwt.verify(token, 'OGPD').accountID;
    var { nickname, nation, clss } = req.body;
    const characterValidator = new Validator(req.body, {
        nickname: 'required|alphaNumeric|minLength:4',
        nation: 'required',
        clss: 'required'
    });
    const matched = await characterValidator.check();
    if (accountID && matched) {
        Character.create({ Name: nickname, Class: clss, NationID: nation, AccountID: accountID }).then(character => {
            res.json(character);
        }).catch(err => {
            var response = {
                success: 0,
                reason: "Can't create this character."
            }
            res.json(response);
        });
    } else {
        res.json(characterValidator.errors);
    }
}
)
//#endregion
//#region Delete
router.post('/delete', function (req, res) {
    var { characterId, token } = req.body;
    var accountID = jwt.verify(token, 'OGPD').accountID;
    if (accountID) {
        Character.destroy({ where: { id: characterId, accountId: accountID } }).then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
        });
    }
}
)

//#endregion 
//#region Update
router.post('/update', function (req, res) {
    var { characterId, nickname, clss, nation, level, clan, token } = req.body;
    var accountID = jwt.verify(token, 'OGPD').accountID;

    let a = {};
    if (nickname != null) {
        a = { ...a, Name: nickname }
    }

    if (accountID) {
        Character.update(
            { Name: nickname, Class: clss, NationID: nation, Level: level, ClanID: clan },
            { where: { id: characterId } }).then(result => {
                res.json(result);
            }).catch(err => {
                console.log(err);
            });
    }
}
)
//#endregion
//#region Get Ranking by Level
router.post('/rank', function (req, res) {
    if (!req.headers.token) {
        res.json({ reason: 'No token provided' });
    }
    var accountID = jwt.verify(req.headers.token, 'OGPD').accountID;
    if (accountID) {
        Character.findAll({
            order: [
                ['Level', 'DESC']
            ],
        }).then(characters => {
            characters.success = 1;
            res.json(characters);
        }).catch(err => {
            var response = {
                success: 0,
                reason: "DB ERROR!"
            }
            res.json(response);
        });
    }
})
//#endregion
//#region Item Add/Delete
router.post('/view/:param/itemAdd', function (req, res) {
    var { token, itembaseId } = req.body;
    var accountID = jwt.verify(token, 'OGPD').accountID;
    var param = req.params.param;
    Account.findByPk(accountID).then(account => {
        var accountRole = account.dataValues.Role;
        if (accountRole == 0) {
            // Means that we are game admin and we can add/delete items to the character.
            Item.create({ CharacterID: param, ItemBaseID: itembaseId }).then(item => {
                item.dataValues.success = 1;
                res.json(item);
            }).catch(err => {
                var response = {
                    success: 0,
                    reason: "Can't create this item."
                }
                res.json(response);
            });
        }
    })
})

router.post('/view/:param/itemDelete', function (req, res) {
    var { token, itembaseId } = req.body;
    var accountID = jwt.verify(token, 'OGPD').accountID;
    var param = req.params.param;
    Account.findByPk(accountID).then(account => {
        var accountRole = account.dataValues.Role;
        if (accountRole == 0) {
            // Means that we are game admin and we can add/delete items to the character.
            Item.destroy({ where: { CharacterID: param, ItemBaseID: itembaseId } }).then(result => {
                res.json(result);
            }).catch(err => {
                var response = {
                    success: 0,
                    reason: "Can't delete this item."
                }
                res.json(response);
            });
        }
    })
})
//#endregion

module.exports = router;