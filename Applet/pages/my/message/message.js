// pages/my/message/message.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		list:[]
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
		  url: this.data.url + '/simple/getMessageList',
		  header: {
			'Authorization': token
		   },
		   success:(res)=>{
			   wx.hideLoading()
				if(res.data.code == 200){
					let arr = res.data.data;
					arr.forEach(item=>{
						item.timeago = this.timeago(new Date(item.time));
					})
					this.setData({
						list:arr
					})
				}else if(res.data.code == 403){
					// getApp().notPermission()
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
	uigo(e){
		if(e.currentTarget.dataset.type == '预约成功'){
			wx.showLoading({
			  title: '加载中...',
			})
			let token = wx.getStorageSync('token')
			wx.request({
			  url: this.data.url +`/simple/messageRead/${e.currentTarget.dataset.id}`,
			  header: {
				'Authorization': token
			   },
			   success:(res)=>{
				   wx.hideLoading()
				   if(res.data.code == 200){
					   wx.navigateTo({
						 url: `../../make/details/details?id=${e.currentTarget.dataset.makeid}`,
					   })
				   }else{
					   wx.showToast({
						 title: '出现错误',
						 icon:'error'
					   })
				   }
			   }
			})
		}else{
			wx.navigateTo({
			  url: `./content/content?id=${e.currentTarget.dataset.id}`,
			})
		}
	},

	//处理时间为几天前，几小时前的格式，通过遍历使用此函数，wxs无法使用new Date，wxml文件无法使用函数
	timeago(dateTimeStamps){
		var result;
		var dateTimeStamp = new Date(dateTimeStamps)
		var minute = 1000 * 60;      
		var hour = minute * 60;
		var day = hour * 24;
		var week = day * 7;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime(); 
		var diffValue = now - dateTimeStamp;//时间差
		if(diffValue < 0){
			return;
		}
		var minC = diffValue/minute; 
		var hourC = diffValue/hour;
		var dayC = diffValue/day;
		var weekC = diffValue/week;
		var monthC = diffValue/month;
		if(monthC >= 1 && monthC < 4){
			result = " " + parseInt(monthC) + "月前"
		}else if(weekC >= 1 && weekC < 4){
			result = " " + parseInt(weekC) + "周前"
		}else if(dayC >= 1 && dayC < 7){
			result = " " + parseInt(dayC) + "天前"
		}else if(hourC >= 1 && hourC < 24){
			result = " " + parseInt(hourC) + "小时前"
		}else if(minC >= 1 && minC < 60){
			result =" " + parseInt(minC) + "分钟前"
		}else if(diffValue >= 0 && diffValue <= minute){
			result = "刚刚"
		}else {
			var datetime = new Date();
			datetime.setTime(dateTimeStamp);
			var Nyear = datetime.getFullYear();
			var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
			var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
			var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
			var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
			var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
			result = Nyear + "-" + Nmonth + "-" + Ndate
		}
		return result;
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
		let token = wx.getStorageSync('token')
		wx.request({
			url: this.data.url + '/simple/getMessageList',
			header: {
			  'Authorization': token
			 },
			 success:(res)=>{
				 wx.hideLoading()
				  if(res.data.code == 200){
					let arr = res.data.data;
					arr.forEach(item=>{
						item.timeago = this.timeago(new Date(item.time));
					})
					this.setData({
						list:arr
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