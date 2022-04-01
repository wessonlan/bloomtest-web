<template>
  <!-- 节点名称编辑对话框 -->
  <el-dialog title="节点信息" :visible.sync="dialogFormVisible" destroy-on-close>
    <el-form :model="form">
      <el-form-item label="模块名称" :label-width="formLabelWidth" style="width: 50%">
        <el-input v-model="form.nodeName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?handleNodeAdd():handleNodeUpdate()">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addModuleNode, renameModuleNode } from '../../../api/apiModule'

export default {
  name: 'TreeNodeDialog',
  // 注册组件
  // components: { JsonViewer, vueJsonEditor },
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      form: {
        nodeName: ''
      }
    }
  },
  methods: {
    handleNodeUpdate() {
      // 传入后端当前节点的 id，实际输入的name，进行更新
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
        this.queryModuleList()
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
        // 刷新树列表
        this.queryModuleList()
      })
    }
  }
}
</script>

<style scoped>

</style>
