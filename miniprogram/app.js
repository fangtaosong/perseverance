//app.js
App({
  onLaunch: function () {
    this.globalData = {}
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
    
    var that=this
    wx.cloud.init({
      // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
      env: 'revolver-xr3cc',
      traceUser: true,
    })
     if (wx.getStorageSync('openid')) {
      console.log("登录");    
        //session_key 未过期，并且在本生命周期一直有效, 把之前的缓存赋值给2个全局变量
        that.globalData.openid = wx.getStorageSync('openid');
        that.globalData.time = wx.getStorageSync('time');        
        that.globalData.school = wx.getStorageSync('school');                 
          // 获取到 openid,做后续操作.      
        } 
        else {
            console.log("没有登录");
            //缓存不存在,清除下所有状态.
            try {
                // wx.removeStorageSync('openid');
                // wx.removeStorageSync('time');
                // wx.removeStorageSync('school');
                // app.globalData.openid = '';
          
                // 没有获取到,做后续操作
            } catch (e) {
                console.log("清除缓存失败!");
            }
            // wx.navigateTo({
            //   url: '/pages/Login/Login',
            // })

        }
    

    wx.getSystemInfo({
      success: e => {
        // console.log()
        // this.globalData.StatusBar = e.statusBarHeight;
        // let custom = wx.getMenuButtonBoundingClientRect();
        // this.globalData.Custom = custom;  
        // this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'revolver-xr3cc',
        traceUser: true,
      })
    }
    
    wx.cloud.init({
      // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
      env: 'revolver-xr3cc',
      traceUser: true,
    })
    
  }
})
