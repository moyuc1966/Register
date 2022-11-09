// pages/my/feedback/his/his.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list:[],
		url:getApp().globalData.$url,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.showLoading({
			title: '加载中...',
		  })
		  let token = wx.getStorageSync('token')
		  wx.request({
			url: this.data.url+'/feedback/my',
			method:'get',
			header: {
			  'Authorization': token
			},
			success:(res)=>{
				wx.hideLoading()
				this.setData({
					list:res.data.data
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