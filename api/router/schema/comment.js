const joi = require('joi')
const string = joi.string().required()
// id 的校验规则
const id = joi.number().integer().min(1).required()
// const id = joi.string().required()
const commenttext = joi.string().required()


// 验证规则对象 - 根据 Id 读取内容
exports.id_comment_schema = {
    params: {
      id,
    },
}


exports.text_comment_schema = {
    body: {
        commentid: id,
        shareid: id,
        commenttext, 
    },
}
