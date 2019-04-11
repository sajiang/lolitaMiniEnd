//index.js
//获取应用实例
const util = require("../../utils/util.js")
const app = getApp();
Page({
  data: {
    pageIndex:1,
    newList:[]
  },
  onLoad(){
    this.getList();
  },
  onReachBottom: function () {
    this.getList();
  },
  getList(){
    wx.request({
      url: util.url +'Product/List', 
      data: {
        page: this.data.pageIndex,
        pageSize: '3'
      },
      success:(res)=> {
        if(res.data.code==0){
          let list = res.data.data.list;
          for(let item of list){
            item.current=0;
          }
          this.setData({
            newList: this.data.newList.concat(list),
            pageIndex: ++this.data.pageIndex
          });
        }
      }
    })
    
  },
  preview(e){
    let idx=e.currentTarget.dataset.opIdx;
    let urls=[];
    for (let item of this.data.newList[idx].items){
      for (let img of item.itemimages){
        urls.push(img.imageurl)
      }
    }
    wx.previewImage({
      current: e.currentTarget.dataset.curImg, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  collect(event){
    let isAuth=this.selectComponent("#isAuth");
    isAuth.checkAuth().then(()=>{
      var str = `newList[${event.currentTarget.dataset.idx}].isCollect`;
      this.setData({
        [str]: !this.data.newList[event.currentTarget.dataset.idx].isCollect
      })
    });
  },
  note(event){
    let isAuth = this.selectComponent("#isAuth");
    isAuth.checkAuth().then(() => {
      
      var str = `newList[${event.currentTarget.dataset.idx}].isNote`;
      this.setData({
        [str]: !this.data.newList[event.currentTarget.dataset.idx].isNote
      });
      wx.navigateTo({
        url: '../notifySetting/notifySetting',
      })
    });
  },
  naviToNote() {
    let isAuth = this.selectComponent("#isAuth");
    isAuth.checkAuth().then(() => {
      wx.navigateTo({
        url: '../note/note',
      })
    });
  },
  naviToMyCollection(){
    let isAuth = this.selectComponent("#isAuth");
    isAuth.checkAuth().then(() => {
      wx.navigateTo({
        url: '../myCollection/myCollection',
      })
    });
  },
  naviToSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  naviToDetail(){
    wx.navigateTo({
      url: '../dressDetail/dressDetail',
    })
  },
  changeCurrentType(event){
    var str = `newList[${event.currentTarget.dataset.opIdx}].current`;
    this.setData({
      [str]: event.currentTarget.dataset.idx
    })
  }
})
