export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
          success: (result) => {
              resolve(result);
          },
          fail: (err) => {
              reject(err);
          }
        });
    })
}

export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
          success: (result) => {
              resolve(result);
          },
          fail: (err) => {
              reject(err);
          }
        });
    })
}

export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
          success: (result) => {
              resolve(result);
          },
          fail: (err) => {
              reject(err);
          }
        });
    })
}

export const showModal = ({content}) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title:'提示',
            content: content,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
          })
    })
}

export const showToast = ({title}) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
          })
    })
}

// 登录,用于获取code和session-key
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
          })
    })
}

export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
          })
    })
}

