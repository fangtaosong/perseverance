const app = getApp();
const db = wx.cloud.database()


Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    list: []
    // list:[{
    //   name:"北京大学",
    //   badge:""
    // },{
    //   name:"中国人民大学",
    //   badge:""
    // },{
    //   name:"清华大学",
    //   badge:""
    // },{
    //   name:"北京航空航天大学",
    //   badge:""
    // },{
    //   name:"北京理工大学",
    //   badge:""
    // },{
    //   name:"中国农业大学",
    //   badge:""
    // },{
    //   name:"北京师范大学",
    //   badge:""
    // },{
    //   name:"中央民族大学",
    //   badge:""
    // },{
    //   name:"南开大学",
    //   badge:""
    // },{
    //   name:"天津大学",
    //   badge:""
    // },{
    //   name:"大连理工大学",
    //   badge:""
    // },{
    //   name:"吉林大学",
    //   badge:""
    // },{
    //   name:"哈尔滨工业大学",
    //   badge:""
    // },{
    //   name:"复旦大学",
    //   badge:""
    // },{
    //   name:"同济大学",
    //   badge:""
    // },{
    //   name:"上海交通大学",
    //   badge:""
    // },{
    //   name:"华东师范大学",
    //   badge:""
    // },{
    //   name:"南京大学",
    //   badge:""
    // },{
    //   name:"东南大学",
    //   badge:""
    // },{
    //   name:"浙江大学",
    //   badge:""
    // },{
    //   name:"中国科学技术大学",
    //   badge:""
    // },{
    //   name:"厦门大学",
    //   badge:""
    // },{
    //   name:"山东大学",
    //   badge:""
    // },{
    //   name:"中国海洋大学",
    //   badge:""
    // },{
    //   name:"武汉大学",
    //   badge:""
    // },{
    //   name:"华中科技大学",
    //   badge:""
    // },{
    //   name:"中南大学",
    //   badge:""
    // },{
    //   name:"中山大学",
    //   badge:""
    // },{
    //   name:"华南理工大学",
    //   badge:""
    // },{
    //   name:"四川大学",
    //   badge:""
    // },{
    //   name:"重庆大学",
    //   badge:""
    // },{
    //   name:"电子科技大学",
    //   badge:""
    // },{
    //   name:"西安交通大学",
    //   badge:""
    // },{
    //   name:"西北工业大学",
    //   badge:""
    // },{
    //   name:"兰州大学",
    //   badge:""
    // },{
    //   name:"中国人民解放军国防科技大学",
    //   badge:""
    // },{
    //   name:"东北大学",
    //   badge:""
    // },{
    //   name:"郑州大学",
    //   badge:""
    // },{
    //   name:"湖南大学",
    //   badge:""
    // },{
    //   name:"云南大学",
    //   badge:""
    // },{
    //   name:"西北农林科技大学",
    //   badge:""
    // },{
    //   name:"新疆大学",
    //   badge:""
    // },{
    //   name:"中国政法大学",
    //   badge:""
    // },{
    //   name:"中国科学院大学",
    //   badge:""
    // },{
    //   name:"北京邮电大学",
    //   badge:""
    // }]
  },
  onLoad() {
    var _this = this
    wx.cloud.callFunction({
      name: 'getschoollist',
      complete: res=>{
        console.log(res.result)
        this.setData({
          list: res.result.data
        })
      }
    })
    // db.collection('school').get({
    //   //如果查询成功的话    
    //   success: res => {
    //     console.log(res.data)
    //     //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
    //     this.setData({
    //       list: res.data
    //     })
    //   }
    // })
  },
  // onReady() {
  //   let that = this;
  //   wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
  //     that.setData({
  //       boxTop: res.top
  //     })
  //   }).exec();
  //   wx.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
  //     that.setData({
  //       barTop: res.top
  //     })
  //   }).exec()
  // },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.list[num]
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  recheck:function()
  {
    wx.redirectTo({
      url: '/pages/attention/attention',
    })  
    for (var i=0;i<this.data.list.length;i++)
    {
      if(this.data.list[i].pick==="0")
      {
        continue;
      }
      this.setData({
        [`list[${i}].pick`]:"0",   
      })
    }
  },
  send:function()
  {
    for (var i=0;i<this.data.list.length;i++)
    {
      if(this.data.list[i].pick==="0")
      {
        continue;
      }
      
      const that=this
      var school=this.data.list[i].name
      wx.cloud.callFunction({
        name:'upschool',
        data:{
          docid:app.globalData.openid,
          school:this.data.list[i].name
        },success:function(res){
          app.globalData.school=school
          console.log(app.globalData.school)
          wx.setStorageSync('school',school)
          wx.showToast({
            title: '修改成功',//提示文字
            duration:2000,//显示时长
            mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
            icon:'success', //图标，支持"success"、"loading"  
            success:function(){
             
             },//接口调用成功
         })
         wx.removeStorageSync('pic')
         wx.setStorageSync('school',school)
         wx.switchTab({
           url: '/pages/attention/attention',//登录成功后要跳转的页面
           success: function (res) {
             var page = getCurrentPages().pop();  
             if (page == undefined || page == null) return;  
             page.onLoad();  
             
           }
         })
        },
      });
    }
    
  },
  pick:function(e)
  {
    console.log(e.currentTarget.dataset.index)
    console.log( this.data.list.length)

    for (var i=0;i<this.data.list.length;i++)
    {
      if(this.data.list[i].pick==="0")
      {
        continue;
      }
      this.setData({
        [`list[${i}].pick`]:"0",   
      })
    }
    this.setData({
      [`list[${e.currentTarget.dataset.index}].pick`]:"1",   
    })
  
      console.log("success")
  
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.list;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
  }
});