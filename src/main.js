import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import moment from 'moment'
import './plugins/element.js'

import { Message } from 'element-ui';
Vue.prototype.$message = Message;

import Api from './api/index.js';
Vue.prototype.$api = Api;

import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

Vue.config.productionTip = false;

Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"h+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

Vue.filter('dateFormat', function (dateStr, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(formatStr)
})

Vue.prototype.isLogin = localStorage.getItem('isLogin') || false
Vue.prototype.currentUser = JSON.parse(localStorage.getItem('currentUser') || null)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
