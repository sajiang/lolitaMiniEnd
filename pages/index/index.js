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
    util.requestWithToken({
      url: 'Product/List', 
      data: {
        page: this.data.pageIndex,
        pageSize: '3'
      },
      success:(res)=> {
        if(res.code==0){
          let list = res.data.list;
          for(let item of list){
            item.current=0;
          }
          this.setData({
            memo_count: res.data.memo_count,
            colect_count: res.data.colect_count,
            newList: this.data.newList.concat(list),
            pageIndex: ++this.data.pageIndex
          });
        }
      }
    });
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
      util.requestWithToken({
        url:"Collect/Create",
        method:"POST",
        message:"正在安排...",
        data: event.currentTarget.dataset.id,
        success:(res)=>{
          if(res.code==0){
            var str = `newList[${event.currentTarget.dataset.idx}].iscollect`;
            var collecnum = `newList[${event.currentTarget.dataset.idx}].collecnum`;
            this.setData({
              [str]: !this.data.newList[event.currentTarget.dataset.idx].iscollect,
              [collecnum]: this.data.newList[event.currentTarget.dataset.idx].iscollect == 0 ? (this.data.newList[event.currentTarget.dataset.idx].iscollect + 1) : (this.data.newList[event.currentTarget.dataset.idx].iscollect - 1),
              colect_count: this.data.newList[event.currentTarget.dataset.idx].iscollect == 0 ? (this.data.colect_count + 1) : (this.data.colect_count - 1)
            })
          }
        }
      })
      
    });
  },
  note(event){
    let isAuth = this.selectComponent("#isAuth");
    isAuth.checkAuth().then(() => {
      var str = `newList[${event.currentTarget.dataset.idx}].isnote`;
      if (this.data.newList[event.currentTarget.dataset.idx].isnote==1){
        //取消备注
        util.requestWithToken({
          url: `Memo/Delete/${this.data.newList[event.currentTarget.dataset.idx].memoid}`,
          method: "DELETE",
          success: (res) => {
            this.setData({
              [str]: 0,
              memo_count: --this.data.memo_count
            });
          }
        })
        
      }else{
        this.setData({
          [str]: 1,
          memo_count: ++this.data.memo_count
        });
        wx.navigateTo({
          url: '../notifySetting/notifySetting?id=' + this.data.newList[event.currentTarget.dataset.idx].id,
        })
      }
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
