const express = require("express");
const router = express.Router();
const request = require("request");
const globalConfiguration = require('../common/options').globalConfiguration
const connection = require("./db");
const envData = require("../env.json");
const mxRecords = envData["infoboxUri"];

const {
  mxRecords: { addMxRecordUri, deleteMXRecordUri, updateTxtRecordUri },
} = mxRecords;

router.post("/addMXRecord", function (req, res, next) {
  const bodyData = req.body;
  bodyData.forEach((b) => {
    const name = b.name;
    const mailExchanger = b.mail_exchanger;

    var dataString =
      '{"mail_exchanger": ' +
      JSON.stringify(mailExchanger) +
      ', "name": ' +
      JSON.stringify(name) +
      ', "preference":1}';

    return request(
      globalConfiguration({
        dataString: dataString,
        uri: addMxRecordUri,
        method: "POST",
      }),
      function (error, response, body) {
        if (!error && response.statusCode >= 200) {
          const respBody = JSON.parse(body);
          if (body.Error === undefined) {
            const newBody = JSON.parse(options.body);
            return connection.query(
              "INSERT INTO mx (name, mail_exchanger, ref) VALUES ('" +
                newBody.name +
                "', '" +
                newBody.mail_exchanger +
                "', '" +
                respBody.result._ref +
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
      }
    );
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
  return request(
    globalConfiguration({
      dataString: "na",
      method: "DELETE",
      uri: deleteMXRecordUri,
      isDataString: false,
    }),
    function (error, response, body) {
      if (!error && response.statusCode >= 200) {
        if (body.Error === undefined) {
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
        } else {
          return res.status(200).json(body);
        }
      }
    }
  );
});

router.post("/updateMXRecord", function (req, res, next) {
  const name = req.body.data.name;
  const mail_exchanger = req.body.data.mail_exchanger;
  const id = req.body.id;
  const dataString = '{"name": ' + name + " }";
  return request(
    globalConfiguration({
      dataString: dataString,
      method: "PUT",
      uri: updateTxtRecordUri,
    }),
    function (error, response, body) {
      if (!error && response.statusCode >= 200) {
        if (body.Error === undefined) {
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
        } else {
          return res.status(200).json(body);
        }
      }
    }
  );
});

module.exports = router;
