// 导入数据库模块db
const db = require('../../db/index')
// 导入bcryptjs用于密码加密
const bcrypt = require('bcryptjs')
// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../../config')
// 导入silly-date获取时间
const sd = require('silly-datetime')

// 上传内容
exports.share_upload = (req, res, next) => {
    const sql = 'insert into shareinfo set ?'
    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    imgName = req.file.filename
    // console.log(req.body)
    // console.log(req.file)
    db.query(sql, {owner: req.user.username, title: req.body.title, text: req.body.text, time: time, img: imgName}, (err, results) => {
        if (err) return res.cc(err, 400)
        if (results.affectedRows !== 1) return res.cc('发布内容失败，请稍后再试！', 404)
        res.send({message: '发布内容成功', status: 200})
    })
}

// 读取所有发布的内容
exports.get_all_share = (req, res) => {
    const sql = 'select * from shareinfo where status=0'
    db.query(sql, (err, results) => {
        if(err) return res.cc(err, 400)
        res.send({
            status: 200,
            message: '获取文章分类数据成功！',
            data: results,
          })
    })
}

// 根据id读取内容
exports.get_id_share = (req, res) => {
    const sql = 'select * from shareinfo where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if(err) return res.cc(err, 400)
        if(results.length !== 1) return res.cc(err, 404)
        res.send({
            status: 200,
            message: `获取id:${req.params.id}的内容成功`,
            data: results[0]
        })
    })
}


/* exports.share_upload_img = (req, res) => {
    if (req.file === undefined) return res.cc('file wrong')
    console.log(req.file)
    console.log(req.body)
    const sql = 'update shareinfo set ? where id=?'
    res.send('图片上传成功')
}
 */
