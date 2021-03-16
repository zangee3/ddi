const express = require("express");
const router = express.Router();
const connection = require("./db");
const globalConfiguration = require('../common/options').globalConfiguration
const envData = require("../env.json");
const infoboxUri = envData["infoboxUri"];
const request = require("request");

const {
  txtRecords: { addTxtRecordUri, deleteTxtRecordUri, updateTxtRecordUri },
} = infoboxUri;



router.post("/addTXTRecord", function (req, res, next) {
  const bodyData = req.body;
  bodyData.forEach((b) => {
    const name = b.name;
    const text = b.text;
    const dataString = '{"name": ' + name + ',"text": ' + text + "}";
    console.log(
      "abc: ",
      globalConfiguration({
        dataString: dataString,
        method: "POST",
        uri: addTxtRecordUri,
      })
    );
    return request(
      globalConfiguration({
        dataString: dataString,
        method: "POST",
        uri: addTxtRecordUri,
      }),
      function (error, response, body) {
        if (!error && response.statusCode >= 200) {
          const respBody = JSON.parse(body);
          if (body.Error === undefined) {
            return connection.query(
              "INSERT INTO txt (name, text) VALUES ('" +
                name +
                "', '" +
                text +
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

router.get("/getTXTRecords", function (req, res, next) {
  // return res.status(400).json({ a: "hello" });
  return connection.query("SELECT * from txt", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(200).json(result);
  });
});

router.post("/deleteTXTRecord", function (req, res, next) {
  const id = req.body.id;
  return request(
    globalConfiguration({
      dataString: "na",
      method: "DELETE",
      uri: deleteTxtRecordUri,
      isDataString: false,
    }),
    function (error, response, body) {
      if (!error && response.statusCode >= 200) {
        if (body.Error === undefined) {
          return connection.query(
            "DELETE FROM txt WHERE id = '" + id + "'",
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

router.post("/updateTXTRecord", function (req, res, next) {
  const name = req.body.data.name;
  const text = req.body.data.text;
  const id = req.body.id;

  const dataString = '{"text": ' + text + "}";
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
            "UPDATE txt SET name = '" +
            name +
            "', text = '" +
            text +
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
module.exports.globalConfiguration = globalConfiguration
