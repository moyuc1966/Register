import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, meta: { title: '登录-预约挂号管理中心' } },
    {
        path: '/home', component: home, meta: { title: '预约挂号管理中心' }, redirect: '/index', children: [
            { path: '/index', component: () => import('../components/homeIndex.vue'), meta: { title: '预约挂号管理中心' } },
            { path: '/makeList', component: () => import('../components/make/makeList.vue'), meta: { title: '预约列表-预约挂号管理中心' } },
            { path: '/make/Detail', component: () => import('../components/make/det.vue'), meta: { title: '预约详情-预约挂号管理中心' } },
            { path: '/doctorMakeList', component: () => import('../components/make/doctorMakeList.vue'), meta: { title: '医生名下-预约挂号管理中心' } },
            { path: '/Scheduling', component: () => import('../components/make/Scheduling.vue'), meta: { title: '医生排班-预约挂号管理中心' } },
            { path: '/set/setPass', component: () => import('../components/set/modPass.vue'), meta: { title: '信息修改-预约挂号管理中心' } },
            { path: '/set/addAdmin', component: () => import('../components/set/addAdmin.vue'), meta: { title: '添加管理员-预约挂号管理中心' } },
            { path: '/order/recorder', component: () => import('../components/order/recorder.vue'), meta: { title: '充值订单-预约挂号管理中心' } },
            { path: '/order/Detail', component: () => import('../components/order/det.vue'), meta: { title: '订单详情-预约挂号管理中心' } },
            { path: '/order/refund', component: () => import('../components/order/refund.vue'), meta: { title: '退款管理-预约挂号管理中心' } },
            { path: '/order/payOrder', component: () => import('../components/order/payOrder.vue'), meta: { title: '其他缴费-预约挂号管理中心' } },
            { path: '/dep/hospital', component: () => import('../components/dep/hospital.vue'), meta: { title: '分院管理-预约挂号管理中心' } },
            { path: '/dep/depOne', component: () => import('../components/dep/depOne.vue'), meta: { title: '一级科室管理-预约挂号管理中心' } },
            { path: '/dep/depTwo', component: () => import('../components/dep/depTwo.vue'), meta: { title: '二级科室管理-预约挂号管理中心' } },
            { path: '/dep/doctor', component: () => import('../components/dep/doctor.vue'), meta: { title: '医生管理-预约挂号管理中心' } },
            { path: '/dep//doctor/add', component: () => import('../components/dep/addDoctor.vue'), meta: { title: '新增医生-预约挂号管理中心' } },
            { path: '/users/userlist', component: () => import('../components/users/user.vue'), meta: { title: '用户管理-预约挂号管理中心' } },
            { path: '/users/depList', component: () => import('../components/users/dep.vue'), meta: { title: '就诊人管理-预约挂号管理中心' } },
            { path: '/users/Message', component: () => import('../components/users/Message.vue'), meta: { title: '消息管理-预约挂号管理中心' } },
            { path: '/users/message/post', component: () => import('../components/users/postMsg.vue'), meta: { title: '发送消息-预约挂号管理中心' } },
            { path: '/systemInfo/swiper', component: () => import('../components/info/swiper.vue'), meta: { title: '轮播图管理-预约挂号管理中心' } },
            { path: '/systemInfo/navigation', component: () => import('../components/info/navigation.vue'), meta: { title: '医院导航管理-预约挂号管理中心' } },
            { path: '/systemInfo/navigation/floor', component: () => import('../components/info/floor.vue'), meta: { title: '楼层导航-预约挂号管理中心' } },
            { path: '/systemInfo/feedback', component: () => import('../components/info/feedback.vue'), meta: { title: '用户反馈-预约挂号管理中心' } },
            { path: '/systemInfo/notice', component: () => import('../components/info/notice.vue'), meta: { title: '医院公告-预约挂号管理中心' } },
            { path: '/systemInfo/encyclopedias', component: () => import('../components/info/encyclopedias.vue'), meta: { title: '健康百科-预约挂号管理中心' } },
            { path: '/systemInfo/share', component: () => import('../components/info/share.vue'), meta: { title: '文章分享-预约挂号管理中心' } },
            { path: '/systemInfo/article/content', component: () => import('../components/info/content.vue'), meta: { title: '文章内容-预约挂号管理中心' } },
            { path: '/systemInfo/addDrticle', component: () => import('../components/info/addDrticle.vue'), meta: { title: '新增文章-预约挂号管理中心' } },
            //定义404页面
            { path: '/404', component: () => import('../components/404.vue'), meta: { title: '404-页面走丢了-预约挂号管理中心' } },
        ]
    },
    { path: '*', redirect: '/404' },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.meta.title) {//判断是否有标题
        document.title = to.meta.title
    }
    // if (to.path == '/home' && from.path == '/login') return next();
    if (to.path === '/login') {
        const token = localStorage.getItem('adminToken');
        const time = Number(localStorage.getItem('tokenStartTime'))
        if (token && time + (7 * 24 * 60 * 60) - (60 * 60) > Math.round(new Date().getTime() / 1000)) return next('/home')
        return next()
    }
    if (to.path === '/index') {
        const token = localStorage.getItem('adminToken');
        const time = Number(localStorage.getItem('tokenStartTime'));
        if (token && time + (7 * 24 * 60 * 60) - (60 * 60) > Math.round(new Date().getTime() / 1000)) return next()
        return next('/login')
    }
    next()
})

export default router
