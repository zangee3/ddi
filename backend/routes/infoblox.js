const express = require("express");
const router = express.Router();
const request = require('request');
const fs = require('fs');
const connection = require("./db")

router.post("/", function (req, res, next) {
// console.log('Ahmed', req.body);
//     fs.appendFileSync('log.txt', req.body );
//     fs.readFile("records.txt", 'utf8', function (err, data) {
//         if (err) throw err;
//         res.status(200).send(data)
//     })

//     fs.appendFileSync('records.json', JSON.stringify(req.body));
//     return res.send(req.body);

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
            
            fileData += 'Infoblox Response:' + body + '\n\n';
            fs.appendFileSync('log.txt', fileData, "utf8");
            fs.appendFileSync('records.json', options.body, "utf8");
            const name = JSON.parse(options.body).name
            const ipv4addrs = JSON.parse(options.body).ipv4addrs
console.log("testing---", options.body, name, ipv4addrs);
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

router.get("/getHostRecords", function (req, res, next) {
    return connection.query("SELECT * from dns", (err, result) => {
        if(err) {
            console.log(err)
            return res.status(400).json(err)
        }
        console.log(result)
        return res.status(200).json(result);
    });
})

router.post("/delete", function (req, res, next) {
    const recordName = req.body.name
    const recordId = req.body.id
    var dataString = '[{"method": "STATE:ASSIGN","data":{"host_name": ' + recordName + '}},{"method":"GET","object": "record:host","data":{"name":"##STATE:host_name:##"},"assign_state": {"host_ref": "_ref"},"enable_substitution": true,"discard": true},{"method": "DELETE", "object": "##STATE:host_ref:##","enable_substitution": true,"discard": true},{"method":"STATE:DISPLAY"}]';
    const options = {
        url: 'https://10.92.18.84/wapi/v2.9/request',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: dataString,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        auth: {
            'user': 'codetesting',
            'pass': 'D0ntGoB00m!'
        }
    };

    return request(options, function (error, response, body) {
        if (!error && response.statusCode >= 200) {
            res.status(200).json({
                success: true,
                message: "Record deleted successfully"
            })
        } else {
            console.log("error-----",response.statusCode,body);
        }
    });
})

module.exports = router;
