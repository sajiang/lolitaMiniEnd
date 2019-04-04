import { $wuxCalendar } from '../../utils/plugin/wux/index'

Page({
  data: {
    startDate: [],
    endDate: [],
    time:"",
    switch1: false,
    editPriceVisible:false,
  },
  onLoad() {
  },
  openCalendar(event) {
    const now = new Date();
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
})