const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Nation } = require('../models/index');

//#region View our account
router.get('/view', function (req, res) {
    Nation.findAll().then(nations => {
        res.json(nations);
    }).catch(err => {
        console.log(err);
    });
});
//#endregion

module.exports = router;