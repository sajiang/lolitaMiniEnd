// pages/showSetting/showSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkBox:false,
    checkBoxLine:true,
    opName:true,
    storeName:false,
    money1:false,
    money2:true,
    transFee:false,
    money1StartTime: false,
    money1EndTime: false,
    money2StartTime: true,
    money2EndTime:false,
    detail:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  onSwitchChange(event) {
    this.setData({
      [event.currentTarget.dataset.name]: event.detail.value
    })
  },
})