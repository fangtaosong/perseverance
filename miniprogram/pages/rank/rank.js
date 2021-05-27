// miniprogram/rank/rank.js
const app = getApp();
var that=this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    TabCur: 0,
    scrollLeft:0,
    card:[{
      id:0,
      text:"月榜"
    },{
      id:2,
      text:"总榜"
    }]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.cloud.callFunction({
      name:'queryall',
      data:{
      },success:function(res){
        console.log(res)
        console.log(res.result.data)
        console.log(app.globalData.openid)
       that.setData({
          user:res.result.data
        })
      },fail:function(res){
        console.log(res)
      }
    })
   
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