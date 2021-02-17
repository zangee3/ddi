var request = require('request');

var headers = {
    'content-type': 'application/json'
};

var dataString = '{"ipv4addrs":[{"ipv4addr": "172.26.1.21"}]}';

var options = {
    url: 'https://gridmaster/wapi/v2.11/record:host/ZG5zLmhvc3QkLl9kZWZhdWx0LmNvbS50ZXN0Lmhvc3Qx:host1.test.com/default?_retur
n_fields%2B=ipv4addrs&_return_as_object=1',
    method: 'PUT',
    headers: headers,
    body: dataString,
    auth: {
        'user': 'admin',
        'pass': 'infoblox'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);
