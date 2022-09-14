// pages/my/message/message.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		doctor:{},
		patId:'',
		datetime:'',
		time:'',
		doctorId:'',
		depTwoId:'',
		dia:'',
		reg:'',
		hosId:'',
		hosName:'',
		depName:'',
		patName:'',
		price:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			patId:options.patId,
			datetime:options.datetime,
			time:options.time,
			doctorId:options.doctorId,
			depTwoId:options.depTwoId,
			dia:options.dia,
			reg:options.reg,
			hosId:options.hosId,
			hosName:options.hosName,
			type:options.type,
			patName:options.patName,
			depName:options.depName,
			price:Number(options.dia) + Number(options.reg)
		})
		

		let token = wx.getStorageSync('token')
		wx.showLoading({
		  title: '加载中...',
		})
		wx.request({
			url: this.data.url + `/simple/getDoctorInfo?id=${options.doctorId}`,
			header: {
				'Authorization': token
			},
			success:(result)=>{
				wx.hideLoading()
			   this.setData({
				   doctor:result.data.data[0]
			   })
		   }
		})
	},
	readUigo(){
		wx.navigateTo({
		  url: './notice/notice',
		})
	},
	post(){
		let obj = { ...this.data };
		 obj.doctor = '';
		obj.url = '';
		let token = wx.getStorageSync('token')
		wx.showLoading({
		  title: '提交中...',
		})
		console.log(this.data.url)
		wx.request({
			url: this.data.url + `/make/createMake`,
			method:'post',
			data:obj,
			header: {
				'Authorization': token
			},
			success:(result)=>{
				wx.hideLoading()
			   if(result.data.code == 200){
					wx.navigateTo({
					  url: './complete/complete',
					})
			   }else{
				   wx.showToast({
					 title: result.data.msg,
					 icon:'error'
				   })
			   }
		   },
		   fail:(err)=>{
				console.log(err);
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