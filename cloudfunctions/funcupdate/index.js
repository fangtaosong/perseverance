const cloud = require('wx-server-sdk')
cloud.init({
  env: 'revolver-xr3cc'//自己的环境名
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var docid = event.docid
  var newtime = event.newtime
  console.log(docid)



  try {
    var a=db.collection('user').where({
      _openid:docid
    })
    var b=await a.get()
    console.log(b.data[0].time)
    var c=b.data[0].time
    return await a.update({
      data: {
        time:b.data[0].time+newtime,
      }
    })

    // return await db.collection('user').doc("28ee4e3e60a3800119cedbc90f4095c2").update({
    //   data: {
    //     time:time+newtime,
    //   }
    // })
  } catch (e) {
    console.log(e)
  }
}