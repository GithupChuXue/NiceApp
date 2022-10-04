const express = require('express')
const router = express.Router()

const userinfo_handle = require('./router_handle/userinfo')

// 表单验证中间件
const expressJoi = require('@escook/express-joi')
// 表单验证规则对象
const { upadate_userinfo_schema, update_password_schema, upadate_avatar_schema } = require('./schema/user')

// /my/userinfo
// 获取用户信息
router.get('/userinfo', userinfo_handle.getUserinfo)
// 获取收藏信息
router.get('/mycollection', userinfo_handle.getUserCollection)
// 获取发布信息
router.get('/myshare', userinfo_handle.getUserShare)

// 更新用户信息
router.post('/userinfo', expressJoi(upadate_userinfo_schema), userinfo_handle.updateUserinfo)
// 更新密码
router.post('/updatepass', expressJoi(update_password_schema), userinfo_handle.updatePass)
// 更换头像
// router.post('/update/avatar', expressJoi(upadate_avatar_schema), userinfo_handle.update_avatar)

module.exports = router