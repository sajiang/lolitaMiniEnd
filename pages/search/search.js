// pages/search/search.js
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord:"",
    searchType:[{
      name:"标签"
    }, {
      name: "店名"
    }, {
      name: "名称"
    }],
    currentPage:1,
    curTypeIdx:2,
    typeShow:false,
    searchList: [],
    tagList: [],
    maxPage:1,
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
    this.getOnePage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showSelectType(){
    this.setData({
      typeShow:true,
    })
  },
  changeType({ detail }){
    this.setData({
      curTypeIdx: detail.index,
      typeShow:false,
      searchList:[],
      keyWord:"",
    });
  },
  handleCancel(){
    this.setData({
      typeShow: false,
    });
  },
  searchKeyword(e){
    this.setData({
      keyWord: e.detail.value
    });
    util.requestWithToken({
      url: 'Product/Search',
      data:{
        type:this.data.curTypeIdx,
        keyWord: e.detail.value
      },
      success: (res) => {
        if (res.code == 0) {
          this.setData({
            searchList:res.data
          })
        }
      }
    });
  },
  getDetail({ currentTarget}){
    this.setData({
      keyWord: currentTarget.dataset.name,
      currentPage: 1,
      searchList: [],
      tagList:[],
      maxPage:1,
    },()=>{
      this.getOnePage();
    });
  },
  getOnePage(){
    if (this.data.maxPage<this.data.currentPage){
      return;
    }
    util.requestWithToken({
      url: 'Product/DetailsList',
      data: {
        type: this.data.curTypeIdx, //0标签 1店名
        name: this.data.keyWord,
        page: this.data.currentPage,
        pageSize: 6
      },
      success: (res) => {
        if (res.code == 0) {
          this.setData({
            tagList: this.data.tagList.concat(res.data.list),
            currentPage: ++this.data.currentPage,
            maxPage:res.data.pages
          });
        }
      }
    });
  }
})