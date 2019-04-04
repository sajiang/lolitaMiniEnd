// pages/note/note.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible_sort:false,
    sortType:0,
    sortActions: [
      { name: "尾款开始时间排序", label:"尾款开始时间"},
      { name: "尾款结束时间排序", label: "尾款结束时间" }]
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
  showSort(){
    this.setData({
      visible_sort:true
    })
  },
  changeSortType({ detail }) {
    this.setData({
      sortType: detail.index,
      visible_sort: false
    })
  },
})