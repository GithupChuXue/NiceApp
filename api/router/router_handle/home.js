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

// 首页随机显示，打包20份内容
// /home/show
exports.home_show = (req, res) => {
    const sql = 'select * from shareinfo'
}