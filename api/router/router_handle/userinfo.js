const db = require('../../db/index')
const bcrypt = require('bcryptjs')

// /my/userinfo
exports.getUserinfo = (req, res) => {
    // 定义查询用户信息的sql语句
    const sql = 'select id, username, nickname, email, user_pic from userinfo where id=?'

    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err, 31)
        if (results.length !== 1) return res.cc('获取用户信息失败', 31)

        res.send({
            status: 30, 
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}
// 更新用户基本信息
exports.updateUserinfo = function(req, res) {
    const userinfo_update = req.body
    sql = 'update userinfo set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err, 41)
        if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！', 41)
        res.cc('更新用户信息成功', 40)
    })
    
}

// 更新用户密码
// /my/updatepassword
exports.updatePassword = function (req, res) {
    const sql = 'select * from userinfo where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err, 51)
        if (results.length !== 1) return res.cc('用户不存在', 51)

        const compareResult = bcrypt.compareSync(req.body.oldPassword, results[0].password)
        if (!compareResult) return res.cc('原密码输入错误', 51)
        const sql = 'update userinfo set password=? where id=?'
        const newPas = bcrypt.hashSync(req.body.newPassword, 10)
        db.query(sql, [newPas, req.user.id], (err, results) => {
            if (err) return res.cc(err, 51)
            if (results.affectedRows !== 1) return res.cc('更新密码失败', 51)
            res.cc('更新密码成功', 50)
        })
    })
}

// 更新用户头像
exports.update_avatar = (req, res) => {
    const sql = 'update userinfo set user_pic=? where id=?'
    db.query(sql, [req.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('用户不存在')
        res.cc('更换头像成功', 0)
    })
}
