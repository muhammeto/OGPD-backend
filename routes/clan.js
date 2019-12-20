const express = require('express');
const router = express.Router();
const { Clan } = require('../models/index');

//#region View our account
router.get('/view', function (req, res) {
    Clan.findAll().then(clans => {
        res.json(clans);
    }).catch(err => {
        console.log(err);
    });
});

//#endregion
module.exports = router;