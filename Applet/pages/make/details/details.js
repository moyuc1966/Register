// pages/my/message/message.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		item:{},
		id:'',
		doctor:{}
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
		  url: this.data.url + `/make/getMakeInf?id=${this.data.id}`,
		  header: {
			'Authorization': token
		   },
		   success:(res)=>{
			   wx.hideLoading()
				if(res.data.code == 200){
					wx.request({
						url: this.data.url + `/simple/getDoctorInfo?id=${res.data.rows[0].doctorId}`,
						header: {
							'Authorization': token
						},
						success:(result)=>{
							let arr = res.data.rows[0];
							arr.idCard = arr.idCard.slice(0, 4) + "*******" + arr.idCard.slice(arr.idCard.length - 4);
						   this.setData({
							   item:arr,
							   doctor:result.data.data[0]
						   })
					   }
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
		let that = this;
		wx.showModal({
			title: '确定要取消预约吗？',
			editable:true,
			placeholderText:'请输入取消原因',
			success (res) {
			  if (res.confirm) {
				  if(res.content != ''){
					  wx.showLoading({
						title: '取消中...',
					  })
					let token = wx.getStorageSync('token')
					wx.request({
						url:that.data.url + '/make/cancelMake',
						method:'post',
						data:{
							id:that.data.item.id,
							remarks:res.content
						},
						header: {
							'Authorization': token
						},success:(rest)=>{
							wx.hideLoading()
							if(rest.data.code == 200){
								let obj = that.data.item
								obj.state = 2;
								obj.remarks = res.content
								that.setData({
									item:obj
								})
								wx.showToast({
								  title: '已取消',
								})
							}else{
								wx.showToast({
								  title: rest.data.msg,
								  icon:'error'
								})
							}
						}
					})
				  }else{
					  wx.showToast({
						title: '请输入取消原因',
						icon:'error'
					  })
				  }
			  } else if (res.cancel) {
				
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