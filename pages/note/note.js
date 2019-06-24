const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible_sort:false,
    sortType:0,
    sortActions: [
      { name: "尾款开始时间排序", label:"尾款开始时间"},
      { name: "尾款结束时间排序", label: "尾款结束时间" }],
    noteList:[],
    settings:{},
    total_sum:0,
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
    this.getNoteList()
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
  getNoteList:function(){
    util.requestWithToken({
      url: 'Memo/List',
      success: (res) => {
        if (res.code == 0) {
          let splite=[];
          res.data.list.forEach((item,i)=>{
            
          });
          this.setData({
            noteList: res.data.list,
            total_sum: res.data.total_sum,
            settings: res.data.settings
          });
        }
      }
    });
  },
  changeCheckBox(e){
    let newVal = (this.data.noteList[e.currentTarget.dataset.idx].checkbox_checked + 1) % 2;
    util.requestWithToken({
      method:"PUT",
      url: `Memo/Checked/${this.data.noteList[e.currentTarget.dataset.idx].id}`,
      data: { ischecked: newVal},
      success:(res)=>{
        this.setData({
          [`noteList[${e.currentTarget.dataset.idx}].checkbox_checked`]: newVal,
        }, () => {
          // let cut = this.data.noteList.splice(e.currentTarget.dataset.idx, 1);
          // this.setData({
          //   noteList: this.data.noteList.concat(cut)
          // });
        })
      }
    });
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
  naviToShowSetting(){
    wx.navigateTo({
      url: '../showSetting/showSetting',
    })
  }
})