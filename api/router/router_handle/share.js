// 导入数据库模块db
const db = require('../../db/index')
// // 导入bcryptjs用于密码加密
// const bcrypt = require('bcryptjs')
// // 导入生成token的包
// const jwt = require('jsonwebtoken')
// // 导入全局的配置文件
// const config = require('../../config')

// 导入silly-date获取时间
const sd = require('silly-datetime')

// /share/upload
// 上传内容
exports.share_upload = (req, res) => {
    const sql = 'insert into shareinfo set ?'
    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    
    console.log(req.body)
    console.log(req.file)
    
    imgName = req.file.filename
    console.log(imgName)

    db.query(sql, {publisher: req.user.username, title: req.body.title, text: req.body.text, time: time, img: imgName}, (err, results) => {
        if (err) return res.cc(err, 400)
        if (results.affectedRows !== 1) return res.cc('发布内容失败，请稍后再试！', 404)
        res.send({message: '发布内容成功', status: 200})
    })
}

// /share/show
// 读取所有发布的内容
exports.get_all_share = (req, res) => {
    const sql = 'select * from shareinfo where is_delete=0 order by shareid desc'
    db.query(sql, (err, results) => {
        if(err) return res.cc(err, 400)
        res.send({
            status: 200,
            message: '读取所有内容！',
            data: results,
        })
    })
}

// /share/show/:id
// 根据id读取内容
// 读取share本身的内容
// 读取share的评论
exports.get_id_share = (req, res) => {
    const sql = 'select * from shareinfo where shareid='+req.params.id
    console.log(sql)
    db.query(sql, (err, results) => {
        if(err) return res.cc(err, 400)
        if(results.length !== 1) return res.cc(err, 404)
        const share_content = results[0]
        const sql = 'select * from comment where shareid='+req.params.id
        db.query(sql, (err, results) => {
            if(err) return res.cc(err, 400)
            return res.send({
                status: 200,
                message: `成功读取id:${req.params.id}的share以及其评论`,
                shareData: share_content,
                commentData: results,
            })
        })
    })
}

// 收藏内容
// /share/collect/:id
exports.collect_id_share = (req, res) => {
    console.log('开始')
    const sql = 'select * from collect where userid=' + req.user.userid + ' and shareid=' + req.params.id
    console.log(sql)
    db.query(sql, (err, results) => {
        console.log('查询collect')
        if(err) return res.cc(err, 400)
        if(results.length !== 0) {
            let num = 1
            let tip = '取消收藏'
            if(results[0].discollect === 1) {
                num = 0
                tip = '重新收藏成功'
            }
            const sql = 'update collect set discollect='+num+' where userid='+req.user.userid+' and shareid='+req.params.id
            db.query(sql, (err, results) => {
                console.log('查询shareinfo')
                if(err) return res.cc(err, 400)
                if(results.affectedRows !== 1) return res.cc(err, 404)
                return res.send({
                    status: 200,
                    message: tip,
                })
            })
        } else {
            // 没有记录，添加记录
            const sql = 'select * from shareinfo where shareid=' + req.params.id
            db.query(sql, (err, results) => {
                if(err) return res.cc(err, 400)
                if(results.length !== 1) return res.cc(err, 404)
                const sql = 'insert into collect set ?'
                db.query(sql, {userid: req.user.userid, shareid: Number(req.params.id)}, (err, results) => {
                    if(err) return res.cc(err, 400)
                    if(results.affectedRows !== 1) return res.cc('插入信息失败', 404) 
                    return res.send({
                        status: 200,
                        message: `用户id:${req.user.userid}收藏内容id:${req.params.id}的内容成功`,
                    })
                })
            })
        }
    })
}


// 删除目标share
// /share/delete/:id
exports.delete_share_id = (req, res) => {
    const sql = 'select * from shareinfo where shareid=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err, 400)
        if (results.length !== 1) return res.cc(err, 404)
        const sql = 'update shareinfo set is_delete=1 where shareid=?'
        db.query(sql, req.params.id, (err, results) => {
            if (err) return res.cc(err, 400)
            if (results.affectedRows !== 1) return res.cc(err, 404)
            res.send({
                status: 200,
                message: `成功删除id:${req.params.id}的share`,
            })
        })
    })
}

// 搜索包含指定字段的内容
// /share/search/:search
exports.search_share = (req, res) => {
    const str = '\'%' + req.params.search + '%\''
    console.log(str)
    const sql = 'select * from shareinfo where title like '+ str +' or text like ' + str
    console.log(sql)
    db.query(sql, (err, results) => {
        if (err) return res.cc(err, 400)
        console.log(results)
        res.send({
            status: 200,
            message: `成功搜索到包含字段${req.params.search}的内容`,
            data: results,
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
