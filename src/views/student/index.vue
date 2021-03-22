<template>
  <div style="margin:10px">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="search"
      style="margin-top: 20px"
    >
      <el-form-item prop="stunum">
        <el-input
          v-model="search.stunum"
          placeholder="学号"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="search.name"
          placeholder="学生姓名"
          style="width: 200px"
        ></el-input>
      </el-form-item>

      <el-form-item prop="teacher">
        <el-input
          readonly
          @click.native="dialogTeacherVisible = true"
          v-model="search.teacher"
          placeholder="授课教师"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="class">
        <el-input
          v-model="search.class"
          placeholder="所在班级"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchData"
          >查询</el-button
        >
        <el-button type="primary" icon="el-icon-edit" @click="handleAdd"
          >新增</el-button
        >
        <el-button @click="$refs['searchForm'].resetFields()">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <el-table
      :data="list"
      height="380"
      border
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="stunum" label="学号" width="100"></el-table-column>
      <el-table-column
        prop="name"
        label="学生姓名"
        width="100"
      ></el-table-column>
      <el-table-column prop="admissiondate" label="入学时间"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column
        prop="teacher"
        label="授课教师"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="class"
        label="所在班级"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="job"
        label="工作单位"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="money"
        label="薪资待遇"
        width="100"
      ></el-table-column>
      <el-table-column label="操作" width="150">
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 选择授课教师弹出 -->
    <el-dialog
      title="选择授课教师"
      :visible.sync="dialogTeacherVisible"
      width="500px"
    >
      <teacher :isDialog="true" @option-teacher="optionTeacher"></teacher>
    </el-dialog>

    <!-- 新增 or 编辑页面 -->
    <el-dialog title="学员编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :rules="rules"
        status-icon
        ref="pojoForm"
        :model="pojo"
        label-width="100px"
        label-position="right"
        style="width: 400px"
      >
        <el-form-item label="学号" prop="stunum">
          <el-input v-model="pojo.stunum" />
        </el-form-item>
        <el-form-item label="学员姓名" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="入学时间" prop="admissiondate">
          <el-date-picker
            v-model="pojo.admissiondate"
            type="date"
            placeholder="请点击选择"
            format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="pojo.phone" />
        </el-form-item>

        <el-form-item label="授课教师" prop="teacherId">
          <el-input
            readonly
            @click.native="editOptionTeacher"
            v-model="pojo.teacher"
            placeholder="选择授课教师"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在班级" prop="class">
          <el-input v-model="pojo.class" />
        </el-form-item>
        <el-form-item label="工作单位" prop="job">
          <el-input v-model="pojo.job" />
        </el-form-item>
        <el-form-item label="薪资待遇" prop="money">
          <el-input v-model="pojo.money" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo._id === null ? addData('pojoForm') : updateData('pojoForm')
          "
          >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
// Teacher 作为子组件
import Teacher from "@/views/teacher";
export default {
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页, 默认第1页
      pageSize: 10, // 每页显示条数， 10条
      search: {
        // 条件查询绑定条件值
        stunum: "",
        name: "",
        teacher: "",
        class: "",
        teacher: "",
      },
      dialogTeacherVisible: false,
      pojo: {
        _id: null,
        stunum: "",
        name: "",
        admissiondate: "",
        phone: "",
        teacher: "",
        teacherId: "",
        class: "",
        job: "",
        money: "",
      },
      dialogFormVisible: false,
      rules: {
        stunum: [{ required: true, message: "学号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "学员姓名不能为空", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
        ],
      },
      isEdit: false,
    };
  },
  // 注册子组件
  components: { Teacher },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      studentApi
        .search(this.currentPage, this.pageSize, this.search)
        .then((response) => {
          const reqs = response.data;
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },

    handleEdit(id) {
      // 重用打开新增窗口方法, 不要少了 this
      this.handleAdd();
      // 查询数据
      studentApi.getById(id).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        }
      });
    },
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，提交添加
          this.pojo.admissiondate = this.formatDate(this.pojo.admissiondate);
          studentApi.update(this.pojo).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
              this.$message({
                message: resp.message,
                type: "success",
              });
            } else {
              // 验证不通过
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
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
          studentApi.deleteById(id).then((response) => {
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
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    },
    // 编辑窗口打开教师列表
    editOptionTeacher() {
      this.isEdit = true;
      this.dialogTeacherVisible = true;
    },
    optionTeacher(currentRow) {
      if (this.isEdit) {
        this.pojo.teacher = currentRow.name; // 教师名称
        this.pojo.teacherId = currentRow.id; // 教师ID
      } else {
        this.search.teacher = currentRow.name; // 教师名称
        this.search.teacherId = currentRow.id; // 教师ID
      }
      this.isEdit = false;
      this.dialogTeacherVisible = false; //关闭窗口
    },
    // 根据条件查询学员列表
    searchData() {
      //将页码设置回1，防止后台只查询到1条数据，但是却返回其他页码，从而数据返回空
      this.currentPage = 1;
      this.fetchData();
    },
    // 提交新增数据
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，提交添加
          this.pojo.admissiondate = this.formatDate(this.pojo.admissiondate);
          studentApi.add(this.pojo).then((response) => {
            const resp = response.data;
            if (resp) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              // 验证不通过
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
  },
};
</script>

<style scoped>
  
</style>