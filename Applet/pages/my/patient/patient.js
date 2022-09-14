// pages/my/message/message.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		patList: [],
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
			url: this.data.url + '/user/patientList',
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					this.setData({
						patList: res.data.data
					})
				} else {
					wx.showToast({
						title: res.data.msg,
						icon: 'error'
					})
				}
			},
			fail: (err) => {
				wx.hideLoading()
				wx.showToast({
					title: '请检查网络连接',
					icon: 'error'
				})
			}
		})
	},
	changeValue(e) {
		if(this.data.patList[e.currentTarget.dataset.index].isdefault == 1 && e.detail.value == false) { 
			let arr = this.data.patList
			arr[e.currentTarget.dataset.index].isdefault = 1
			this.setData({
				patList:arr
			})
			wx.showToast({
				title: '至少有一位默认就诊人',
				icon:'none'
			})
			return;
	}
		wx.vibrateShort();

		wx.showLoading({
			title: '切换中...',
		})
		let token = wx.getStorageSync('token')
		wx.request({
			url: this.data.url + `/user/patientModDef`,
			method: 'post',
			data: {
				id: this.data.patList[e.currentTarget.dataset.index].id
			},
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					let arr = this.data.patList
					arr.forEach((item, index) => {
						arr[index].isdefault = 2
					})
					arr[e.currentTarget.dataset.index].isdefault = 1
					this.setData({
						patList: arr
					})
					wx.showToast({
						title: res.data.msg,
					})
				} else {
					wx.showToast({
						title: res.data.msg,
						icon: 'error'
					})
				}
			}
		})
	},
	uigo(e) {
		  wx.navigateTo({
			url: `./info/info?id=${e.currentTarget.dataset.id}`,
		  })
	},
	add() {
		  wx.navigateTo({
			url: `./info/info`,
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
		let token = wx.getStorageSync('token')
		wx.showLoading({
			title: '加载中...',
		})
		wx.request({
			url: this.data.url + '/user/patientList',
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					this.setData({
						patList: res.data.data
					})
				} else {
					wx.showToast({
						title: res.data.msg,
						icon: 'error'
					})
				}
			},
			fail: (err) => {
				wx.hideLoading()
				wx.showToast({
					title: '请检查网络连接',
					icon: 'error'
				})
			}
		})
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