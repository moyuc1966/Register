// pages/my/my.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		isLogin: false,
		info: {},
		msgNum: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.showLoading({
			title: '加载中...',
		})
		this.url = getApp().globalData.$url;
		let token = wx.getStorageSync('token')
		wx.request({
			url: this.url + '/owner/information',
			method: 'get',
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					wx.setStorageSync('username', res.data.data.username);
					wx.setStorageSync('userId', res.data.data.id)
					this.setData({
						info: res.data.data,
						isLogin: true
					})
					wx.request({
						url: this.url + `/simple/getMessageNum?userId=${res.data.data.id}`,
						method: 'get',
						header: {
							'Authorization': token
						},
						success: (reslut) => {
							this.setData({
								msgNum: reslut.data.num == null ? 0 : reslut.data.num
							})
						}
					})
				} else {
					this.setData({
						isLogin: false
					})
				}
			}
		})
	},
	getInfo() {
		let token = wx.getStorageSync('token')
		wx.request({
			url: this.data.url + '/owner/information',
			method: 'get',
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					wx.setStorageSync('username', res.data.data.username);
					wx.setStorageSync('userId', res.data.data.id)
					this.setData({
						info: res.data.data,
						isLogin: true
					})
				} else {
					this.setData({
						isLogin: false
					})
				}
			}
		})
	},
	sing() {
		if (this.data.isLogin) {
			wx.navigateTo({
				url: './info/info',
			})
		} else {
			wx.navigateTo({
				url: '/pages/sign/sign',
			})
		}
	},
	feedback() {
		if (this.data.isLogin) {
			wx.navigateTo({
				url: './feedback/feedback',
			})
		}
	},
	out() {
		if (!this.data.isLogin) return
		let that = this
		wx.showModal({
			title: '提示',
			content: '确认退出登录吗？？？',
			success(res) {
				if (res.confirm) {
					wx.setStorageSync('token', '')
					that.setData({
						isLogin: false,
						info: {},
						msgNum: 0
					})
				} else if (res.cancel) {
					// console.log('用户点击取消')
				}
			}
		})
	},
	message() {
		if (this.data.isLogin) {
			wx.navigateTo({
				url: './message/message',
			})
		}
	},
	recorder() {
		if (this.data.isLogin) {
			wx.navigateTo({
				url: './recorder/recorder',
			})
		}
	},
	payOrder() {
		if (this.data.isLogin) {
			wx.navigateTo({
				url: './payOrder/payOrder',
			})
		}
	},
	make(){
		if(this.data.isLogin){
			wx.navigateTo({
			  url: '../make/make',
			})
		}
	},
	patient(){
		if(this.data.isLogin){
			wx.navigateTo({
			  url: './patient/patient',
			})
		}
	},
	refund(){
		if(this.data.isLogin){
			wx.navigateTo({
			  url: './refund/refund',
			})
		}
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
		this.getInfo()
		if (this.data.isLogin) {
			let userId = wx.getStorageSync('userId');
			let token = wx.getStorageSync('token')
			wx.request({
				url: this.data.url + `/simple/getMessageNum?userId=${userId}`,
				method: 'get',
				header: {
					'Authorization': token
				},
				success: (reslut) => {
					this.setData({
						msgNum: reslut.data.num == null ? 0 : reslut.data.num
					})
				}
			})
		}
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