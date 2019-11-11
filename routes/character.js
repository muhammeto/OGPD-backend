const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { Character, Item } = require('../models/index');


//#region View
// View our characters with Account ID
router.get('/view', function (req, res) {
    var accountID = jwt.verify(req.body.token, 'OGPD').accountID;
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
                where: { name: param }, include: [
                    {
                        model: Item,
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
router.post('/create', function (req, res) {
    var { nickname, nation, clss, token } = req.body;
    var accountID = jwt.verify(token, 'OGPD').accountID;
    if (accountID) {
        if (nickname && nation && clss) {
            Character.create({ Name: nickname, Class: clss, NationID: nation, AccountID: accountID }).then(character => {
                character.success = 1;
                res.json(character);
            }).catch(err => {
                var response = {
                    success: 0,
                    reason: "Your account don't have any character. Please create character."
                }
                res.json(response);
            });
        }
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
    var accountID = jwt.verify(req.body.token, 'OGPD').accountID;
    if (accountID) {
        Character.findAll({
            order: [
                ['Level', 'DESC']
            ],
            limit: 10
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


module.exports = router;