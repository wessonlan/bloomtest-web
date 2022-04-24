<template>
  <div>
    <!--接口定义-模块树节点过滤-->
    <div>
      <!--创建接口按钮-->
      <el-input v-model="filterText" placeholder="关键字过滤" style="margin-bottom:20px; width: 150px" />
      <el-button type="primary" size="small" style="margin-left: 10px" @click="handleApiAdd">创建接口</el-button>
    </div>
    <!--接口定义-模块树-->
    <div class="custom-tree-container">
      <el-tree
        ref="tree"
        class="filter-tree"
        default-expand-all
        :data="data"
        :props="defaultProps"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @node-click="getApi"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span style="margin-left: 10px">
            <el-button
              class="el-icon-folder-add"
              type="text"
              size="mini"
              @click="() => append(data)"
            />
            <el-button
              class="el-icon-edit-outline"
              type="text"
              size="mini"
              @click="() => edit(data)"
            />
            <el-button
              class="el-icon-delete"
              type="text"
              size="mini"
              @click="() => remove(data)"
            />
          </span>
        </span>
      </el-tree>
    </div>
    <!--模块树编辑对话框-->
    <el-dialog title="节点信息" :visible.sync="dialogFormVisible" destroy-on-close>
      <el-form :model="form">
        <el-form-item label="模块名称" :label-width="formLabelWidth" style="width: 50%">
          <el-input v-model="form.nodeName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'? handleNodeAdd():handleNodeUpdate()"
        > 保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getApiListByModuleId } from '@/api/apiDefinition'
import { getModuleList, deleteNode, addModuleNode, renameModuleNode } from '@/api/apiModule'

export default {
  name: 'ModuleTree',
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentNode: {},
      dialogFormVisible: false,
      dialogStatus: '',
      form: {
        nodeName: ''
      },
      formLabelWidth: '80px'
    }
  },
  mounted() {
    // 全局事件总线-接收来自项目过滤组件传递来的数据
    this.$bus.$on('getModule', (data) => {
      this.data = data
    })
  },
  beforeDestroy() {
    // 销毁时解绑自定义事件
    this.$bus.$off('getModule')
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    append(data) {
      this.dialogFormVisible = true
      // 把对话框的值赋给 data的 name字段传给后端
      this.currentNode = data
      // console.log('传入的 node：' + JSON.stringify(data))
      this.dialogStatus = 'create'
    },
    edit(data) {
      this.currentNode = data
      this.form.nodeName = data.name
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    remove(data) {
      deleteNode(data.id).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        // 刷新树列表
        this.queryModuleList(data.projectId)
      })
    },
    // 点击模块树的节点，查询对应模块id下的 api 列表
    getApi(data) {
      // 当前 node放到 vuex中
      this.$store.state.apiDefinition.currentNode = { ...data }
      // 调用后端接口查询 api
      getApiListByModuleId(data.projectId, data.id, 1, 5)
        .then(response => {
          // 把接口返回的数据，传到列表组件里
          this.$bus.$emit('getModuleApiList', response.data, data)
        })
    },
    // 刷新模块树
    queryModuleList(projectId) {
      getModuleList(projectId).then(response => {
        this.data = response.data
      })
    },
    handleNodeAdd() {
      this.currentNode.name = this.form.nodeName
      addModuleNode(this.currentNode).then(response => {
        this.$message({
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.dialogFormVisible = false
        // 清空表单
        this.form.nodeName = ''
        // 把 projectId 传给父组件，刷新树列表
        console.log('this.currentNode.projectId', this.currentNode.projectId)
        this.queryModuleList(this.currentNode.projectId)
      })
    },
    handleNodeUpdate() {
      renameModuleNode({
        id: this.currentNode.id,
        name: this.form.nodeName
      }).then(response => {
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        this.dialogFormVisible = false
        // 清空表单
        this.form.nodeName = ''
        // 刷新树列表
        this.queryModuleList(this.currentNode.projectId)
      })
    },
    handleApiAdd() {
      this.$store.commit('apiDefinition/CHANGE_DIALOG', 'create')
    }
  }
}
</script>

<style scoped>

</style>
