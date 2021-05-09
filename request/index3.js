// 同时发送异步请求次数

let ajaxTimes = 0;
export const request = (params)=>{
    //加载中
    wx.showLoading({
        title: '加载中',
        mask: true
      });

    //定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        ajaxTimes++;
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (res)=>{
                resolve(res);
            },
            fail: (err)=>{
                reject(err);
            },
            complete: ()=>{
                //关闭
                ajaxTimes--;
                if(ajaxTimes===0)
                    wx.hideLoading()
            }
        });
    })
}

export const request_origin = (params)=>{
    //加载中
    wx.showLoading({
        title: '加载中',
        mask: true
      });

    return new Promise((resolve, reject) => {
        ajaxTimes++;
        wx.request({
            ...params,
            url: params.url,
            success: (res)=>{
                resolve(res);
            },
            fail: (err)=>{
                reject(err);
            },
            complete: ()=>{
                //关闭
                ajaxTimes--;
                if(ajaxTimes===0)
                    wx.hideLoading()
            }
        });
    })
}

