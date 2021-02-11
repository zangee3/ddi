var request = require('request');

var headers = {
    'content-type': 'application/json'
};

var dataString = '[{"method": "STATE:ASSIGN","data":{"host_name":"ahmed.test1.disney.com"}},{"method":"GET","object": "record:host","data":{"name":"##STATE:host_name:##"},"assign_state": {"host_ref": "_ref"},"enable_substitution": true,"discard": true},{"method": "DELETE", "object": "##STATE:host_ref:##","enable_substitution": true,"discard": true},{"method":"STATE:DISPLAY"}]';

var options = {
    url: 'https://10.92.18.84/wapi/v2.9/request',
    method: 'POST',
    headers: headers,
    body: dataString,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    auth: {
        'user': 'codetesting',
        'pass': 'D0ntGoB00m!'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode >= 200) {
        console.log(body);
    } else {
        console.log("error-----",response.statusCode, body);
    }
}

request(options, callback);
