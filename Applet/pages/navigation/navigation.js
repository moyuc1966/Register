// pages/navigation/navigation.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list:[],
		url:getApp().globalData.$url
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.showLoading({
		  title: '获取中..',
		})
		wx.request({
		  url: this.data.url + '/api/navigation',
		  success:(res)=>{
			  wx.hideLoading()
			  if(res.data.code == 200){
				  this.setData({
					  list:res.data.data
				  })
			  }else{
				wx.hideLoading()
				wx.showToast({
				  title: '请检查网络连接',
				})
			  }
		  }
		})
	},
	uigo(id){
		wx.navigateTo({
		  url: `./details/details?id=${id.currentTarget.dataset.id}`,
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