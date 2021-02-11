var request = require('request');
var headers = {
    'content-type': 'application/json'
};

var dataString = '{"name":"ahmed.test220.com","ipv4addrs":[{"ipv4addr":"10.10.10.20"}]}';

var options = {
    url: 'https://10.92.18.84/wapi/v2.9/record:host?_return_fields=name,ipv4addrs&_return_as_object=1',
    method: 'POST',
    headers: headers,
    body: dataString,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    auth: {
        'user': 'ashams',
        'pass': 'M0arAutomation!'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode >= 200) {
        console.log(body);
    } else {
        console.log("error-----",response.statusCode,body);
    }
}

request(options, callback);
