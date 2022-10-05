const express = require('express')
const router = express.Router()

// 路由处理函数
const commentRouterHandle = require('./router_handle/comment')
// 表单验证中间件
const expresssJoi = require('@escook/express-joi')
// 表单验证规则对象
const { id_comment_schema, text_comment_schema } = require('./schema/comment')

// /comment/show/:id
router.get('/show/:id', expresssJoi(id_comment_schema), commentRouterHandle.show_comment_id)

// /comment/upload
router.post('/upload', expresssJoi(text_comment_schema), commentRouterHandle.upload_comment)



module.exports = router