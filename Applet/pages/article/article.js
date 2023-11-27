// pages/article/article.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url:getApp().globalData.$url,
		name:'',
		list:[],
		and:'加载中..',
		page:1,
		limit:10,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let name = options.name
		this.setData({
			name:name,
			url:getApp().globalData.$url,
		})
		wx.setNavigationBarTitle({
			title: name
		})
		this.getInfo()
	},
	onReachBottom: function () {
		if(this.data.and == '没有更多了' || this.data.and == '加载中..'){
			return;
		}else{
			this.setData({
				page:this.data.page + 1
			})
			this.getInfo()
		}
	},

	getInfo(){
		let map = {'医院公告':'公告','文章分享':'分享','健康百科':'健康百科'};
		let token = wx.getStorageSync('token')
		wx.showLoading({
		  title: '加载中...',
		})
		wx.request({
		  url: this.data.url + `/api/article?page=${this.data.page}&limit=${this.data.limit}&cat=${map[this.data.name]}`,
		  header: {
			'Authorization': token
		  },
		  success:(res)=>{
			wx.hideLoading()
			if(res.data.code == 200){
				let arr = this.data.list
				this.setData({
					list:arr.concat(res.data.data)
				})
				let and = '上拉加载更多..'
				if(res.data.count <= this.data.list.length) and = '没有更多了'
				this.setData({
					and:and
				})

			}else{
				wx.showToast({
				  title: res.data.msg,
				  icon:'error',
				  duration:2000
				})
			}
		  },
		  fail:(err)=>{
			  console.log(err)
			  wx.showToast({
				title: '请检查网络连接',
				icon:'error'
			  })
		  }
		})
	},
	uigo(e){
		wx.navigateTo({
		  url: `./content/content?id=${e.currentTarget.dataset.id}`,
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
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})