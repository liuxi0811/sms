<template>
  <div class="main">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="line" :to="{ path: '/' }"
        >首页</el-breadcrumb-item
      >
    </el-breadcrumb> -->
    <app-link v-show="$route.path!='/home'"></app-link>
    <!-- 子路由渲染出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import AppLink from './Link.vue'
export default {
  data() {
    return {};
  },

  components: {AppLink},

  methods: {},
};
</script>

<style scoped>
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  /* 投影 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.line {
  border-left: 3px solid #31c17b;
  padding-left: 10px;
}
/* .main{
	background-image: url(../../assets/images/nybj.png);background-size:100% 100%;
} */
</style>