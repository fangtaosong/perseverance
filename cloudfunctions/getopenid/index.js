// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'revolver-xr3cc'//自己的环境名
})
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
  }
}