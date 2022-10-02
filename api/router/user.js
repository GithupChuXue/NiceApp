const express = require('express')
const router = express.Router()

// 路由处理函数
const userRouterHandle = require('./router_handle/user')
// 表单验证中间件
const expresssJoi = require('@escook/express-joi')
// 表单验证规则对象
const { reg_login_schema } = require('./schema/user')

// 注册新用户
// /api/reguser
router.post('/register', expresssJoi(reg_login_schema), userRouterHandle.userReg)

// 用户登录
router.post('/login', expresssJoi(reg_login_schema), userRouterHandle.userLogin)

module.exports = router