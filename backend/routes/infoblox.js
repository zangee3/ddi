var express = require("express");
var router = express.Router();
const axios = require("axios");
const https = require('https')

router.post("/", function (req, res, next) {
  console.log(JSON.stringify(req.body));
  axios
    .post(
      "https://10.92.18.84/wapi/v2.9/record:host?_return_fields=name,ipv4addrs&_return_as_object=1",
      JSON.stringify(req.body),
      {
        headers: {
          "content-type": "application/json",
        },
          httpsAgent: new https.Agent({
              rejectUnauthorized: false
          }),
        params: {
          rejectUnauthorized: false,
          requestCert: true,
          agent: false,
        },
        auth: {
          user: "ashams",
          pass: "M0arAutomation!",
        },
      }
    )
    .then((response) => {
      console.log("response: ", response);
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(400).json(err);
    });
});

module.exports = router;
