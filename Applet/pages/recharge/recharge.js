// pages/my/message/message.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		defPat:{},
		patList:[],
		name:'',
		relation:'',
		certificate:'',
		balance:'',
		money:'',
		index:1,
		money:50,
		zdy:'自定义'
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
						balance:Number(res.data.data[0].balance).toFixed(2)
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
		this.setData({
			defPat: this.data.patList[e.detail.value],
			name:this.data.patList[e.detail.value].name,
			relation:this.data.patList[e.detail.value].relation,
			certificate:this.data.patList[e.detail.value].certificate,
			balance:this.data.patList[e.detail.value].balance.toFixed(2),
			money:''
		})
	  },
	  post(){
		 let that = this;
		  wx.showLoading({
			title: '创建订单中...',
		  })
		  let token = wx.getStorageSync('token')
		  wx.request({
			url: this.data.url + '/order/patient/orderCreate',
			method:'post',
			data:{
				auantity:this.data.money,
				card:this.data.defPat.card,
				payType:'微信支付',
				patId:this.data.defPat.id
			},
			header: {
				'Authorization': token
			},
			success:(res)=>{
				wx.hideLoading()
				if(res.data.code == 200){
					wx.showModal({
						title: '模拟支付',
						content: '点击确定完成支付',
						success (rest) {
						  if (rest.confirm) {
							//完成支付后调用此函数
							pay(that.data.defPat.id,that.data.defPat.card,res.data.orderId)
						  } else if (rest.cancel) {
							wx.showToast({
							  title: '取消支付',
							  icon:'error'
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
		let pay = (patId,card,orderId)=>{
			wx.showLoading({
				title: '支付订单中...',
			  })
			  let token = wx.getStorageSync('token')
			  wx.request({
				url: this.data.url + '/user/patient/pay',
				method:'put',
				data:{
					card:card,
					orderId:orderId,
					patId:patId
				},
				header: {
					'Authorization': token
				},
				success:(res)=>{
					wx.hideLoading()
					if(res.data.code == 200){
						wx.showToast({
							title: '充值成功',
							duration: 2000,
							success: function () {
								setTimeout(function () {
									wx.navigateTo({
										url: '../my/recorder/recorder'
									  })
								}, 2000);
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
		}
	  },
	  setForm(){
		  if(this.data.balance <= 0) return
		this.setData({
			money:this.data.balance
		})
	  },
	  swit(){
		wx.navigateTo({
		  url: '../my/recorder/recorder',
		})
	  },
	  select(e){
		  let map = {1:50,2:100,3:200,4:500,5:1000}
		this.setData({
			index:e.currentTarget.dataset.index,
			money:map[e.currentTarget.dataset.index]
		})
		if(e.currentTarget.dataset.index == 6){
			let that = this;
			//点击取消重置数据
		wx.showModal({
			title: '请输入充值金额',
			editable:true,
			placeholderText:'请输入充值金额',
			success (res) {
				if(res.content == ''){
					wx.showToast({
					  title: '请输入金额',
					  icon:'error'
					})
					that.setData({
						money:50,
						index:1
					})
				}else if(Number(res.content) == NaN){
					wx.showToast({
						title: '请输入数值',
						icon:'error'
					  })
					  that.setData({
						money:50,
						index:1
					})
				}else{
					that.setData({
						money:res.content,
						zdy:res.content,
					})
				}
			}
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