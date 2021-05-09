export const request=(params)=>{
    //定义公共的url
    const baseUrl = "http://127.0.0.1:5050"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (res)=>{
                resolve(res);
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}