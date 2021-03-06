module.exports = {
  devServer: {
    port: 8888, // 端口号，如果端口号被占用，会自动提升1
    host: "localhost", //主机名， 127.0.0.1， 真机 0.0.0.0 
    https: false, //协议
    open: true, //启动服务时自动打开浏览器访问
    proxy: {//开发环境代理配置
      // '/dev-api': {
        //注意这里要用中括号 包起来
        [process.env.VUE_APP_BASE_API]: {
        // 目标服务器, 代理访问到 https://localhost:8001
        // target: 'http://localhost:8001',
        target: process.env.VUE_APP_SERVICE_URL,
        // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
        // 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changOrigin: true, //开启代理
        pathRewrite: {
          // 会将 /dev-api 替换为 '',也就是 /dev-api 会移除，
          // 如 /dev-api/db.json 代理到 https://localhost:8080/db.json
          // '^/dev-api': '',
          ['^'+process.env.VUE_APP_BASE_API] :''


        }
      }
    }
  },

  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false // 打包时不会生成 .map 文件，加快打包速度
};
