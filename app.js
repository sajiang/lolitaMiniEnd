//app.js
const util = require("utils/util.js");
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.checkSession({
      success:()=> {
        //session_key 未过期，并且在本生命周期一直有效
        //token失效了
        if (new Date().getTime() - wx.getStorageSync('expires')>0){
          util.login();
        }else{
          //token没失效 登陆也没有失效
        }
      },
      fail: () => {
        // session_key 已经失效，需要重新执行登录流程
        util.login();
      }
    })
    // 登录
    
    
  },
  
})