const mysql = require('mysql2')

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'da100923',
    database: 'acai_store'
})

module.exports = pool