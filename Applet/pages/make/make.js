// pages/my/message/message.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		defPat:{},
		patList:[],
		orderList:[],
		name:'',
		relation:'',
		certificate:'',
		type:'my'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			type:options.type?'index':'my'
		})
		let token = wx.getStorageSync('token')
		wx.showLoading({
		  title: '加载中...',
		})
		wx.request({
		  url: this.data.url + '/user/patientList?def=yes',
		  header: {
			'Authorization': token
		   },
		   success:(res)=>{
				if(res.data.code == 200 && res.data.data.length > 0){
					this.setData({
						defPat:res.data.data[0],
						name:res.data.data[0].name,
						relation:res.data.data[0].relation,
						certificate:res.data.data[0].certificate,
					})
					let url =   this.data.url + `/make/userGetList?patId=${res.data.data[0].id}`;
					if(this.data.type == 'index') url =   this.data.url + `/make/userGetList?patId=${res.data.data[0].id}&state=0`
					wx.request({
						url: url,
						header: {
						  'Authorization': token
						 },
						 success:(res)=>{
							wx.hideLoading()
							  if(res.data.code == 200){
								  this.setData({
									  orderList:res.data.rows
								  })
							  }else{
								  wx.showToast({
									title: res.data.msg,
									icon:'error'
								  })
							  }
						 }
					  })
					  wx.request({
						url: this.data.url + '/user/patientList',
						header: {
						  'Authorization': token
						 },
						 success:(res)=>{
							 wx.hideLoading()
							  if(res.data.code == 200){
								  this.setData({
									  patList:res.data.data
								  })
							  }else{
								  wx.showToast({
									title: res.data.msg,
									icon:'error'
								  })
							  }
						 }
					  })
				}else if(res.data.code == 200 && res.data.data.length == 0){
					wx.hideLoading()
				}else if(res.data.code == 403){
					wx.hideLoading()
					getApp().notPermission()
				}else{
					wx.hideLoading()
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

	changeValue(e) {
		wx.showLoading({
		  title: '切换中...',
		})
		this.setData({
			defPat: this.data.patList[e.detail.value],
			name:this.data.patList[e.detail.value].name,
			relation:this.data.patList[e.detail.value].relation,
			certificate:this.data.patList[e.detail.value].certificate,
		})
		let token = wx.getStorageSync('token')
		let url = this.data.url + `/make/userGetList?patId=${this.data.patList[e.detail.value].id}`;
		if(this.data.type == 'index') url =  this.data.url + `/make/userGetList?patId=${this.data.patList[e.detail.value].id}&state=0`
		wx.request({
			url: url,
			header: {
			  'Authorization': token
			 },
			 success:(res)=>{
				 wx.hideLoading()
				  if(res.data.code == 200){
					  this.setData({
						  orderList:res.data.rows
					  })
					}else if(res.data.code == 204){
						this.setData({
							orderList:[]
						})
				  }else{
					  console.log(res.data)
					  wx.showToast({
						title: res.data.msg,
						icon:'error'
					  })
				  }
			 }
		  })
	  },
	  uigo(e){
		  wx.navigateTo({
			url: `./details/details?id=${e.currentTarget.dataset.id}`,
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