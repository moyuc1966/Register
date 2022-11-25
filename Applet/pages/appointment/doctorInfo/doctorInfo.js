// pages/appointment/hosChange/hosChange.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		depTwoId: '',
		week: [],
		doctorList: [],
		time: '',
		doctor: {},
		hosName:'',
		depName:'',
		doctorId:'',
		weekType:1,
		arrange:{}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.setNavigationBarTitle({
			title: options.name
		})
		let arr = Array(7).fill(false);
		arr[0] = true;
		this.setData({
			depTwoId: options.depTwoId,
			week: this.getweek(false),
			time: this.getweek(false)[0].date,
			hosName:options.hosName,
			depName:options.depName,
			doctorId:options.doctorId
		})
		wx.showLoading({
			title: '加载中...',
		})
		let token = wx.getStorageSync('token')
		wx.request({
			url: this.data.url + `/arrange/admin/weekArrange?doctorId=${this.data.doctorId}&week=1`,
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					this.setData({
						arrange: this.getDoctorArray(res.data.data[0])
					})
				} else {
					wx.showToast({
						title: res.data.msg,
						icon:'error'
					})
				}
			},
			fail: (err) => {
				console.log(err)
				wx.hideLoading()
				wx.showToast({
					title: '出现错误',
					icon: 'error'
				})
			}
		})
		wx.request({
			url: this.data.url + `/arrange/redDoctor?doctorId=${this.data.doctorId}&time=${this.data.time}&depTwoId=${this.data.depTwoId}`,
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					this.setData({
						doctorList: res.data.data
					})
				} else {
					wx.showToast({
						title: res.data.msg,
						icon:'error'
					})
				}
			}
		})
		wx.request({
			url: this.data.url + `/simple/getDoctorInfo?id=${this.data.doctorId}`,
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					this.setData({
						doctor: res.data.data[0]
					})
				} else {
					wx.showToast({
						title: res.data.msg,
						icon:'error'
					})
				}
			}
		})
	},
	 getDoctorArray(obj){
		function isnull(params) {
			let flag = true;
			if(params.Anum == null && params.Mnum == null) return false
			return flag;
		}
		function getweekday(date){
			var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
			var week = weekArray[new Date(date).getDay()];
			return '周' + week;
		}
		let arr = []
		for(let i=1;i<8;i++){
			let obje = {
				time:null,
				Anum:null,
				AtimeSegment:null,
				Mnum:null,
				MtimeSegment:null,
				week:null
			}
			if(obj['Astate' +i] === 0 || obj['Astate' +i] === '0'){
				obje.Anum = obj['Anum' +i];
				obje.AtimeSegment = obj['AtimeSegment' +i];
				obje.time = obj['time' +i];
				obje.week = getweekday(obj['time' +i])
			}
			if(obj['Mstate' +i] === 0 || obj['Mstate' +i] === '0'){
				obje.Mnum = obj['Mnum' +i];
				obje.MtimeSegment = obj['MtimeSegment' +i];
				obje.time = obj['time' +i];
				obje.week = getweekday(obj['time' +i])
			}
			if(isnull(obje)) arr.push(obje)
		}
		return arr
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	getweek(iseasy) {
		function formatDate(time) {
			var date = new Date(time);
			var year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate()
			var newTime = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
			return newTime;
		}
		let today = new Date()
		let date2 = new Date(today);
		let dateArray = []
		//date2.setDate(today.getDate() + 7)
		for (let i = 0; i < 7; i++) {
			let everyDay = formatDate(date2.setDate(today.getDate() + i))
			let map = {
				0: '周日',
				1: '周一',
				2: '周二',
				3: '周三',
				4: '周四',
				5: '周五',
				6: '周六'
			}
			let obj = {
				date: everyDay,
				week: map[new Date(date2.setDate(today.getDate() + i)).getDay()]
			}
			dateArray.push(obj)
		}

		function easy() {
			let arr = []
			dateArray.forEach((item, index) => {
				let obj = {
					date: item.date.slice(item.date.length - 2, item.date.length),
					week: item.week
				}
				arr.push(obj)
			})
			arr[0].week = '今日'
			return arr
		}
		return iseasy ? easy() : dateArray
	},
	uigoDoctor(e){
		const pages = getCurrentPages()
		const perpage = pages[pages.length - 1] //当前页面
		let keys = `?depTwoId=${this.data.depTwoId}&hosName=${this.data.hosName}&depName=${this.data.depName}&doctorId=${e.currentTarget.dataset.orderid}`
		// wx.reLaunch({
		// 	url: '/' + perpage.route + keys
		//  })	
		wx.navigateTo({
			url: '/' + perpage.route + keys
		})
	  
	},
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