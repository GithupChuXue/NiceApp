const str1 = '无语'
const str2 = '\'%' + str1 + '%\''
const sql = 'select * from shareinfo where title like '+ str2 +' or text like ' + str2
console.log(sql)