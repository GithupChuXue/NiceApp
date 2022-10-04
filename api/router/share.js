const express = require('express')
const router = express.Router()

// 路由处理函数
const shareRouterHandle = require('./router_handle/share')
// 表单验证中间件
const expresssJoi = require('@escook/express-joi')
// 表单验证规则对象
const { share_upload_schema, id_share_schema } = require('./schema/share')

// multer
const multer=require('multer')
const expressJoi = require('@escook/express-joi')
const storage = multer.diskStorage({
    // 保存路径
    destination: function (req, file, callback) { 
        callback(null, './api/image')
    }, 
    // 保存文件名
    filename: function (req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname)
    } 
})
// 存储前端发送的文件
const upload = multer({ storage: storage })



// 上传内容
// /share/upload
router.post('/upload', upload.single('img'), expressJoi(share_upload_schema), shareRouterHandle.share_upload)

// 批量读取内容
// /share/show
router.get('/show', shareRouterHandle.get_all_share)

// 根据id读取内容
// /share/show/:id
router.get('/show/:id', expressJoi(id_share_schema), shareRouterHandle.get_id_share)

// 收藏目标内容
// /share/collect/:id
router.get('/collect/:id', expressJoi(id_share_schema), shareRouterHandle.collect_id_share)

module.exports = router