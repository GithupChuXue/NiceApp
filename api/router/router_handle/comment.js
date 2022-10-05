// 导入数据库模块db
const db = require('../../db/index')

// /comment/show/:id
exports.show_comment_id = (req, res) => {
    const sql = 'select * from comment where commentid=? and is_delete=0'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err, 400)
        if (results.length !== 1) return res.cc(err, 404)
        res.send({
            status: 200,
            message: '读取评论信息成功',
            data: results[0],
            // commentid, userid, shareid, commenttext
        })
    })
}
// /comment/upload
exports.upload_comment = (req, res) => {
    // 判断是对share的评论还是对comment的评论
    // 对share的评论
    if (req.body.commentid ===0) {
        const sql = 'select * from shareinfo where shareid=? and is_delete=0'
        db.query(sql, req.body.shareid, (err, results) => {
            if (err) return res.cc(err, 400)
            if (results.length !== 1) return res.cc(err, 404)
            const sql = 'insert into comment set ?'
            db.query(sql, {userid: req.user.userid, shareid: req.body.shareid, commenttext: req.body.commenttext}, (err, results) => {
                if (err) return res.cc(err, 400)
                if (results.affectedRows !== 1) return res.cc(err, 404)
                return res.send({
                    status: 200,
                    message: '评论成功',
                })
            })
        })
    } 
    // 对comment进行评论
    else {
        const sql = 'select * from comment where commentid=? and is_delete=0'
        db.query(sql, req.body.commentid, (err, results) => {
            if (err) return res.cc(err, 400)
            if (results.length !== 1) return res.cc(err, 404)
            const sql = 'insert into comment set ?'
            db.query(sql, {userid: req.user.userid, shareid: req.body.shareid, commenttext: req.body.commenttext, father_comment_id: req.body.commentid}, (err, results) => {
                if (err) return res.cc(err, 400)
                if (results.affectedRows !== 1) return res.cc(err, 404)
                return res.send({
                    status: 200,
                    message: '评论成功',
                })
            })
        })
    }
}