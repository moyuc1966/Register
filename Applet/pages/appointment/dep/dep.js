// pages/appointment/dep/dep.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		hosList:[],
		hosChoice:[],
		depList:[],
		depTwo:[],
		patId:'',
		depChoice:[],
		chiose:[],
		hosName:'',
		patName:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		
		this.setData({
			patId:options.id,
			patName:options.patName
		})
		let token = wx.getStorageSync('token')
		wx.showLoading({
		  title: '加载中...',
		})
		new Promise((resolve, reject)=>{
			wx.request({
				url: this.data.url + '/simple/getHospital',
				header: {
					'Authorization': token
				},
				success: (res) => {
					if (res.data.code == 200) {
						resolve(res.data)
					}else if(res.data.code == 403){
						getApp().notPermission()
					} else {
						wx.showToast({
							title: res.data.msg,
							icon: 'error'
						})
					}
				},
				fail: (err) => {
					wx.hideLoading()
					wx.showToast({
						title: '请检查网络连接',
						icon: 'error'
					})
				}
			})
		}).then(res=>{
			let arr = new Array(res.data.length).fill(false);
			arr[0] = true;
			this.setData({
				hosList:res.data,
				hosChoice:arr
			})
			return new Promise((resolve, reject)=>{
				wx.request({
					url: this.data.url +`/simple/getDepOne?hosId=${res.data[0].id}`,
					header: {
						'Authorization': token
					},
					success: (res) => {
						if (res.data.code == 200) {
							resolve(res.data)
							
						}else {
							wx.showToast({
								title: res.data.msg,
								icon: 'error'
							})
						}
					}
				})
			})
		}).then(res=>{
			let arr = new Array(res.data.length).fill(false);
			arr[0] = true;
			this.setData({
				depList:res.data,
				depChoice:arr
			})
				wx.request({
					url: this.data.url +`/simple/getDepTwo?depId=${res.data[0].id}`,
					header: {
						'Authorization': token
					},
					success: (res) => {
						wx.hideLoading()
						if (res.data.code == 200) {
							this.setData({
								depTwo:res.data.data
							})
						}else {
							wx.showToast({
								title: res.data.msg,
								icon: 'error'
							})
						}
					}
				})
		}).catch(err=>{
			wx.hideLoading()
			wx.showToast({
			  title: '出现错误',
			  icon:'error'
			})
			console.log(err)
		})
	},
	hosChange(e){
		if(e.currentTarget.dataset.index == this.data.hosChoice.indexOf(true)) return
		let arrh = new Array(this.data.hosChoice.length).fill(false);
		arrh[e.currentTarget.dataset.index] = true;
		let token = wx.getStorageSync('token')
		wx.showLoading({
		  title: '加载中...',
		})
		new Promise((resolve, reject)=>{
			wx.request({
				url: this.data.url +`/simple/getDepOne?hosId=${this.data.hosList[e.currentTarget.dataset.index].id}`,
				header: {'Authorization': token},
				success: (res) => {
					if (res.data.code == 200) {
						resolve(res.data)
					}else {
						wx.showToast({
							title: res.data.msg,
							icon: 'error'
						})
					}
				}
			})
		}).then(res=>{
			let arr = new Array(res.data.length).fill(false);
			arr[0] = true;
			this.setData({
				depList:res.data,
				depChoice:arr,
				hosName:this.data.hosList[e.currentTarget.dataset.index].name
			})
			wx.request({
				url: this.data.url + `/simple/getDepTwo?depId=${res.data[0].id}`,
				header: {'Authorization': token},
				success: (res) => {
					wx.hideLoading()
					if (res.data.code == 200) {
						this.setData({
							hosChoice:arrh,
							depTwo:res.data.data
						})
					}else {
						wx.showToast({
							title: res.data.msg,
							icon: 'error'
						})
					}
				}
			})
		}).catch(err=>{
			wx.hideLoading()
			wx.showToast({
			  title: '出现错误',
			  icon:'error'
			})
			console.log(err)
		})
	},
	depChange(e){
		if(e.currentTarget.dataset.index == this.data.depChoice.indexOf(true)) return
		let arr = new Array(this.data.depChoice.length).fill(false);
		arr[e.currentTarget.dataset.index] = true;
		let token = wx.getStorageSync('token')
		wx.showLoading({
		  title: '加载中...',
		})
		wx.request({
			url: this.data.url + `/simple/getDepTwo?depId=${this.data.depList[e.currentTarget.dataset.index].id}`,
			header: {'Authorization': token},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					this.setData({
						depChoice:arr,
						depTwo:res.data.data
					})
				}else {
					wx.showToast({
						title: res.data.msg,
						icon: 'error'
					})
				}
			}
		})
	},
	go(e){
		let id = e.currentTarget.dataset.id;
		let name = e.currentTarget.dataset.name;
		let patId = this.data.patId;
		let hosName = this.data.hosName
		let patName = this.data.patName
		wx.navigateTo({
		  url: `../hosChange/hosChange?patId=${patId}&depTwoId=${id}&depName=${name}&hosName=${hosName}&patName=${patName}`,
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