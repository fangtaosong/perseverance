const cloud = require('wx-server-sdk')
cloud.init({
  env: 'revolver-xr3cc'//自己的环境名
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var school = event.school
  try {
    console.log(school)
    console.log("11")
    var a= db.collection('school').where({
      name:school
    })
    var b=await a.get()
    console.log(a)
   
    return b
  } catch (e) {
    console.log(e)
  }
}