import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

Vue.prototype.apiUrl = 'https://......'

axios.defaults.baseURL = 'https://......../';
//请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('adminToken');
    return config
}, function (err) {
    this.$router.push('/login');
})
//响应拦截器
axios.interceptors.response.use(function (res) {
    if (res.data.code == 403) {
        this.$message.error("请先登录");
        this.$router.push('/login');
    } else {
        return res
    }
}, function (err) {
    this.$message.error("请先登录");
    this.$router.push('/login');
})

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

// 引入富文本组件
import QuillEditor from 'vue-quill-editor'
// 引入富文本组件样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(QuillEditor)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
