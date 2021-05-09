// pages/cart/index.js
import {getSetting, chooseAddress, openSetting, showModal, showToast} from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../library/runtime/runtime';
Page({


  data: {
    address:{},
    cart:{},
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function () {
    // 获得地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的数组
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      address
    })
    this.cartRefresh(cart);
  },

  onLoad: function (options) {

  },
  // 刷新
  cartRefresh(cart){
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    })
    if(!cart.length) {
      allChecked = false;
    }
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart", cart);
  },

  // 收货地址点击
  async handleChooseAddress(){
    // 获取权限
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    // 判断权限
    if (scopeAddress === false){
      await openSetting();
    }
    // const res2  = await chooseAddress();
    const address = await chooseAddress();
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
    wx.setStorageSync('address', address);
  },

  // 商品选中
  handelItemChange(e){
    // 接收商品id
    const goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到被修改的商品
    let index = cart.findIndex(v => v.goods_id===goods_id);
    // 选中状态取反
    cart[index].checked = !cart[index].checked;
    this.cartRefresh(cart);
  },

  // 全选
  handleItemAllCheck(){
    // 获取cart和allChecked
    let {cart, allChecked} = this.data;
    // 取反
    allChecked = !allChecked;
    // 循环取反
    cart.forEach(v => v.checked = allChecked);
    this.cartRefresh(cart);
  },

  //数量编辑
  async handleItemEdit(e){
    // 获取参数
    const {id, operation} = e.currentTarget.dataset;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到修改的索引
    const index = cart.findIndex(v => v.goods_id===id);
    // 判断修改
    if(cart[index].num===1 && operation===-1){
      const res = await showModal({content: "是否需要删除改商品？"});
      if(res.confirm){
        cart.splice(index, 1);
        this.cartRefresh(cart);
      }
    }else{
      cart[index].num += operation;
      this.cartRefresh(cart);
    }
    // 设置回缓存
  },

  // 结算点击事件
  async handlePay(){
    // 判断收货地址
    const {address} = this.data;
    if(!this.data.address.userName){
      await showToast({title: "您还没有选择收货地址！"});
      return;
    }
    if(this.data.totalNum === 0){
      await showToast({title: "您还没有选购商品"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})