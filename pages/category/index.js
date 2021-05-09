// pages/category/index.js
import { request } from "../../request/index3.js"
Page({
  /**
   * 页面的初始数据
   */
   data: {
    leftMenuList:[],
    rightContent:[],
    //被点击的左菜单
    currentIndex:0,
    scrollTop:0
  },
  //接口返回数据
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
  },
  getCates(){
    request({url:"/categories"})
    .then((res) => {
        this.Cates = res.data.message;
        //
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
    })
  },
  //左菜单点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })

  }
})