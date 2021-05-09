import { request } from "../../request/index2.js"
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图数组
    swiperList:[],
    // 导航数组
    catesList:[]
    // 楼层数据

  },
    // 加载时的钩子
  onLoad() {
    this.getSwiperList();
    this.getCatesList();
  },
  getSwiperList(){
    request({url:"/getSwiperList"})
    .then((res) => {
      this.setData({
        swiperList: res.data
      })
    })
  },
  getCatesList(){
    request({url:"/getCatesList"})
    .then((res) => {
      this.setData({
        catesList: res.data
      })
    })
  }
})
