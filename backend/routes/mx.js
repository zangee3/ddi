const express = require("express");
const router = express.Router();
const request = require("request");
const fs = require("fs");
const connection = require("./db");

router.post("/addMXRecord", function (req, res, next) {
  const bodyData = req.body;
  bodyData.forEach((b) => {
    const name = b.name;
    const mailExchanger = b.mail_exchanger;

    // return connection.query(
    //   "INSERT INTO mx (name, mail_exchanger) VALUES ('" +
    //     name +
    //     "', '" +
    //     mailExchanger +
    //     "')",
    //   (err, result) => {
    //     if (err) {
    //       console.log(err);
    //       return res.status(400).json(err);
    //     }
    //   }
    // );

    var dataString = '{"mail_exchanger": ' + JSON.stringify(mailExchanger) + ', "name": ' + JSON.stringify(name) + ', "preference":1}';
    console.log("DATA:----", dataString);
    var options = {
        url: 'https://10.92.18.84/wapi/v2.9/record:mx?_return_fields%2B=mail_exchanger,name&_return_as_object=1',
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
      console.log("ERROR-----", error);
        if (!error && response.statusCode >= 200) {
            if (body.Error === undefined) {
                const newBody = JSON.parse(options.body);
                return connection.query(
                    "INSERT INTO mx (name, mail_exchanger) VALUES ('" +
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
  });
  return res.status(200).json(req.body);
});

router.get("/getMXRecords", function (req, res, next) {
  return connection.query("SELECT * from mx", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(200).json(result);
  });
});

router.post("/deleteMXRecord", function (req, res, next) {
  const id = req.body.id;
  var options = {
    url: 'https://10.92.18.84/wapi/v2.9/record:mx/ZG5zLmJpbmRfbXgkLl9kZWZhdWx0LmNvbS5pbmZvLm1haWwuZXhjaGFuZ2UuaW5mby5jb20uMQ:mail.info.com/default?_return_as_object=1',
    method: 'DELETE',
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
  return connection.query(
    "DELETE FROM mx WHERE id = '" + id + "'",
    function (err, result) {
      if (err) throw err;
      return res.status(200).json({
        success: true,
        result: "sucess",
        message: "Number of records deleted: " + result.affectedRows,
      });
    }
  );

});

router.post("/updateMXRecord", function (req, res, next) {
  const name = req.body.data.name;
  const mail_exchanger = req.body.data.mail_exchanger;
  const id = req.body.id;

  const sql =
    "UPDATE mx SET name = '" +
    name +
    "', mail_exchanger = '" +
    mail_exchanger +
    "'  WHERE id = '" +
    id +
    "'";

  return connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(200).json(req.body);
  });
});

module.exports = router;
