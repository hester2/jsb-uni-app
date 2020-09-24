import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$webUrl='https://wqh.easy.echosite.cn/api'//测试接口
// Vue.prototype.$webUrl='http://api.jinsubao.cn/api'//线上接口
Vue.prototype.$token=null

const app = new Vue({
    ...App
})
app.$mount()
