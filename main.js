import App from './App'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
// 引入uView-ui样式库
import uView from "uview-ui"
// 注册uView
Vue.use(uView)
// 引入vuex仓库
import store from './store'
// 绑定到全局
Vue.prototype.$password = store

// 时间
Vue.filter("myFilter", function(originVal) { //dateFormat为自定义函数名
 const dt = new Date(originVal)
 const y = dt.getFullYear()
 const m = (dt.getMonth() + 1 + "").padStart(2, "0")
 const d = (dt.getDate() + "").padStart(2, "0")
 const hh = (dt.getHours() + "").padStart(2, "0")
 const mm = (dt.getMinutes() + "").padStart(2, "0")
 const ss = (dt.getSeconds() + "").padStart(2, "0")
 // 时间格式年月日、时分秒
 return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	Server
} from 'tls';
import {
	log
} from 'util'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app,
		store
	}
}
// #endif
