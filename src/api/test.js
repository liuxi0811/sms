//其实这种和直接使用axios进行ajax请求一样，只不过自己定义了一个和axios一样功能的对象
//在进行各种方法的使用,主要就行想要将代码拆分为多个文件，而不是都在一个文件里面
import request from "@/utils/request";//这个@/就相当于 src目录

// request.get('/db.json').then(response => {
//     console.log(response);
    
// })

//测试2，以对象配置的方式进行指定请求方式
//这里和jQuery的$.ajax()使用方法基本一样
// request({
//     method:'get',
//     url:'/db.json',

// }).then(response => {
//     console.log(response.data);
    
// })

//但是上面直接输出的做法不好，应该响应到对应的组件里面进行渲染
//上面的代码其实可以拆分成这样，request()调用后会有一个对象返回的，然后再调用回调函数也是可以的，
//所以就可以将request()返回的对象，响应到组件中去

// const a =  request({
//     method:'get',
//     url:'/db.json',

// })

// a.then(response => {
//     console.log(response.data);
    
// })
// const BASE_URI = '/dev-api';
const BASE_URI = process.env.VUE_APP_BASE_API;
//导出一个对象，对象里面包括了我们之前的那个get请求方法
export default{
    getList(){
        const req = request({
            method:'get',
            // url:'http://localhost:8001/db.json',
            // url:BASE_URI+'/db.json',
            url:'/db.json',
        
        })
        return req;
    }
}