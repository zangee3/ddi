const request = require('request');

const BASE_URL = `hhttps://10.92.18.84/wapi/v2.9/`

module.exports = {
    createHostRecord: () => request({
        method:"POST",
        url : BASE_URL + `record:host`,
        headers: {
            "content-type":"application/json"
        },
        auth: {
            username: 'codetesting',
            password: 'D0ntGoB00m!'
        },
        params: {
            _return_fields:'name,ipv4addrs',
            _return_as_object: 1
        },
        data: {
            "name":"host.info.com",
            "ipv4addrs":[
                {
                    "ipv4addr":"10.10.10.20"
                }
            ]
        }
    })
}