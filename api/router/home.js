// 首页接口
const express = require('express')
const router = express.Router()

// 路由处理函数
const homeRouterHandle = require('./router_handle/home')
// 表单验证中间件
const expresssJoi = require('@escook/express-joi')
// 表单验证规则对象
// const { share_upload_schema, get_id_share_schema } = require('./schema/home')

// 首页随机推送内容
// /home/show
router.get('/show', homeRouterHandle.home_show)

module.exports = router