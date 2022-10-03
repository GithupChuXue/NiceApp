const joi = require('joi')

const username = joi.string().alphanum().min(3).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

const avatar = joi.string().dataUri().required()

// 验证规则
// 注册登录
exports.reg_login_schema = {
    body:{
        username,
        password,
    },
}
// 更新信息
exports.upadate_userinfo_schema = {
    body:{
        nickname,
        email,
    },
}

// 更新密码
exports.update_password_schema = {
    body: {
        oldPassword: password,
        newPassword: joi.not(joi.ref('oldPassword')).concat(password),
    },
}

// 更换头像
exports.upadate_avatar_schema = {
    body: {
        avatar,
    },
}