const express = require('express')
const router = express.Router()
const path = require('path')

// 路由处理函数
const shareRouterHandle = require('./router_handle/share')
// 表单验证中间件
const expresssJoi = require('@escook/express-joi')
// 表单验证规则对象
const { share_upload_schema, id_share_schema, search_share_schema } = require('./schema/share')

// multer
const multer=require('multer')
const expressJoi = require('@escook/express-joi')
const { route } = require('./user')
const storage = multer.diskStorage({
    // 保存路径
    destination: path.join(__dirname, '.././image'),
    // destination: function (req, file, callback) { 
    //     callback(null, './image')
    // }, 
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

// 点赞目标内容
// /share/favor/:id
router.get('/favor/:id', expressJoi(id_share_schema), shareRouterHandle.favor_share_id)

// 获取内容的点赞信息
// /share/favor/user/:id
router.get('/favor/user/:id', expressJoi(id_share_schema), shareRouterHandle.favor_share_id_user)

// 删除目标内容
// /share/delete/:id
router.get('/delete/:id', expressJoi(id_share_schema), shareRouterHandle.delete_share_id)

// 搜索内容
// /share/search/:search
router.get('/search/:search', expressJoi(search_share_schema), shareRouterHandle.search_share)

module.exports = router