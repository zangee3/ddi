const express = require("express");
const router = express.Router();
const request = require("request");
const fs = require("fs");
const connection = require("./db");

router.post("/addMXRecord", function (req, res, next) {

    const bodyData = req.body
    bodyData.forEach(b => {
        const name = b.name
        const mailExchanger = b.mail_exchanger

        var dataString = '{"mail_exchanger": ' + mailExchanger + ',"name": ' + name + ',"preference":1}';

        var options = {
            url: 'https://gridmaster/wapi/v2.11/record:mx?_return_fields%2B=mail_exchanger,name&_return_as_object=1',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: dataString,
            auth: {
                'user': 'admin',
                'pass': 'infoblox'
            }
        };

        return request(options, function (error, response, body) {
            if (!error && response.statusCode >= 200) {
                if (body.Error === undefined) {
                    const newBody = JSON.parse(options.body);
                    return connection.query(
                        "INSERT INTO dns (name, mail_exchanger) VALUES ('" +
                        newBody.name +
                        "', '" +
                        JSON.stringify(newBody.mail_exchanger) +
                        "')",
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).json(err);
                            }
                        }
                    );
                } else {
                    return res.status(200).json(body);
                }
            }
        });
    })
    return res.status(200).json(req.body);
});

router.get("/getMXRecords", function (req, res, next) {

});

router.post("/deleteMXRecord", function (req, res, next) {
});

module.exports = router;
