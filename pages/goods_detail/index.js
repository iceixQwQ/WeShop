// pages/goods_detail/index.js
/*
  1 发送请求获取数据
  2 点击轮播图预览大图
      1 轮播图点击事件
      2 调用previewImage
  3 点击加如购物车
    1 绑定事件
    2 获取缓存中的购物车数据 数组格式
    3 先判断商品是否已经存在于购物车中
    4 已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组填充回缓存中
    5 不存在于购物车数组 直接给购物车数组添加一个新元素 新元素带上购买数量属性 num 重新把购物车数组填充回缓存中
    6 弹出提示
*/
import { request } from "../../request/index3.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },

  GoodsInfo:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodDetail(goods_id);
  },

  // 获取商品详情数据
  getGoodDetail(goods_id){
    request({url:"goods/detail", data: {goods_id}})
    .then((res) => {
      const goodsObj = res.data.message;
      this.GoodsInfo = goodsObj;
      this.setData({
        goodsObj: {
          goods_name: goodsObj.goods_name,
          goods_price: goodsObj.goods_price,
          //iphone部分手机不识别webp
          goods_introduce: goodsObj.goods_introduce.replace('/\.webp/g','.jpg'),
          pics : goodsObj.pics
        }
      })
    })
  },

  // 点击放大轮播图
  hadlePreviewImage(e){
    // 构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 接收参数
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,
      urls: urls
    })
  },

  // 加入购物车
  handleCartAdd(){
    // 获取缓存中的购物车数据 数组格式
    let cart = wx.getStorageSync("cart")||[];
    // 先判断商品是否已经存在于购物车中
    let index = cart.findIndex(v => v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      // 不存在于购物车数组
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      // 已经存在
      cart[index].num++;
    }
    // 重新把购物车数组填充回缓存中
    wx.setStorageSync("cart", cart);
    // 弹出提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1000,
      mask: true
    });
  }
})