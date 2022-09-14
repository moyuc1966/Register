// pages/sign/sign.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url:getApp().globalData.$url,
		password:'',
		newpassword:'',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.url = getApp().globalData.$url;
	},
	into(){
		if(this.data.newpassword=="" || this.data.password == '') return wx.showToast({
		  title: '请输入完整',
		  icon:'error'
		})
		wx.showLoading({
		  title: '修改中..',
		})
		let token = wx.getStorageSync('token')
		wx.request({
		  url: this.data.url + '/modify/userModPass',
		  method:'post',
		  header: {
			'Authorization': token
		},
		  data:{
			newpass:this.data.password
		  },
		  success:(res)=>{
			  wx.hideLoading()
			  if(res.data.code == 200){
				  wx.showToast({
					title: '修改成功',
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