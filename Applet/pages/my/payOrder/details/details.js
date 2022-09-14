// pages/my/message/message.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		item:{},
		id:'',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		
		this.setData({
			id:options.id
		})
		let token = wx.getStorageSync('token')
		wx.showLoading({
		  title: '加载中...',
		})
		wx.request({
		  url: this.data.url + `/order/userPayOrderInf?orderId=${this.data.id}`,
		  header: {
			'Authorization': token
		   },
		   success:(res)=>{
			   wx.hideLoading()
				if(res.data.code == 200){
					this.setData({
						item:res.data.data[0]
					})
				}else if(res.data.code == 403){
					getApp().notPermission()
				}else{
					wx.showToast({
					  title: res.data.msg,
					  icon:'error'
					})
				}
		   },
		   fail:(err)=>{
			   wx.showToast({
				 title: '请检查网络连接',
				 icon:'error'
			   })
		   }
		})
	},
	cancel(){
		//支付失败问题

		let that = this;
		wx.showLoading({
			title: '缴费中...',
		})
		let token = wx.getStorageSync('token')
		wx.request({
			url:that.data.url + '/order/paymentOrder',
			method:'post',
			data:{
				orderId:that.data.id
			},
			header: {
				'Authorization': token
			},success:(rest)=>{
				wx.hideLoading()
				if(rest.data.code == 200){
					let obj = that.data.item
					obj.state = 1;
					that.setData({
						item:obj
					})
					wx.showToast({
						title: '缴费成功',
					})
				}else{
					wx.showToast({
						title: rest.data.msg,
						icon:'error'
					})
				}
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