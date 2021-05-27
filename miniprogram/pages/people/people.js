//index.js
var app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    school:{},
    background:"cloud://revolver-xr3cc.7265-revolver-xr3cc-1300594244/school/默认.jpg",

  },

  onLoad: function() {
    var sel = Math.floor(Math.random() * 6);	
    var that=this;
    if(wx.getStorageSync('pic'))
    {
      console.log("有缓存")
      var a=wx.getStorageSync('pic')
      that.setData({
        school:a,
      })
      that.setData({
        background:a.sight[sel],
      })
    }
    else{
      wx.cloud.callFunction({
        name:'getschool',
        data:{
          school:app.globalData.school
        },success:function(res)
        {
            
          wx.setStorageSync("pic",res.result.data[0],)
          that.setData({
            school:res.result.data[0],
          })
          that.setData({
            background:res.result.data[0].sight[sel],
          })
          console.log(res)
        }
      })
    }
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true,
    //   })
    // }
  },
  goal:function()
  {
    wx.navigateTo({
      url: '/pages/indexes/indexes',
    })
  },
  // getUserProfile() {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       this.setData({
  //         avatarUrl: res.userInfo.avatarUrl,
  //         nickName: res.userInfo.nickName,
  //         userInfo: res.userInfo,
  //         hasUserInfo: true,
  //       })
  //     }
  //   })
  // },

  // onGetUserInfo: function(e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       nickName: e.detail.userInfo.nickName,
  //       userInfo: e.detail.userInfo,
  //       hasUserInfo: true,
  //     })
  //   }
  // },
  
})
