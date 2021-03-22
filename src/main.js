import Vue from "vue";

//注意引入在Vue的下面
//Element 组件库
// eslint-disable-next-line no-unused-vars
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//使用ElementUI
Vue.use(ElementUI);
// 权限拦截
import './permission.js'
//下面是关于代码提示的问题，就是报错是否完全（开发时应该为false，不然很麻烦）
//如果是开发环境：process.env.NODE_EN这个常量的值就不是production，所以会返回false
Vue.config.productionTip = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV);//开发环境 development，生产环境 production
console.log(process.env.VUE_APP_SERVICE_URL);//开发环境 development，生产环境 production
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
