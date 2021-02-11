const express = require("express");
const router = express.Router();
const request = require('request');
const fs = require('fs');

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
            'user': 'codetesting',
            'pass': 'D0ntGoB00m!'
        }
    };
    return request(options, function (error, response, body) {
        let fileData = '\n\nRequest Body: '+options.body+'\n';
        if (!error && response.statusCode >= 200) {
            console.log(body);
            fileData += 'Infoblox Response:' + body + '\n\n';
            fs.appendFileSync('log.txt', fileData, "utf8");
            fs.appendFileSync('records.txt', options.body+'\n\n', "utf8");
            // console.log("File written successfully\n"); 
            // console.log("The written has the following contents:"); 
            // console.log(fs.readFileSync("log.txt", "utf8")); 
            return res.send(body);
        } else {
            console.log("error-----",response.statusCode,body);
        }
    });
});

module.exports = router;
