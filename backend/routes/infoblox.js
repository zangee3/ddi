const express = require("express");
const router = express.Router();
const request = require('request');
const fs = require('fs');
const connection = require("./db")

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
            fs.appendFileSync('records.json', options.body, "utf8");
            const name = options.body.name
            const ipv4addrs = options.body.ipv4addrs

            return connection.query("INSERT INTO dns (name, ipv4addrs) VALUES ('"+ name +"', '" + JSON.stringify(ipv4addrs) +"')", (err, result) => {
                if(err) {
                    console.log(err)
                    return res.status(400).json(err)
                }
                console.log(result)
                return res.status(200).json(options.body);
            });
        } else {
            console.log("error-----",response.statusCode,body);
        }
    });
});

router.get("/dns", function (req, res, next) {
    return connection.query("SELECT * from dns", (err, result) => {
        if(err) {
            console.log(err)
            return res.status(400).json(err)
        }
        console.log(result)
        return res.status(200).json(result);
    });
})

module.exports = router;
