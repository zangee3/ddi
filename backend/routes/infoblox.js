const express = require("express");
const router = express.Router();
const request = require('request');



router.post("/", function (req, res, next) {
    const options = {
        url: 'https://10.92.18.84/wapi/v2.9/record:host?_return_fields=name,ipv4addrs&_return_as_object=1',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(req.body),
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        auth: {
            'user': 'ashams',
            'pass': 'M0arAutomation!'
        }
    };
    return request(options, function (error, response, body) {
        if (!error && response.statusCode >= 200) {
            // res.status(200).json(body);
            
            console.log(body);
            return res.send(body);
        } else {
            console.log("error-----",response.statusCode,body);
        }
    });
});

module.exports = router;
