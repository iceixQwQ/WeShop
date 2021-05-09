// pages/goods_list/index.js
import { request } from "../../request/index3.js"
Page({
  data: {
    tabs:[
    {
      id: 0,
      value: "综合",
      isActive: true
    },
    {
      id: 1,
      value: "销量",
      isActive: false
    },
    {
      id: 2,
      value: "价格",
      isActive: false
    }
  ],
  QueryParams:{
    query:"",
    cid: 0,
    pagenum:1,
    pagesize: 10
  },
  goodsList: [],
  totalPages: 1
  },
  
  onLoad: function (options) {
    this.data.QueryParams.cid = options.cid;
    this.getGoodsList();

    wx.showLoading({
      title: '加载中',
    });

    setTimeout(() => {
      wx.hideLoading()
    }, 300);
    
  },
  // 获取商品列表
  getGoodsList(){
    request({url:"/goods/search", data: this.data.QueryParams})
    .then((res) => {
      const total = res.data.message.total;
      this.data.totalPages = Math.ceil(total / this.data.QueryParams.pagesize);
      this.setData({
        goodsList: [...this.data.goodsList, ...res.data.message.goods]
      })
      wx.stopPullDownRefresh();
    })
  },

  //标题点击事件
  handleTabsItemChange(e){
    // 获取索引
    const {index} = e.detail;
    // 修改原素组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index? v.isActive=true: v.isActive=false);
    //
    this.setData({
      tabs
    })
  },
  // 滚动条触事件
  onReachBottom(){
    //有无下页数据
    if(this.data.QueryParams.pagenum >= this.data.totalPages){
      wx.showToast({
        title: '到底咯！！！',
      })
    }else{
      this.data.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    // 重置数组
    this.setData({
      goodsList:[]
    });
    // 重置页码
    this.data.QueryParams.pagenum=1;
    // 发送请求
    this.getGoodsList();
  }
})