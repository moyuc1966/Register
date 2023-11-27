// pages/my/message/message.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		order:{},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let token = wx.getStorageSync('token')
		wx.showLoading({
		  title: '加载中...',
		})
		wx.request({
		  url: this.data.url + `/order/userRecInf?orderId=${options.id}`,
		  header: {
			'Authorization': token
		   },
		   success:(res)=>{
			   wx.hideLoading()
				if(res.data.code == 200){
					this.setData({
						order:res.data.data[0],
					})
				}else{
					wx.showToast({
					  title: res.data.msg,
					  icon:'error'
					})
				}
		   },
		   fail:(err)=>{
			wx.hideLoading()
			   wx.showToast({
				 title: '请检查网络连接',
				 icon:'error'
			   })
		   }
		})
	},
	copy(e){
		wx.setClipboardData({
			data: e.currentTarget.dataset.id,
			success: function (res) {
			  wx.getClipboardData({
				success: function (res) {
				  wx.showToast({
					title: '复制成功'
				  })
				}
			  })
			}
		  })
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})