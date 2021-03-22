import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login";
import Register from "./views/register";
// 布局组件
import Layout from './components/Layout.vue';
import Home from './views/home';
import Teacher from './views/teacher';
import Student from './views/student';
Vue.use(Router);

export default new Router({
  // mode: "history",//全局路由，有这条的话地址栏上就欸有#这样的哈希值（当前项目我们想看到哈希值，所致注释掉）
  base: process.env.BASE_URL,
  routes: [
    // 基础布局
    {
      path: "/",
      name: "layout",
      component: Layout,
      redirect:'/home',
      children:[
        {
          path:'/home',
          component:Home,
          meta:{title:'首页'}
        }
      ]
    },
    // 教师管理
    {
      path:'/teacher',
      component:Layout,
      children:[
        {
          path:'/',
          component:Teacher,
          meta:{title:'教师管理'}
        }
      ]
    },
    // 学员管理
    {
      path:'/student',
      component:Layout,
      children:[
        {
          path:'/',
          component:Student,
          meta:{title:'学员管理'}
        }
      ]
    },
    // 登录
    {
      path: "/login",
      name: "login",
      component: Login
    },
    // 注册
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
});
