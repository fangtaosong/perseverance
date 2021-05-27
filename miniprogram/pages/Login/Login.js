const app = getApp();
const db = wx.cloud.database();
var open;
Page({
  data: {
    nickName: "", //保存昵称
    avatarUrl: "",//保存头像
  },
  onLoad: function (options) {
  },
  showModal(e) {
    if(app.globalData.openid)
    {
      wx.navigateTo({
        url: '/pages/indexes/indexes',
      })
    }
   else{
    wx.showModal({
      title: '失败',
      content: '你还没有授权捏',
      showCancel: false,//是否显示取消按钮
      cancelColor:'skyblue',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
         
         
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
   })

   }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  //用户登录授权
  getuserInfo(e) {

    wx.cloud.callFunction({
      name: 'getopenid',//调用云函数获取用户唯一openid
      complete: res => {
        const openid = res.result.openid;
        db.collection('user').where({
          _openid: openid
        }).get().then(res => {
          console.log(res)
          //确保数据库只有一份该用户的信息
          if (res.data == "") {
            console.log("授权登录成功")
            this.setData({
              isFirstLogin: 1
            })
            app.globalData.openid=openid
            app.globalData.time=0
            app.globalData.school="北京大学"
            wx.setStorageSync('time', 0);
            wx.setStorageSync('school',"北京大学");
            wx.setStorageSync('openid', openid);
          // 跳转到主界面
          // wx.navigateTo({
          //   url: '/xxxx/xxxx/xxxx',//登录成功后要跳转的页面
          // })
            db.collection('user').add({       
              data: {
                time:0,
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl,
                target:"北京大学",
              }
            })
          } else {
            console.log("已经登录过不用授权") 
            console.log(openid)
            console.log(res.data[0].time)
            console.log(res.data[0].target)
            app.globalData.openid=openid
            app.globalData.time=res.data[0].time
            app.globalData.school=res.data[0].target
            wx.setStorageSync('time', res.data[0].time);
            wx.setStorageSync('school', res.data[0].target);
            wx.setStorageSync('openid', openid);
            console.log("已经登录过不用授权") 
            console.log(wx.getStorageSync('openid'))
            console.log(wx.getStorageSync('time'))
            console.log(wx.getStorageSync('school'))
            wx.switchTab({
            url: '/pages/attention/attention',//登录成功后要跳转的页面
            success: function (res) {
              var page = getCurrentPages().pop();  
              if (page == undefined || page == null) return;  
              page.onLoad();  
              
            }
          })
            
          }
        })
      }
    }),
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })
    wx.setStorageSync('openid', open);

  }
})