var that=this;
var flag=0;
var second;
var minute;
var hours;
const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
      hours: '0' + 0,   // 时
      minute: '0' + 0,   // 分
      second: '0' + 0,    // 秒
      back_image_url:"cloud://revolver-xr3cc.7265-revolver-xr3cc-1300594244/school/默认.jpg",
      sentence:[
          "努力一点吧，为了能做更好的路，遇见更优秀的人。",
          "等你优秀了，你想要的都会找你",
          "总有人会赢，为什么不能是我呢!",
          "所谓无底深渊，下去也是前程万里。",
          "天越黑，星星越亮。",
          "喜欢的人都很优秀,想买的东西都很贵",
          "谁知天海阔，别有一家人。",
          "既然选择远方，便只顾风雨兼程。"
      ],
      slogan:""

  },
      
  onLoad: function (options) {
    var sel = Math.floor(Math.random() * 6);	
    console.log(sel)
    var that=this;
    if(wx.getStorageSync('pic'))
    {
      console.log("有缓存")
      var a=wx.getStorageSync('pic')
      that.setData({
        back_image_url:a.sight[sel],
      })
      that.setData({
        slogan:a.motto,
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
            back_image_url:res.result.data[0].sight[sel],
          })
          console.log(res)
        }
      })
    }
    
    // wx.request({
    //     url: 'https://data.zhai78.com/openOneGood.php', //鸡汤api
    //     header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     success:(res)=> {
    //       console.log('心灵鸡汤',res)
    //       console.log('心灵鸡汤数据',res.data)
    //       this.setData({
    //         slogan:res.data.txt
    //       })
    //     }
    //   })
      // 调用函数
    //   let a = Math.ceil(Math.random()*100);    
    //   let b=this.data.sentence.length 
    //   let sen=this.data.sentence
    //   this.setData({
    //       slogan:sen[a%b]
    //   })
      this.setInterval()
  }, 
  setInterval:function()
  {

  },
  // 计时器
  setInterval: function () {
      const that = this
      second = that.data.second
      minute = that.data.minute
      hours = that.data.hours
      
      setInterval(function () {  // 设置定时器
        if(flag==1)
      {
        second ='0' + 0
        minute = '0' + 0
        hours = '0' + 0
        flag=0
        console.log("success")
      }       
          second++
          if (second >= 60) {
              second = 0  //  大于等于60秒归零
              minute++
              if (minute >= 60) {
                  minute = 0  //  大于等于60分归零
                  hours++
                  if (hours < 10) {
                      // 少于10补零
                      that.setData({
                          hours: '0' + hours
                      })
                  } else {
                      that.setData({
                          hours: hours
                      })
                  }
              }
              if (minute < 10) {
                  // 少于10补零
                  that.setData({
                      minute: '0' + minute
                  })
              } else {
                  that.setData({
                      minute: minute
                  })
              }
          }
          if (second < 10) {
              // 少于10补零
              that.setData({
                  second: '0' + second
              })
          } else {
              that.setData({
                  second: second
              })
          }
          if(flag==1)
      {
        second ='0' + 0
        minute = '0' + 0
        hours = '0' + 0
        flag=0
        console.log("success")
      }       
      }, 1000)
  },
 reload:function()
  {
    second ='0' + 0
    minute = '0' + 0
    hours = '0' + 0
      this.setData({
        hours: '0' + 0,   // 时
        minute: '0' + 0,   // 分
        second: '0' + 0,    // 秒
      })
      flag=1
  },
  rollback:function()
  {
    // db.collection('user').where({
    //   _openid:app.globalData.openid
    // })
    // .update({
    //   data: {
    //     time:50,
    //   }
    // })
    // db.collection('user').where({
    //   _openid: app.globalData.openid
    // }).get().then(res => {
    //   console.log("a")
    //   console.log(res)
    //   console.log("a")})

    const that=this
    var time_pre= wx.getStorageSync('time');
    wx.setStorageSync('time', time_pre+second);
    app.globalData.time=app.globalData.time+second
    wx.cloud.callFunction({
      name:'funcupdate',
      data:{
        docid:app.globalData.openid,
        newtime: hours*3600+minute*60+second,
      },success:function(res){
        console.log("1")
        console.log(res)
        console.log(app.globalData.openid)
        console.log(hours*3600+minute*60+second)
        that.reload();
      },fail:function(res){
        console.log(res)
      }
    }),
    wx.showModal({
        title: '返回上一页',
        content: '是否要返回上一页，您的专注时长已被记录',
        showCancel: true,//是否显示取消按钮
        cancelText:"否",//默认是“取消”
        cancelColor:'skyblue',//取消文字的颜色
        confirmText:"是",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
           if (res.cancel) {
              //点击取消,默认隐藏弹框
           } else {
            console.log("success")
            wx.switchTab({
                  
                url: '/pages/attention/attention',
                success: function (res) {
                  var page = getCurrentPages().pop();  
                  if (page == undefined || page == null) return;  
                  page.onLoad();  
                  
                }

              })
           }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
     })

  },

})