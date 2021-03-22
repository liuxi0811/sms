// eslint-disable-next-line no-unused-vars
import axios from "axios";
// 按需导入 ElementUI 组件
import { Loading, Message } from "element-ui";
// // eslint-disable-next-line no-unused-vars
// axios.get("/db.json").then(response => {
//     const data = response.data;
//     console.log(data);

// });
// 加载数据时打开和关闭动效对象
const loading = {
  loadingInstance: null, // Loading实例
  open: function() {
    // 打开加载
    console.log("加载中", this.loadingInstance);
    if (this.loadingInstance === null) {
      // 创建单例, 防止切换路由重复加载
      console.log("创建加载实例..");
      this.loadingInstance = Loading.service({
        text: "拼命加载中",
        target: ".main", // 效果显示区域
        background: "rgba(0, 0, 0, 0.5)", // 加载效果
      });
    }
  },
  close: function() {
    // 关闭加载
    if (this.loadingInstance !== null) {
      this.loadingInstance.close();
      console.log("结束加载");
    }
    this.loadingInstance = null; // 关闭后实例重新赋值null, 下次让它重新创建
  },
};
//上面的是用axios自带的ajax请求，我们需要自己封装一个，所以用下面的
const request = axios.create({
  //例如请求的地址为 /db.json , 通过axios 会自动在前面加上baseURL的值变为/dev-api/db.json
  //然后通过代理转发（vue.config.js）后会变为http://localhost:8001/db.json
  // baseURL:"/dev-api",
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL:"/",
  timeout: 5000, //请求超时，
});

//下面这种方式就不是直接用axios里面的方法了，而是用自己封装好的对象（名字在是request），
// 然后再调用ajax方法
// http://localhost:8888/dev-api/db.json 404
// request.get("/db.json").then(response => {
//         const data = response.data;
//         console.log(data);

// });
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    loading.open(); // 打开加载效果
    return config;
  },
  (error) => {
    // 出现异常
    loading.close(); // 关闭加载效果
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(response => {
    loading.close() // 关闭加载效果
    const resp = response.data
    // 如果后台响应状态码不是 2000 , 说明后台服务有异常,统一可在此处处理
    if (resp.code !== 2000) {
        Message({
            message: res.message || '系统异常',
            type: 'warning',
            duration: 5 * 1000 // 停留时长
        })
    } 
    return response
}, error => {
    loading.close() // 关闭加载效果
    // 当请求接口出错时, 进行弹出错误提示, 如 404, 500, 请求超时
    console.log('response error', error.response.status)
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error);
})

export default request;
