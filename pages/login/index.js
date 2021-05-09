// pages/login/index.js
import { login, getUserProfile } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../library/runtime/runtime';
import { request_origin } from '../../request/index3'

Page({
  data: {
  },
  async handleGetUserInfo(){
    // 获取userInfo
    const { userInfo } = await getUserProfile();
    // 获取用户openID
    let { code } = await login();
    let [ appID, appSecret ] = ['wx4f3e8c546e00d2a6', '0f19f9e721502d0f06f2200529de0208'];
    const res = await request_origin({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      method: 'GET',
      data: {
        appid: appID,
        secret: appSecret,
        js_code: code,
        grant_type: 'authorization_code',
      }
    });
    // 为userInfo添加openid、session_key
    const { openid, session_key } = res.data;
    userInfo.openid = openid;
    userInfo.session_key = session_key;
    // 将userInfo存入缓存
    wx.setStorageSync('userInfo', userInfo);
    wx.navigateBack({
      delta: 1,
    });
  }
})