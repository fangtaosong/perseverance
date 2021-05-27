// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    var a= await db.collection('school').get()
    console.log(a)
    return  a
  }catch(e){
    console.log(e)
  }
}