// pages/page2/page2.js
const app = getApp();
const db = wx.cloud.database();
var postsData = require('../../data/tops-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:{}
  },

  // go1: function(){
  //   wx.navigateTo({
  //     url: '/pages/page2/page2'
  //   })
  // },
  go2: function(){
    wx.navigateTo({
      url: '/pages/reports/report'
    })
  },

  go3: function(){
    wx.navigateTo({
      url: '/pages/posts/post'
    })
  },
  go4:function()
  {
    wx.navigateTo({
      url: '/pages/follows/follow'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if(wx.getStorageSync('pic'))
    {
      console.log("有缓存")
      var a=wx.getStorageSync('pic')
      that.setData({
        school:a,
      })
      console.log(a.sight)
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

            wx.setStorageSync("pic",res.result.data[0],)
            that.setData({
              school:res.result.data[0],
            })

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
    this.setData({
      postList:postsData.postList
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is" + postId);
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is" + postId);
    console.log(postsData.postList[postId])
    db.collection('history').add({
      data:{
        data: postsData.postList[postId].data,
        title: postsData.postList[postId].title,
        imgSrc: postsData.postList[postId].imgSrc,
        avatar: postsData.postList[postId].avatar,
        content: postsData.postList[postId].content,
        reading: postsData.postList[postId].reading,
        collection: postsData.postList[postId].collection,
        headImgSrc: postsData.postList[postId].headImgSrc,
        author: postsData.postList[postId].author,
        dateTime: postsData.postList[postId].dateTime,
        postId: event.currentTarget.dataset.postid,
      }
    })
    wx.navigateTo({
     url: "../tops/top-detail/top-detail?id=" + postId
    })
    },
   
    onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
     url: "post-detail/post-detail?id=" + postId
    })
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

  }
})