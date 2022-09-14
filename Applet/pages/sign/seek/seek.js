// pages/sign/seek/seek.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		email:'',
		url:getApp().globalData.$url,
		isemail:true,
		iscode:false,
		ispass:false,
		password:'',
		newpassword:'',
		code:''
	},
	into(){
		if(this.data.email == '') return wx.showToast({
		  title: '请输入邮箱',
		  icon:'error'
		})
		wx.showLoading({
			title: '发送中...',
		  })
		wx.request({
		  url: this.data.url + '/api/seek/retpass',
		  method:'post',
		  data:{
			email:this.data.email
		  },
		  success:(res)=>{
			  wx.hideLoading()
			if(res.data.code == 200){
				wx.showToast({
				  title: '验证码发送成功',
				})
				this.setData({
					isemail:false,
					iscode:true,
					ispass:false
				})
			}else{
				wx.showToast({
				  title: res.data.msg,
				  icon:'error'
				})
			}
		  }
		})
	},
	vercode(){
		if(this.data.code == '') return wx.showToast({
			title: '请输入验证码',
			icon:'error'
		  })
		  wx.showLoading({
			title: '验证中...',
		  })
		  wx.request({
			url: this.data.url + '/api/seek/confirm',
			method:'post',
			data:{
			  email:this.data.email,
			  code:this.data.code
			},
			success:(res)=>{
				wx.hideLoading()
			  if(res.data.code == 200){
				  wx.showToast({
					title: '身份验证成功',
				  })
				  this.setData({
					  isemail:false,
					  iscode:false,
					  ispass:true
				  })
			  }else{
				  wx.showToast({
					title: res.data.msg,
					icon:'error'
				  })
			  }
			}
		  })
	},
	modpass(){
		if(this.data.password == '' || this.data.newpassword == '') return wx.showToast({
			title: '请输入完整',
			icon:'error'
		  })
		  if(this.data.password != this.data.newpassword) return wx.showToast({
			title: '两次密码不一致',
			icon:'error'
		  })
		  wx.showLoading({
			title: '重置中...',
		  })
		  wx.request({
			url: this.data.url + '/api/seek/modpass',
			method:'post',
			data:{
			  email:this.data.email,
			  password:this.data.password,
			  code:this.data.code
			},
			success:(res)=>{
				wx.hideLoading()
			  if(res.data.code == 200){
				  wx.showModal({
					title: '提示',
					content: '密码已重置成功，请牢记您的新密码',
					success (res) {
					  if (res.confirm) {
						wx.navigateBack({
						  delta: 1,
						})
					  } else if (res.cancel) {
						wx.navigateBack({
							delta: 1,
						  })
					  }
					}
				  })
			  }else{
				  wx.showToast({
					title: res.data.msg,
					icon:'error'
				  })
			  }
			}
		  })
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

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