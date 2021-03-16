const envData = require("../env.json");
const config = envData[process.env.NODE_ENV];
/**
 *
 * @param dataString
 * @param uri
 * @param method
 * @param isDataString
 * @returns {{headers: {"content-type": string}, method: *, auth: {pass: *, user: *}, body: *, url}}
 */
const globalConfiguration = ({
  dataString,
  uri,
  method,
  isDataString = true,
}) => {
  const globalOptions = {
    url: config.baseUrl + uri,
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: dataString,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    auth: {
      user: config.auth.user,
      pass: config.auth.pass,
    },
  };
  if (!isDataString) {
    delete globalOptions.body;
  }
  return globalOptions;
};

module.exports.globalConfiguration = globalConfiguration
