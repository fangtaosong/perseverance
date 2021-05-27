var postsData = require('../../../data/tops-data.js')
var app = getApp();
Page({
 data: {
  isPlayingMusic: false
 },
 onLoad: function (option) {
  var postId = option.id;
  this.data.currentPostId = postId;
  var postData = postsData.postList[postId];
  this.setData({
   postData: postData
  })

  var postsCollected = wx.getStorageSync('posts_collected')
  if (postsCollected) {
   var postCollected = postsCollected[postId]
   if (postCollected){
    this.setData({
    collected: postCollected
    })
   }
  }
  else {
   var postsCollected = {};
   postsCollected[postId] = false;
   wx.setStorageSync('posts_collected', postsCollected);
  }
 },

 onColletionTap: function (event) {
  // this.getPostsCollectedSyc();
  this.getPostsCollectedAsy();
 },

 getPostsCollectedAsy: function () {
  var that = this;
  wx.getStorage({
   key: "posts_collected",
   success: function (res) {
    var postsCollected = res.data;
    var postCollected = postsCollected[that.data.currentPostId];
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[that.data.currentPostId] = postCollected;
    that.showToast(postsCollected, postCollected);
   }
  })
 },

 getPostsCollectedSyc: function () {
  var postsCollected = wx.getStorageSync('posts_collected');
  var postCollected = postsCollected[this.data.currentPostId];
  // 收藏变成未收藏，未收藏变成收藏
  postCollected = !postCollected;
  postsCollected[this.data.currentPostId] = postCollected;
  this.showToast(postsCollected, postCollected);
 },

 showModal: function (postsCollected, postCollected) {
  var that = this;
  wx.showModal({
   title: "收藏",
   content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
   showCancel: "true",
   cancelText: "取消",
   cancelColor: "#333",
   confirmText: "确认",
   confirmColor: "#405f80",
   success: function (res) {
    if (res.confirm) {
     wx.setStorageSync('posts_collected', postsCollected);
     // 更新数据绑定变量，从而实现切换图片
     that.setData({
      collected: postCollected
     })
    }
   }
  })
 },

 showToast: function (postsCollected, postCollected) {
  // 更新文章是否的缓存值
  wx.setStorageSync('posts_collected', postsCollected);
  // 更新数据绑定变量，从而实现切换图片
  this.setData({
   collected: postCollected
  })
  wx.showToast({
   title: postCollected ? "收藏成功" : "取消成功",
   duration: 1000,
   icon: "success"
  })
 },

 onShareTap: function (event) {
  var itemList = [
   "分享给微信好友",
   "分享到朋友圈",
   "分享到QQ",
   "分享到微博"
  ];
  wx.showActionSheet({
   itemList: itemList,
   itemColor: "#405f80",
   success: function (res) {
    // res.cancel 用户是不是点击了取消按钮
    // res.tapIndex 数组元素的序号，从0开始
    wx.showModal({
     title: "用户 " + itemList[res.tapIndex],
     content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
    })
   }
  })
 },

 onMusicTap: function (event) {
  var currentPostId = this.data.currentPostId;
  var postData = postsData.postList[currentPostId];
  var isPlayingMusic = this.data.isPlayingMusic;
  if (isPlayingMusic) {
   wx.pauseBackgroundAudio();
   this.setData({
    isPlayingMusic: false
   })
   // app.globalData.g_currentMusicPostId = null;
   app.globalData.g_isPlayingMusic = false;
  }
  else {
   wx.playBackgroundAudio({
    dataUrl: postData.music.url,
    title: postData.music.title,
    coverImgUrl: postData.music.coverImg,
   })
   this.setData({
    isPlayingMusic: true
   })
   app.globalData.g_currentMusicPostId = this.data.currentPostId;
   app.globalData.g_isPlayingMusic = true;
  }
 },

 /*
 * 定义页面分享函数
 */
 onShareAppMessage: function (event) {
  return {
   title: '离思五首·其四',
   desc: '曾经沧海难为水，除却巫山不是云',
   path: '/pages/posts/post-detail/post-detail?id=0'
  }
 }

})