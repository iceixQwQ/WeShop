// pages/cart/index.js
import {getSetting, chooseAddress, openSetting, showModal, showToast} from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../library/runtime/runtime';
Page({


  data: {
    address:{},
    cart:{},
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function () {
    // 获得地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的数组
    let cart = wx.getStorageSync('cart') || [];
    // 过滤后的购物车
    cart = cart.filter(v => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num*v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    })
  },

  // 支付点击事件
  handleOderPay(){
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
  }
})