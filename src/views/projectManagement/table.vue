<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="projectQuery.projectName"
        style="width:20%"
        size="small"
        placeholder="输入项目名称"
        clearable
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        style="margin-left: 10px"
        @click="fetchData"
      >查询</el-button>
      <el-button
        type="primary"
        size="small"
        round
        @click="handleAdd"
      >新增项目</el-button>
    </div>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column
        prop="id"
        label="项目id"
        width="100"
        align="center"
      />
      <el-table-column
        prop="projectName"
        label="项目名称"
        width="300"
        align="center"
      />
      <el-table-column
        prop="description"
        label="项目描述"
        width="300"
        align="center"
      />
      <el-table-column
        prop="createUser"
        label="创建人"
        width="150"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="150"
        align="center"
      />
      <el-table-column
        prop="updateTime"
        label="修改时间"
        width="150"
        align="center"
      />
      <el-table-column
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, pager, next"
      :page-size="size"
      :current-page.sync="currentPage"
      :total="total"
      @current-change="fetchData"
    />
    <!-- Form -->
    <el-dialog title="项目信息" :visible.sync="dialogFormVisible" destroy-on-close>
      <el-form :model="form">
        <el-form-item label="项目名称" :label-width="formLabelWidth" style="width: 50%">
          <el-input v-model="form.projectName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目描述" :label-width="formLabelWidth" style="width: 80%">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?add():updateData()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addProject, updateProject } from '@/api/projectManagement'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      projectQuery: {
        id: null,
        projectName: ''
      },
      currentPage: 1,
      size: 10,
      total: null,
      dialogFormVisible: false,
      form: {
        projectName: '',
        description: ''
      },
      formLabelWidth: '80px',
      dialogStatus: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.currentPage, this.size, this.projectQuery).then(response => {
        this.list = response.data.records
        this.currentPage = response.data.current
        this.size = response.data.size
        this.total = response.data.total
        this.listLoading = false
      })
    },
    add(form) {
      addProject(this.form).then(response => {
        // 保存成功提示信息
        if (response.code === 20000) {
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error('保存失败')
        }
        // 关闭对话框
        this.dialogFormVisible = false
        // 清空表单
        this.form.projectName = ''
        this.form.description = ''
        // 刷新列表
        this.fetchData()
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.projectQuery.id = row.id
      getList(this.currentPage, this.size, this.projectQuery).then(response => {
        this.form.projectName = response.data.records[0].projectName
        this.form.description = response.data.records[0].description
      })
    },
    updateData() {
      updateProject({
        'id': this.projectQuery.id,
        'projectName': this.form.projectName,
        'description': this.form.description
      }).then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error('更新失败')
        }
        // 关闭对话框
        this.dialogFormVisible = false
        // 清除查询条件里的id
        this.projectQuery.id = ''
        // 刷新列表
        this.fetchData()
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    }
  }
}
</script>
