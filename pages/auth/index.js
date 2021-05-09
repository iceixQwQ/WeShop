// pages/auth/index.js
import { login } from '../../utils/asyncWx.js';
import { request } from '../../request/index3';
import regeneratorRuntime from '../../library/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handleGetUserInfo(e){
    try{
          // 获取用户信息
    const {encryptedData,rawData,iv,signature} = e.detail;
    // 获取向程序登陆成功后的code值
    const { code } = await login();
    const loginParams = {
      encryptedData,rawData,iv,signature,code
    }
    let { token } = await request({url: "/users/wxlogin", data:loginParams, method: "POST"});
    console.log(token);
    token = "123123sadafqwqwdasdqw";
    wx.setStorageSync('token', token);
    wx.navigateBack({
      delta: 1
    });
    }catch(err){
      console.log(err);
    }

  }

})