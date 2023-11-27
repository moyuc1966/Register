// pages/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url:getApp().globalData.$url,
		swiper:[],
		msgNum:0
	},
	swiperUigo:(id)=>{
		wx.navigateTo({
			url: `/pages/article/content/content?id=${id.currentTarget.dataset.patid}`,
		  })
	},
	message(){
		wx.navigateTo({
		  url: '../my/message/message',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showLoading({
		  title: '加载中...',
		})
		this.url = getApp().globalData.$url;
		wx.request({
		  url: this.url +'/api/swiper',
		  method:'get',
		  success:(res)=>{
			  wx.hideLoading()
			  this.setData({
				  swiper:res.data.data
			  })
			  let userId = wx.getStorageSync('userId')
				let token = wx.getStorageSync('token')
			  wx.request({
				url: this.url + `/simple/getMessageNum?userId=${userId}`,
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
		})
	},
	imageError($event) {
		let arr = this.data.swiper
		arr[$event.currentTarget.dataset.index].imgUrl = '../../image/bg.png';
		this.setData({
			swiper:arr
		})
	 },	

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		let userId = wx.getStorageSync('userId')
		let token = wx.getStorageSync('token')
			wx.request({
				url: this.url + `/simple/getMessageNum?userId=${userId}`,
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
	},
	course_uigo(){
		wx.navigateTo({
		  url: '/pages/course/course',
		})
	},
	articleUigo(e){
		wx.navigateTo({
		  url: `/pages/article/article?name=${e.currentTarget.dataset.name}`,
		})
	},
	navUigo(){
		wx.navigateTo({
		  url: '/pages/navigation/navigation',
		})
	},
	indexPay(){
		wx.navigateTo({
			url:'../my/payOrder/payOrder?type=index'
		})
	},
	indexMake(){
		wx.navigateTo({
			url:'../make/make?type=index'
		})
	},
	refund(){
		wx.navigateTo({
		  url: '../refund/refund',
		})
	},
	recharge(){
		wx.navigateTo({
			url: '../recharge/recharge',
		  })
	},
	make(){
		wx.navigateTo({
		  url: '../appointment/appointment',
		})
	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})