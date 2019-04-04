//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    newList:[{
      current:0,
      isCollect: false,
      isNote: true,
      name:"加百列的坟墓",
      storeName:"狐步舞Foxtrot洋装店",
      type:[{
        name:"jsk+马甲set",
        imgs: ["../../https/11.jpg", "../../https/11.jpg", "../../https/11.jpg"]
      }, {
          name: "马甲",
          imgs: ["../../https/11.jpg", "../../https/11.jpg", "../../https/11.jpg"]
        }, {
          name: "手袖",
          imgs: ["../../https/11.jpg", "../../https/11.jpg"]
        }, {
          name: "设计图",
          imgs: ["../../https/41.jpg", "../../https/41.jpg"]
        }]
    },
      {
        current: 0,
        isCollect:true,
        isNote: false,
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
          },{
            name: "KC",
            imgs: ["../../https/241.jpg"]
          }, {
          name: "设计图",
            imgs: ["../../https/253.jpg", "../../https/253.jpg", "../../https/253.jpg"]
          }, {
            name: "饼图",
            imgs: ["../../https/261.jpg", "../../https/261.jpg", "../../https/261.jpg", "../../https/261.jpg"]
          }]
      },]
  },
  preview(){
      wx.previewImage({
        current: '../../https/241.jpg', // 当前显示图片的http链接
        urls: ["../../https/11.jpg", "../../https/241.jpg", "../../https/261.jpg", "../../https/261.jpg"] // 需要预览的图片http链接列表
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
