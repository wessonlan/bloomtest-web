<template>
  <!-- 节点名称编辑对话框 -->
  <el-dialog title="节点信息" :visible.sync="dialogState.dialogFormVisible" destroy-on-close>
    <el-form :model="form">
      <el-form-item label="模块名称" :label-width="formLabelWidth" style="width: 50%">
        <el-input v-model="form.nodeName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogState.dialogFormVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="dialogState.dialogStatus==='create'? handleNodeAdd():handleNodeUpdate()"
      > 保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addModuleNode, renameModuleNode } from '@/api/apiModule'

export default {
  name: 'TreeNodeDialog',
  props: ['moduleDialogState'],
  data() {
    return {
      // 重新赋值给一个属性，才可以用于修改
      dialogState: this.moduleDialogState,
      form: {
        nodeName: ''
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    handleNodeUpdate() {
      console.log('编辑保存，这时候的', this.dialogState)
      // 传入后端当前节点的 id，实际输入的 name，进行更新
      renameModuleNode({
        id: this.currentNode.id,
        name: this.form.nodeName
      }).then(response => {
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        // this.dialogFormVisible = false
        // 清空表单
        this.form.nodeName = ''
        // 刷新树列表
        this.queryModuleList()
      })
    },
    handleNodeAdd() {
      console.log('新增保存，这时候的', this.dialogState)
      this.currentNode.name = this.form.nodeName
      addModuleNode(this.currentNode).then(response => {
        this.$message({
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        // this.dialogFormVisible = false
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
