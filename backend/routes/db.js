var mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'mysql-15664-0.cloudclusters.net',
    user: 'gugu',
    password: 'qy@x$5hFpQ9j',
    database: 'ahmed',
    port: 15664
})

connection.connect(function (err) {
    if(err) throw err
    console.log("Hello Pardip, You are successfully connted with Database")
})

module.exports = connection
