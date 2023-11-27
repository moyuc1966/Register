// pages/appointment/hosChange/hosChange.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: getApp().globalData.$url,
		patId: '',
		depTwoId: '',
		name: '',
		weekeasy: [],
		week: [],
		chiose: [],
		doctorList: [],
		click: false,
		option: false,
		time: '',
		doctor: {},
		row: {},
		Mlist:[],
		AList:[],
		hosName:'',
		patName:'',
		depName:''
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
			patId: options.patId,
			depTwoId: options.depTwoId,
			name: options.name,
			weekeasy: this.getweek(true),
			week: this.getweek(false),
			time: this.getweek(false)[0].date,
			chiose: arr,
			hosName:options.hosName,
			patName:options.patName,
			depName:options.depName
		})
		wx.showLoading({
			title: '加载中...',
		})
		let token = wx.getStorageSync('token')
		wx.request({
			url: this.data.url + `/arrange/fromTime?depTwoId=${this.data.depTwoId}&time=${this.data.week[0].date}`,
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
		let date2 = new Date();
		let dateArray = []
		// date2.setDate(today.getDate() + 7)
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
	dateChange(e) {
		if (this.data.chiose.indexOf(true) == e.currentTarget.dataset.index) return
		let arr = Array(7).fill(false);
		arr[e.currentTarget.dataset.index] = true;

		wx.showLoading({
			title: '加载中...',
		})
		let token = wx.getStorageSync('token')
		wx.request({
			url: this.data.url + `/arrange/fromTime?depTwoId=${this.data.depTwoId}&time=${this.data.week[e.currentTarget.dataset.index].date}`,
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					this.setData({
						doctorList: res.data.data,
						chiose: arr,
						time: this.data.week[e.currentTarget.dataset.index].date
					})
				} else {
					wx.showToast({
						title: res.data.msg,
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
	},
	//得到可预约时间段
	slipTime(time){
		let start = Number(time.substr(0,5))
		let end = Number(time.substr(6,12))
		let dif = end - start
		let arr = []
		arr.push(start.toString())
		for(let i=1;i<dif*2;i++){
			if(start+(0.5*i) < end-0.5 && (start+(0.5*i))-(Math.floor(start+(0.5*i)))<0.6) {
				arr.push((start+(0.5*i)).toFixed(2))
			}
		}
		return arr
	},
	clickPup(e) {
		if(this.data.option == false){
			this.setData({
				doctor: this.data.doctorList[e.currentTarget.dataset.index]
			})
			wx.showLoading({
				title: '查询中..',
			})
			let token = wx.getStorageSync('token')
			wx.request({
				url: this.data.url + `/arrange/fromDoctor?doctorId=${this.data.doctor.id}&time=${this.data.time}`,
				header: {
					'Authorization': token
				},
				success: (res) => {
					wx.hideLoading()
					if (res.data.code == 200) {
						this.setData({
							row: res.data.data[0].rows[0],
							MList:(res.data.data[0].rows[0].Mstate != 1 && res.data.data[0].rows[0].Msurplus > 0) ? this.slipTime(res.data.data[0].rows[0].MtimeSegment) : [],
							AList:(res.data.data[0].rows[0].Astate != 1 && res.data.data[0].rows[0].Asurplus > 0) ? this.slipTime(res.data.data[0].rows[0].AtimeSegment) : []
						})
					} else {
						wx.showToast({
							title: res.data.msg,
							icon: 'error'
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
		}
		let _that = this;
		if (!_that.data.click) {
			_that.setData({
				click: true,
			})
		}
		if (_that.data.option) {
			_that.setData({
				option: false,
			})
			setTimeout(() => {
				_that.setData({
					click: false,
				})
			}, 500)
		} else {
			_that.setData({
				option: true
			})
		}
	},
	chios(e){
		let patId = this.data.patId
		let datetime = e.currentTarget.dataset.time;
		let time = this.data.time + e.currentTarget.dataset.aorm;
		let doctorId = this.data.doctor.id
		let depTwoId = this.data.depTwoId
		let dia = this.data.doctor.dia
		let reg = this.data.doctor.reg
		let hosId = this.data.doctor.hosId
		let depName = this.data.depName
		let hosName = this.data.hosName
		let patName = this.data.patName
		let data = `patId=${patId}&datetime=${datetime}&time=${time}&type=普通号&doctorId=${doctorId}&depTwoId=${depTwoId}&dia=${dia}&reg=${reg}&hosId=${hosId}&depName=${depName}&hosName=${hosName}&patName=${patName}`
		wx.navigateTo({
		  url: '../confirm/confirm?'+data,
		})
	},
	uigoDoctor(e){
		let patId = this.data.patId
		let time = this.data.time;
		let doctorId = e.currentTarget.dataset.orderid
		let depTwoId = this.data.depTwoId
		let depName = this.data.depName
		let hosName = this.data.hosName
		let patName = this.data.patName
		let data = `patId=${patId}&time=${time}&type=普通号&doctorId=${doctorId}&depTwoId=${depTwoId}&depName=${depName}&hosName=${hosName}&patName=${patName}`
		wx.navigateTo({
		  url: '../doctorInfo/doctorInfo?' +data,
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