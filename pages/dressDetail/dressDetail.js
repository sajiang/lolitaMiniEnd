// pages/dressDetail/dressDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:"0",
    showBottom:false,
    detail: {
      isCollect: true,
      isNote:true,
      name: "黄金之时",
      storeName: "RabbitPalace洋装馆",
      type: [{
        name: "jsk",
        imgs: ["../../https/223.jpg", "../../https/223.jpg"]
      }, {
        name: "op",
        imgs: ["../../https/223.jpg", "../../https/223.jpg", "../../https/223.jpg", "../../https/223.jpg"]
      }, {
        name: "姬袖衬衫",
        imgs: ["../../https/233.jpg", "../../https/233.jpg", "../../https/233.jpg", "../../https/233.jpg"]
      }, {
        name: "边夹",
        imgs: ["../../https/241.jpg"]
      }, {
        name: "设计图",
        imgs: ["../../https/253.jpg", "../../https/253.jpg", "../../https/253.jpg"]
      }, {
        name: "饼图",
        imgs: ["../../https/261.jpg", "../../https/261.jpg", "../../https/261.jpg", "../../https/261.jpg"]
      }]
    }
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
  changeCurrent(event) {
    this.setData({
      current: event.currentTarget.dataset.idx
    });
  },
  changeBottomDis(){
    this.setData({
      showBottom:!this.data.showBottom
    });
  },
  collect(){
    
  }
})