// app.js
App({
  onLaunch() {
  },
  globalData: {
    $url : 'https://'         //此处是全局api地址配置，根路径，不携带/，记得删除此注释
  },
  notPermission:()=>{
	wx.showModal({
		title: '提示',
		content: '请先登录后操作',
		success (res) {
		  if (res.confirm) {
			wx.redirectTo({
				url: '/pages/sign/sign'
			 })
		  } else if (res.cancel) {
			wx.navigateBack({
				delta: 1
			  });
		  }
		}
	  })
  }
})
