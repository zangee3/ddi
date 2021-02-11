var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("herererererere");
    res.send('API is working properly');
});

module.exports = router;