// pages/my/message/message.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id:'',
		url: getApp().globalData.$url,
		relationArray:['本人', '父母', '子女','夫妻','朋友'],
		relationIndex: 0,
		docTypeArray:['身份证', '护照', '港澳通行证'],
		docTypeIndex: 0,
		info:{
			id:'',
			relation:'本人',
			name:'',
			docType:'身份证',
			certificate:'',
			phone:'',
			card:'',
			isdefault:1,
			address:''
		},
	},
	onChange(event) {
        let key = event.currentTarget.dataset.key
        let value = event.detail.value
        let objectAttr = 'info.' + key
        this.setData({
            [objectAttr]:value
        })
    },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let info = this.data.info
		info.id = (options.id === ''|| options.id == null) ? 0 : options.id
		this.setData({
			id:(options.id === ''|| options.id == null) ? 0 : options.id,
			info:info
 		})
		if(options.id === '' || options.id == null) return
		let token = wx.getStorageSync('token')
		wx.showLoading({
			title: '加载中...',
		})
		wx.request({
			url: this.data.url + `/user/patientInfo/${options.id}`,
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					let obj = {
						id:this.data.info.id,
						relation:res.data.data[0].relation,
						name:res.data.data[0].name,
						docType:res.data.data[0].doctype,
						certificate:res.data.data[0].certificate,
						phone:res.data.data[0].phone,
						card:res.data.data[0].card,
						isdefault:res.data.data[0].isdefault,
						address:res.data.data[0].address
					}
					this.setData({
						info: obj,
						relationIndex:this.data.relationArray.indexOf(res.data.data[0].relation),
						docTypeIndex:this.data.docTypeArray.indexOf(res.data.data[0].doctype)
					})
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
	},
	relationchangeValue(e) {
		let obj = this.data.info;
		  obj.relation = this.data.relationArray[e.detail.value]
		this.setData({
			relationIndex: e.detail.value,
			info:obj
		})
	  },
	  docTypechangeValue(e) {
		  let obj = this.data.info;
		  obj.docType = this.data.docTypeArray[e.detail.value]
		this.setData({
			docTypeIndex: e.detail.value,
			info:obj
		})
	  },
	changeValue(e) {
		let arr = this.data.info
		arr.isdefault = e.detail.value ? 1 : 2
		this.setData({
			info:arr
		})
	},
	mod(){
		if(this.data.info.certificate == '' || this.data.info.name==''|| this.data.info.phone=='' || this.data.info.card == '') return wx.showToast({
		  title: '请输入完整',
		  icon:'error'
		})
		wx.showLoading({
			title: '保存中...',
		})
		let token = wx.getStorageSync('token')
		wx.request({
			url: this.data.url + `/user/patientMod`,
			method: 'put',
			data: this.data.info,
			header: {
				'Authorization': token
			},
			success: (res) => {
				wx.hideLoading()
				if (res.data.code == 200) {
					wx.showToast({
						title: '保存成功',
					})
				} else {
					wx.showToast({
						title: res.data.msg,
						icon: 'error'
					})
				}
			}
		})
	},
	post(e) {
		if(this.data.info.certificate == '' || this.data.info.name==''|| this.data.info.phone=='' || this.data.info.card == '') return wx.showToast({
			title: '请先输入完整',
			icon:'error'
		  })
		  wx.showLoading({
			  title: '保存中...',
		  })
		  let token = wx.getStorageSync('token')
		  wx.request({
			  url: this.data.url + `/user/patientAdd`,
			  method: 'post',
			  data: this.data.info,
			  header: {
				  'Authorization': token
			  },
			  success: (res) => {
				  wx.hideLoading()
				  if (res.data.code == 200) {
					  wx.showToast({
						  title: '保存成功',
					  })
				  } else {
					  wx.showToast({
						  title: res.data.msg,
						  icon: 'error'
					  })
				  }
			  }
		  })
	},
	del() {
		let that = this;
		wx.showModal({
			title: '请输入“确认删除”来删除就诊人',
			editable:true,
			placeholderText:'请确认删除',
			success (res) {
				if (res.confirm) {
					if(res.content == '确认删除'){
						wx.showLoading({
							title: '删除中...',
						})
					let token = wx.getStorageSync('token')
					wx.request({
						url:that.data.url + `/user/patientDel/${that.data.id}`,
						method:'delete',
						header: {
							'Authorization': token
						},success:(rest)=>{
							wx.hideLoading()
							if(rest.data.code == 200){
								wx.navigateBack({
								  delta: 1,
								})
								wx.showToast({
								  title: '已删除',
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
						title: '确认错误',
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
	onShow() {},

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