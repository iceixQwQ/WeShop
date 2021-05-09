// pages/user/index.js
Page({


  data: {
    userInfo:{}
  },

  onShow: function (options) {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({userInfo});
  },
})