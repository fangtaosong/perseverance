const cloud = require('wx-server-sdk')
cloud.init({
  env: 'revolver-xr3cc'//自己的环境名
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var docid = event.docid
  try{
    var a= await db.collection('user').where({
      _openid:docid
    }).get()
    console.log(a.data[0].time)
    return  a
  }catch(e){
    console.log(e)
  }
}