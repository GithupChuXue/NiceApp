// 导入数据库模块db
const db = require('../../db/index')
// 导入bcryptjs用于密码加密
const bcrypt = require('bcryptjs')
// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../../config')


// /api/register
// 注册新用户
exports.userReg = function (req, res) {
    const userinfo = req.body
    // 检测用户名和密码是否为空
    if (!userinfo.username || !userinfo.password) return res.cc('用户名或密码不合法！', 400)
    // 查询用户名是否被占用
    const sqlStr = 'select * from userinfo where username=?'
    console.log(userinfo)
    db.query(sqlStr, userinfo.username, function(err, results) {
        if (err) return res.cc(err, 400)
        if (results.length > 0) return res.cc(err, 404)
        console.log(userinfo)
        // 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 插入用户信息
        const sqlStr1 = 'insert into userinfo set ?'
        db.query(sqlStr1, {username: userinfo.username, password: userinfo.password}, (err, results) => {
            if (err) return res.cc(err, 400)
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！', 404)
            return res.send({ status: 200, message: '注册成功！' })
        })
    })
}

// /api/login
// 用户登录
exports.userLogin = function (req, res) {
    const userinfo = req.body
    const sql = 'select * from userinfo where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err, 400)
        if (results.length !== 1) return res.cc('登录失败', 404)
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('密码错误', 400)

        // 在服务器端生成token
        const user = { ...results[0], password: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 200,
            message: '登录成功',
            token: 'bearer ' + tokenStr,
        })
    })
}