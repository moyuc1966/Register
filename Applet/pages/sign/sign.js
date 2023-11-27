// pages/sign/sign.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url:getApp().globalData.$url,
		issign:true,
		username:'',
		password:'',
		newpassword:'',
		name:'',
		phone:'',
		emile:'',
		age:"",
		gender:0,
		ageRadio:[
			{name:'男',value:'0'},
			{name:'女',value:'1'}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.url = getApp().globalData.$url;
	},
	change(){
		let is = !this.data.issign
		this.setData({
			issign: is
		})
	},
	radioChange(e){
		let map = {'男':0,'女':1}
		this.setData({
			gender:map[e.detail.value]
		})
	},
	into(){
		if(this.data.username=="" || this.data.password == '') return wx.showToast({
		  title: '请输入完整',
		  icon:'error'
		})
		wx.showLoading({
		  title: '身份验证中..',
		})
		wx.request({
		  url: this.data.url + '/api/userLogin',
		  method:'post',
		  data:{
			  username:this.data.username,
			  password:this.data.password
		  },
		  success:(res)=>{
			  wx.hideLoading()
			  if(res.data.code == 200){
				  wx.showToast({
					title: '登录成功',
				  })
				  wx.setStorageSync('token', 'Bearer ' + res.data.token);
				  wx.reLaunch({
					url: '/pages/my/my',
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
	register(){
		
		if(this.data.username=="" || this.data.password == '' || this.data.newpassword == ''
		|| this.data.name=="" || this.data.phone=="" || this.data.email=='' || this.data.age == "") return wx.showToast({
			title: '请输入完整',
			icon:'error'
		  })
		  if(this.data.password != this.data.newpassword) return wx.showToast({
			title: '两次密码不一致',
			icon:'error'
		  })
		  wx.showLoading({
			title: '注册中...',
		  })
		  let data = {
			  email:this.data.emile,
			  username:this.data.username,
			  password:this.data.password,
			  name:this.data.name,
			  gender:this.data.gender,
			  phone:this.data.phone,
			  age:this.data.age
		  }
		  wx.request({
			url: this.url + '/api/userReg',
			method:'post',
			data:data,
			success:(res)=>{
				console.log(res)
				wx.hideLoading()
				if(res.data.code == 200) {
					wx.showToast({
					title: '注册成功',
					})
					this.setData({
						issign:true
					})
				} else{
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
	seek(){
		wx.navigateTo({
		  url: './seek/seek',
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