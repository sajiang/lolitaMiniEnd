import { $wuxCalendar } from '../../utils/plugin/wux/index'
const util = require("../../utils/util.js")
Page({
  data: {
    startDate: "",
    endDate: "",
    time1: "",
    time2:"",
    switch1: false,
    switch2: false,
    editPriceVisible:false,
    detailInfo:{},
  },
  onLoad(options) {
    this.getDetail(options.id)

  },
  getDetail(id){
    util.requestWithToken({
      url: 'Memo/QueryItems',
      data: {
        detailsId: id,
      },
      success: (res) => {
        if (res.code == 0) {
          this.setData({
            detailInfo:res.data,
            switch1: res.data.remind_starttime ? true : false,
            switch2: res.data.remind_endtime?true:false,
            startDate: res.data.remind_starttime? [res.data.remind_starttime.split(" ")[0]]:"",
            endDate: res.data.remind_endtime ? [res.data.remind_endtime.split(" ")[0]] : "",
            time1: res.data.remind_starttime ? res.data.remind_starttime.split(" ")[1].substr(0, 5) : "",
            time2: res.data.remind_endtime ?res.data.remind_endtime.split(" ")[1].substr(0, 5): "",
          });
        }
      }
    });
  },
  addItemNum(event){
    var str = `detailInfo.items[${event.currentTarget.dataset.idx}].reserve_num`;
    this.setData({
      [str]: ++this.data.detailInfo.items[ event.currentTarget.dataset.idx].reserve_num,
      "detailInfo.total_deposit": this.data.detailInfo.total_deposit + this.data.detailInfo.items[event.currentTarget.dataset.idx].earnest_money,
      "detailInfo.total_tail": this.data.detailInfo.total_tail + this.data.detailInfo.items[event.currentTarget.dataset.idx].tail_money,
    });
  },
  addNewItemNum(){
    this.setData({
      "detailInfo.newitem.reserve_num": ++this.data.detailInfo.newitem.reserve_num,
      "detailInfo.total_deposit": this.data.detailInfo.total_deposit + parseFloat(this.data.detailInfo.newitem.earnest_money),
      "detailInfo.total_tail": this.data.detailInfo.total_tail + parseFloat(this.data.detailInfo.newitem.tail_money),
    });
  },
  bindInput(e) {
    this.setData({
      [e.currentTarget.dataset.bindvalue]: e.detail.value
    });
  },
  clearZero(e){
    if (e.detail.value==0){
      this.setData({
        [e.currentTarget.dataset.bindvalue]: ""
      });
    }
  },
  createNewItem(){
    this.setData({
      "detailInfo.newitem.reserve_num": 1,
      "detailInfo.total_deposit": this.data.detailInfo.total_deposit + parseFloat(this.data.detailInfo.newitem.earnest_money),
      "detailInfo.total_tail": this.data.detailInfo.total_deposit + parseFloat(this.data.detailInfo.newitem.tail_money),
      editPriceVisible: false,
    });
  },
  addNote(){
    if(this.data.switch1){
      this.data.detailInfo.remind_starttime = this.data.startDate+" "+this.data.time1;
    }
    if (this.data.switch2) {
      this.data.detailInfo.remind_endtime = this.data.endDate + " " + this.data.time2;
    }
    if (this.data.detailInfo.newitem.reserve_num<1){
      this.data.detailInfo.newitem={};
    }
    util.requestWithToken({
      url: 'Memo/Create',
      method:"POST",
      data: this.data.detailInfo,
      success: (res) => {
        if (res.code == 0) {
          wx.navigateTo({
            url: '../note/note',
          })
        }
      }
    });
  },
  openCalendar(event) {
    $wuxCalendar().open({
      value: this.data[event.currentTarget.dataset.name],
      onChange: (values, displayValues) => {
        this.setData({
          [event.currentTarget.dataset.name]: displayValues,
        })
      },
    })
  },
  showEditPrice(){
    this.setData({
      editPriceVisible:true
    })
  },
  hideEditPrice(){
    this.setData({
      editPriceVisible: false
    })
  },
  onSwitchChange(event) {
    this.setData({
      [event.currentTarget.dataset.name]: event.detail.value
    })
  },
  bindTimeChange(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },
})