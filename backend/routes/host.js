const express = require("express");
const router = express.Router();
const request = require("request");
const fs = require("fs");
const connection = require("./db");
const envData = require("../env.json");
const config = envData[process.env.NODE_ENV];

// console.log("ENVIRONMENT: ", process.env.NODE_ENV);
// console.log("Config", config);
router.post("/addHostRecord", function (req, res, next) {
  const options = {
    url: config.baseUrl + "/record:host?_return_fields=name,ipv4addrs&_return_as_object=1",
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req.body),
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    auth: {
      'user': config.auth.user,
      'pass': config.auth.pass
    },
  };
  return request(options, function (error, response, body) {
    if (!error && response.statusCode >= 200) {
      body = JSON.parse(body);
      console.log(body.Error);
      if (body.Error === undefined) {
        console.log("BODY-----", body.result._ref)
        const newBody = JSON.parse(options.body);
        return connection.query(
          "INSERT INTO dns (name, ipv4addrs, ref) VALUES ('" +
            newBody.name +
            "', '" +
            JSON.stringify(newBody.ipv4addrs) + 
            "', '" +
            body.result._ref +
            "')",
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).json(err);
            }
            return res.status(200).json(body);
          }
        );
      } else {
        return res.status(200).json(body);
      }
    } else {
      console.log("error-----", response.statusCode, body);
    }
  });
});

router.get("/getHostRecords", function (req, res, next) {
  return connection.query("SELECT * from dns", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(200).json(result);
  });
});

router.post("/updateHostIP", function (req, res, next) {
  const hostName = req.body.hostName;
  const dataString = req.body.ipv4addrs;

  var options = {
    url: config.baseUrl + "/record:host/"+hostName+"/default?_return_fields%2B=ipv4addrs&_return_as_object=1",
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dataString),
    rejectUnauthorized: false,
    auth: {
      'user': config.auth.user,
      'pass': config.auth.pass
    }
  };

  return request(options, function (error, response, body) {
      console.log( body);

    if (!error && response.statusCode >= 200) {
        body = JSON.parse(body);
        console.log(body.Error);
        if (body.Error === undefined || true) {  
        const sql =
            "UPDATE dns SET ipv4addrs = '" +
            JSON.stringify(dataString.ipv4addrs) +
            "' WHERE name = '" +
            hostName +
            "'";

        return connection.query(sql, (err, result) => {
            if (err) {
            console.log(err);
            return res.status(400).json(err);
            }
            return res.status(200).json(req.body);
        });
        }else {
            return res.status(200).json(body);
        }
    } else {
      console.log("error-----", response.statusCode, body);
    }
  });
});

router.post("/deleteHostRecord", function (req, res, next) {
  const recordName = req.body.name;
  const recordId = req.body.id;

    var dataString = '[{"method": "STATE:ASSIGN","data":{"host_name": "' + 
    recordName + '"}},{"method":"GET","object": "record:host","data":{"name":"##STATE:host_name:##"},"assign_state": {"host_ref": "_ref"},"enable_substitution": true,"discard": true},{"method": "DELETE", "object": "##STATE:host_ref:##","enable_substitution": true,"discard": true},{"method":"STATE:DISPLAY"}]';
    const options = {
    url: config.baseUrl + "/request",
    method: "POST",
    headers: { "content-type": "application/json" },
    body: dataString,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    auth: {
      'user': config.auth.user,
      'pass': config.auth.pass
    },
  };

  return request(options, function (error, response, body) {    
    if (!error && response.statusCode >= 200) {
    body = JSON.parse(body);
    console.log(body.Error);
    if (body.Error === undefined) {    
      return connection.query(
        "DELETE FROM dns WHERE id = '" + recordId + "'",
        function (err, result) {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            result: 'sucess',
            message: "Number of records deleted: " + result.affectedRows,
          });
        }
      );
    } else {
        return res.status(200).json(body);
    }
    } else {
      console.log("error-----", response.statusCode, body);
    }
  });
});

module.exports = router;
