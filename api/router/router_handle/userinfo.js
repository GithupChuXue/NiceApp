const db = require('../../db/index')
const bcrypt = require('bcryptjs')

// /my/userinfo
exports.getUserinfo = (req, res) => {
    // 定义查询用户信息的sql语句
    const sql = 'select userid, username, nickname, email from userinfo where userid=?'

    db.query(sql, req.user.userid, (err, results) => {
        if (err) return res.cc(err, 400)
        if (results.length !== 1) return res.cc('获取用户信息失败', 404)

        res.send({
            status: 200, 
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

// /my/myshare
exports.getUserShare = (req, res) => {
    // 定义查询用户信息的sql语句
    const sql = 'select * from shareinfo where publisher=?'

    db.query(sql, req.user.username, (err, results) => {
        if (err) return res.cc(err, 400)
        // if (results.length !== 1) return res.cc('获取用户信息失败', 404)
        res.send({
            status: 200, 
            message: '我的分享信息获取成功',
            data: results
        })
    })
}

// /my/mycollection
exports.getUserCollection = (req, res) => {
    // 定义查询用户信息的sql语句
    const sql = 'select * from collect where userid=? and discollect=0'
    db.query(sql, req.user.userid, (err, results) => {
        if (err) return res.cc(err, 400)
        if (results.length === 0) return res.cc('收藏为空', 404)
        res.send({
            status: 200, 
            message: '获取收藏信息成功',
            data: results
        })

        // const collectStr = results[0].collection
        // let dataStrArr=collectStr.split(",");  //分割成字符串数组
        // const sql = 'select * from shareinfo where id in (' + dataStrArr +')'
        // db.query(sql, (err, results) => {
        //     if (err) return res.cc(err, 400)
        //     res.send({
        //         status: 200, 
        //         message: '获取收藏信息成功',
        //         data: results
        //     })
        // })
    })
}

// /my/userinfo
// 更新用户基本信息
exports.updateUserinfo = function(req, res) {
    const userinfo_update = req.body
    sql = 'update userinfo set ? where userid=?'
    db.query(sql, [req.body, req.user.userid], (err, results) => {
        if (err) return res.cc(err, 400)
        if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！', 404)
        res.cc('更新用户信息成功', 200)
    })
    
}

// 更新用户密码
// /my/updatepass
exports.updatePass = function (req, res) {
    const sql = 'select * from userinfo where userid=?'
    db.query(sql, req.user.userid, (err, results) => {
        if (err) return res.cc(err, 400)
        if (results.length !== 1) return res.cc('用户不存在', 404)

        const compareResult = bcrypt.compareSync(req.body.oldPassword, results[0].password)
        if (!compareResult) return res.cc('原密码输入错误', 400)
        const sql = 'update userinfo set password=? where userid=?'
        const newPas = bcrypt.hashSync(req.body.newPassword, 10)
        db.query(sql, [newPas, req.user.userid], (err, results) => {
            if (err) return res.cc(err, 400)
            if (results.affectedRows !== 1) return res.cc('更新密码失败', 404)
            res.cc('更新密码成功', 200)
        })
    })
}

// // 更新用户头像
// exports.update_avatar = (req, res) => {
//     const sql = 'update userinfo set user_pic=? where id=?'
//     db.query(sql, [req.avatar, req.user.id], (err, results) => {
//         if (err) return res.cc(err, 400)
//         if (results.affectedRows !== 1) return res.cc('用户不存在', 404)
//         res.cc('更换头像成功', 200)
//     })
// }


