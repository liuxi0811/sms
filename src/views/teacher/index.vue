<template>
  <div style="margin:10px">
    <!-- 条件查询。 inline 属性设置表单变为行内的表单域 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px"
    >
      <!-- 有prop才可以重置 -->
      <el-form-item prop="jobnumber">
        <el-input
          v-model="searchMap.jobnumber"
          placeholder="工号"
          style="width: 200px"
          v-if="!isDialog"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="教师姓名"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-select
          v-model="searchMap.role"
          placeholder="教师职务"
          style="width: 110px"
          v-if="!isDialog"
        >
          <!--key 标识， label 下拉显示的文本，vulue 表单值 -->
          <el-option
            v-for="option in roleOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="entrydate">
        <!-- value-format 是指定绑定值的格式 -->
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.entrydate"
          type="date"
          placeholder="入职时间"
          v-if="!isDialog"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchData"
          >查询</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleAdd"
          v-if="!isDialog"
          >新增</el-button
        >
        <el-button @click="resetForm('searchForm')" v-if="!isDialog"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 列表-->
    <!-- :data 绑定渲染的数据；border: 边框; -->
    <!-- highlight-current-row 激活单选行, isDialog为true时激活
    @current-change 当点击某一行后,会触发这个事件,从而调用对应的函数clickCurrentChange
    clickCurrentChange函数会接收两个参数:currentRow，oldCurrentRow
    -->
    <el-table
      :highlight-current-row="isDialog"
      @current-change="clickCurrentChange"
      :data="list"
      height="380"
      border
      style="width: 100%"
    >
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="jobnumber" label="工号"></el-table-column>
      <el-table-column prop="name" label="教师姓名"></el-table-column>
      <el-table-column prop="role" label="教师职务" v-if="!isDialog">
        <template slot-scope="scope">
          <span>{{ scope.row.role | roleFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="entrydate"
        label="入职时间"
        v-if="!isDialog"
      ></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column label="操作" width="150" v-if="!isDialog">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDele(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页，添加在div里面 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      :layout="
        !isDialog
          ? 'total, sizes, prev, pager, next, jumper'
          : 'prev, pager, next'
      "
      :total="total"
    >
    </el-pagination>

    <el-dialog
      v-if="!isDialog"
      title="教师编辑"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
      <el-form
        status-icon
        ref="pojoForm"
        :model="pojo"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="工号" prop="jobnumber">
          <el-input v-model="pojo.jobnumber" />
        </el-form-item>
        <el-form-item label="教师姓名" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="职务" prop="role">
          <el-select
            v-model="pojo.role"
            class="filter-item"
            placeholder="请点击选择"
          >
            <el-option
              v-for="option in roleOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间" prop="entrydate">
          <el-date-picker
            v-model="pojo.entrydate"
            type="date"
            placeholder="请点击选择"
            format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="pojo.phone" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo._id === null ? addData('pojoForm') : updateData('pojoForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import teacherApi from "@/api/teacher";
// 老师角色
const roleOptions = [
  { type: "1", name: "教师" },
  { type: "2", name: "班主任" },
];
export default {
  props: {
    // 接收父组件传递过来 的数据,通过isDialog来判断 是否为弹框
    // 如果为 true, 则是弹框, false 就是列表
    isDialog: Boolean,
  },
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页, 默认第1页
      pageSize: 10, // 每页显示条数， 10条
      searchMap: {
        // 条件查询绑定条件值
        jobnumber: "",
        name: "",
        role: "",
        entrydate: "",
      },
      roleOptions,
      //   提交的数据
      pojo: {
        _id: null,
        jobnumber: "",
        name: "",
        entrydate: "",
        role: "",
        phone: "",
      },
      dialogFormVisible: false, // 控制新增对话框
      //   校验规则
      rules: {
        jobnumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        role: [{ required: true, message: "请选择职务", trigger: "blur" }],
      },
    };
  },
  // 钩子函数获取数据
  created() {
    this.fetchData();
  },
  methods: {
    // 打开新增窗口
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    },
    // 格式化日期
    formatDate(date) {
      date = new Date(date);
      var y = date.getFullYear();

      var m = date.getMonth() + 1;

      m = m < 10 ? "0" + m : m;

      var d = date.getDate();

      d = d < 10 ? "0" + d : d;

      return y + "-" + m + "-" + d;
    },
    // 提交新增数据
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，提交添加
          this.pojo.entrydate = this.formatDate(this.pojo.entrydate);
          teacherApi.add(this.pojo).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              // 新增成功, 刷新列表数据
              this.fetchData();
              this.dialogFormVisible = false; //关闭窗口
            } else {
              // 失败, 弹出提示
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          // 验证不通过
          return false;
        }
      });
    },
    // 表单重置，
    // 在 el-form-item 标签属性 prop 上, 指定了字段名, 重置才会生效
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    // 打开编辑窗口
    handleEdit(id) {
      // 清空原数据
      this.handleAdd();
      teacherApi.getById(id).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        }
      });
    },
    // 更新数据
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，提交
          this.pojo.entrydate = this.formatDate(this.pojo.entrydate);
          teacherApi.update(this.pojo).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData(); // 刷新列表数据
              this.dialogFormVisible = false; // 关闭窗口
              this.$message({
                message: resp.message,
                type: "success",
              });
            } else {
              // 失败, 弹出提示
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          // 验证不通过
          return false;
        }
      });
    },
    handleDele(id) {
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认
          teacherApi.deleteById(id).then((response) => {
            const resp = response.data;
            //提示信息
            this.$message({
              type: resp.flag ? "success" : "error",
              message: resp.message,
            });
            if (resp.flag) {
              // 删除成功，刷新列表
              this.fetchData();
            }
          });
        })
        .catch(() => {
          // 取消删除，不理会
        });
    },
    // 根据条件查询教师列表
    searchData() {
      //将页码设置回1，防止后台只查询到1条数据，但是却返回其他页码，从而数据返回空
      this.currentPage = 1;
      this.fetchData();
    },
    fetchData() {
      // 查询所有教师
      // teacherApi.getList().then((response) => {
      //   this.list = response.data.data.rows;
      //   console.log(this.list);
      // });
      //   判断查询对象中是否有数据，如果有将查询页码设置为第一页
      //   if (this.searchMap) {
      //     this.currentPage = 1;
      //   }
      // 调用分页方法查询, 不要少了 this
      teacherApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((response) => {
          const reqs = response.data;
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
        });
    },
    // 当点击某一行时,会调用这个函数进行处理
    clickCurrentChange(currentRow) {
      console.log(currentRow);
      // 点击后,要将点击的数据传递到父组件(商品管理中),
      // 则可以通过触发父组件中的option-teacher, 触发之后 ,
      //父组件可以在 option-teacher 这个事件对应的处理函数中进行接收数据currentRow
      this.$emit("option-teacher", currentRow);
    },
  },
  filters: {
    roleFilter(type) {
      const obj = roleOptions.find((obj) => obj.type === type);
      return obj ? obj.name : null;
    },
  },
};
</script>

<style scoped>
</style>