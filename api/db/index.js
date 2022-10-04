// mysql入口
// db为服务器端构建的数据库
const mysql = require('mysql')

const db = mysql.createPool({
    host: '47.92.120.204',
    user: 'root',
    password: '@Qwe123456',
    database: 'niceapp'
})

// const db = mysql.createPool({
//     host: '47.92.120.204',
//     user: 'root',
//     password: '@Qwe123456',
//     database: 'app'
// })

/* const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'xzk123',
    database: 'my_db_01'
})
 */
module.exports = db