let token = (new Date().getTime() - wx.getStorageSync('expires') > 0)?"":wx.getStorageSync("token");
const baseUrl = "http://192.168.2.107:5001/api/";

const setToken=(data)=>{
  token = data;
  wx.setStorageSync("token",data);
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const requestWithToken = ({ url = "", method = "GET", message="",data={}, dataType = "json", responseType = "text", success=(res)=>{},fail=(res)=>{}}={}) =>{
  wx.showNavigationBarLoading();
  tokenIsReadyPromise.then(()=>{
    if (message != "") {
      wx.showLoading({
        title: message,
      })
    }
    wx.request({
      url: baseUrl + url,
      data: data,
      header: {
        Authorization: "Bearer " + token,
      },
      method: method,
      dataType: dataType,
      responseType: responseType,
      success: (res) => {
        //console.log(res.data)
        wx.hideNavigationBarLoading()
        if (message != "") {
          wx.hideLoading()
        }
        if (res.statusCode == 200) {
          if (res.data.code==1001){
            login()
          }
          success(res.data)
          
        } else {
          fail()
        }

      },
      fail: (res) => {
        wx.hideNavigationBarLoading()
        if (message != "") {
          wx.hideLoading()
        }
        fail()
      }
    });
  })
  
}
const tokenIsReadyPromise = new Promise(function (resolve, reject) {
  const waitReady = setInterval(function () {
    if (token) {
      clearInterval(waitReady);
      resolve();
    }
  }, 100);
});
const login=function() {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      const getToken = new Promise((resolve, reject) => {
        wx.request({
          url: baseUrl + 'User/WxUserLoginByCode',
          data: { code: res.code },
          success: (retData) => {
            if (retData.data.code === 0) {
              setToken(retData.data.data.token);
              wx.setStorageSync("expires", retData.data.data.expires);
              resolve();
            } else {
              reject();
            }
          },
          fail: () => { reject(); }
        });
      });
      const getUserInfo = new Promise((resolve, reject) => {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                withCredentials: true,
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  resolve(res);
                  wx.setStorageSync("userInfo", res.userInfo);
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  // if (this.userInfoReadyCallback) {
                  //   this.userInfoReadyCallback(res)
                  // }
                },
                fail: reject
              })
            }
          }
        });
      })
      // 获取用户信息

      const getTokenAndInfo = Promise.all([getToken, getUserInfo]);
      getTokenAndInfo.then((res) => {
        res = res[1];
        requestWithToken({
          url: "User/UpdateWxUserInfo",
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv,
          },
          success(){
            //刷新当前页面
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }
        })
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  setToken,
  requestWithToken,
  url:baseUrl,
  login: login,
}