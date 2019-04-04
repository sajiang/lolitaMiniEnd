// utils/checkAuth/checkAuth.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authVisible: false,
  },

  /**
   * 组件的方法列表
   */
  ready: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  methods: {
    checkAuth(){
      return new Promise((resolve,reject)=>{
        if (this.data.hasUserInfo){
          resolve();
        }else{
          this.showAuth();
        }
      })
    },
    getUserInfo: function (e) {
      if (e.detail.rawData) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        });
      }
      this.hideAuth();
    },
    hideAuth() {
      this.setData({
        authVisible: false
      })
    },
    showAuth() {
      this.setData({
        authVisible: true
      })
    },
  }
})
