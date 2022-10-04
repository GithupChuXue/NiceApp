const joi = require('joi')
const string = joi.string().required()
// id 的校验规则
// const id = joi.number().integer().min(1).required()
const id = joi.string().required()
exports.share_upload_schema = {
    body: {
        title: string,
        text: string,
    },
}

// 验证规则对象 - 根据 Id 读取内容
exports.id_share_schema = {
    params: {
      id,
    },
  }