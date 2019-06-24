const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setting:{
      checkbox_show: 1,
      detailinfo_show: 1,
      earnest_endtime_show: 1,
      earnest_show: 1,
      earnest_starttime_show: 1,
      name_show: 1,
      postage_show: 1,
      storename_show: 1,
      tail_endtime_show: 1,
      tail_show: 1,
      tail_starttime_show: 1,
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSetting();
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

  getSetting(){
    util.requestWithToken({
      url: 'Memo/ShowSettings',
      success: (res) => {
        if (res.code == 0) {
          this.setData({
            setting: res.data
          });
        }
      }
    });
  },
  onSwitchChange(event) {
    let str = "setting." + event.currentTarget.dataset.name;
    this.setData({
      [str]: event.detail.value?1:0
    });
    util.requestWithToken({
      url: 'Memo/ShowSettingsEidt',
      data:{
        ...this.data.setting
      },
      method:"POST",
      message:"设置中...",
      success: (res) => {
        if (res.code == 0) {
          
        }
      }
    });
    
  },
})