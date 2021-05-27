// pages/attention/attention.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      school:{},
      // back_image_url:"https://7265-revolver-xr3cc-1300594244.tcb.qcloud.la/f37a738cfd41db933c5da2e543a575f7.jpeg?sign=9903d7d7a90e547c7f38a6d17c4e9113&t=1617709174",
      // logo_image_url:"https://7265-revolver-xr3cc-1300594244.tcb.qcloud.la/9115d513bbf5de079f1e90d145566a82.jpeg?sign=f263124426cfe1af4ed3c0b04233244d&t=1617710345",
      whole_time:0,
      background:"cloud://revolver-xr3cc.7265-revolver-xr3cc-1300594244/school/默认.jpg",
     
      // movies:[  
      //   {url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.vjshi.com%2F2018-07-09%2Fb67fd90a0b32675606ce2b8868b65f68%2F00003.jpg%3Fx-oss-process%3Dstyle%2Fwatermark&refer=http%3A%2F%2Fpic.vjshi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621686501&t=5e0c0c1e6dba199bdb8f0098ee323108'} ,  
      //   {url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdimg01.c-ctrip.com%2Fimages%2Ffd%2Ftg%2Fg3%2FM02%2F28%2F88%2FCggYG1XCCIuAdAZzAAslQemRU5s174.jpg&refer=http%3A%2F%2Fdimg01.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621686501&t=511a08da3529b024e7d6ac281b919fc4'} 
 
      //   ]  ,
      cardCur: 0,
      func:"ss",
      fun:function()
      {
        this.setData({
          func:"s"
        })
        
      }
   
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sel = Math.floor(Math.random() * 6);	
    var that=this;
    if(wx.getStorageSync('pic'))
    {
      console.log("有缓存")
      var a=wx.getStorageSync('pic')
      that.setData({
        school:a,
      })
      console.log(a.sight)
      that.setData({
        background:a.sight[sel],
      })
    }
    else{
      if (wx.getStorageSync('openid')&&wx.getStorageSync('school'))
      {
        console.log(app.globalData.school)
        wx.cloud.callFunction({
          name:'getschool',
          data:{
            school:app.globalData.school
          },success:function(res)
          {
            console.log(res)  
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
      else
      {
        console.log("这是缓存")
        console.log(wx.getStorageSync('openid'))
        console.log(wx.getStorageSync('time'))
        console.log(wx.getStorageSync('school'))
        console.log("这是缓存")
        console.log("主页跳转")
        wx.navigateTo({
          url: '/pages/Login/Login',
        })
      }
     
    }
    
    console.log(app.globalData.time)
    console.log(app.globalData.school)
    this.setData({
      whole_time:(app.globalData.time/60+1).toFixed(2)
    })

  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.time)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  rank:function(){
    wx.navigateTo({
      url: '/pages/rank/rank',
    })
  },
  time_on:function(){
    wx.navigateTo({
      url: '/pages/time/time',
    })
  }
})