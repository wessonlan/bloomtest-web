<template>
  <div>
    <!--接口定义-模块树节点过滤-->
    <div>
      <!--创建接口按钮-->
      <el-input v-model="filterText" placeholder="关键字过滤" style="margin-bottom:20px; width: 150px" />
      <!--<el-button type="primary" size="small" style="margin-left: 10px" @click="handleApiAdd">创建接口</el-button>-->
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
  </div>
</template>

<script>
import { getApiListByModuleId } from '@/api/apiDefinition'
import { deleteNode } from '@/api/apiModule'

export default {
  name: 'ModuleTree',
  // 注册组件
  // components: { JsonViewer, vueJsonEditor },
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
      // 把对话框的值赋给data的name字段传给后端
      this.currentNode = data
      // console.log('传入的node：' + JSON.stringify(data))
      this.dialogStatus = 'create'
    },
    edit(data) {
      // console.log(data)
      // 打开对话框
      this.dialogFormVisible = true
      // 把 data 赋给 currentNode，用于后面其他方法的请求
      this.currentNode = data
      // 把 name 赋值给 this.form.nodeName 用于外显
      this.form.nodeName = data.name
      // 点击保存的时候，判断后调用 handleNodeUpdate 方法
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
        this.queryModuleList()
      })
    },
    // 点击模块树的节点，查询对应模块id下的 api 列表
    getApi(data) {
      getApiListByModuleId(data.projectId, data.id, 1, 5)
        .then(response => {
          // 把接口返回的数据，传到列表组件里
          this.$bus.$emit('getModuleApiList', response.data, data)
        })
    }
  }
}
</script>

<style scoped>

</style>
