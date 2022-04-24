<template>
  <el-dialog
    title="接口定义"
    :visible.sync="dialogVisible"
    width="73%"
  >
    <!--基础信息组件-->
    <BasicInfo />
    <!--请求参数组件-->
    <RequestInfoBase />
    <!--请求响应组件-->
    <ResponseInfoBase />

    <!--测试按钮-->
    <!--<el-button type="primary" size="small" style="margin-left: 10px" @click="test">test</el-button>-->
  </el-dialog>
</template>

<script>
import BasicInfo from '@/views/apiManagement/definition/apiEdit/BasicInfo'
import RequestInfoBase from '@/views/apiManagement/definition/apiEdit/RequestInfoBase'
import ResponseInfoBase from '@/views/apiManagement/definition/apiEdit/ResponseInfoBase'

export default {
  name: 'EditDialog',
  components: { RequestInfoBase, BasicInfo, ResponseInfoBase },
  data() {
    return {

    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.$store.state.apiDefinition.createApiRelative.apiEditDialogVisible
      },
      set(value) {
        this.$store.state.apiDefinition.createApiRelative.apiEditDialogVisible = value
      }
    }
  },
  mounted() {
    // 初始化查询第一个项目下的tree，接着初始化查询该项目下的默认节点全部接口

  },
  methods: {
    test() {
      // console.log('state中的请求数据@@@', this.$store.state.apiDefinition.saveApiRequest)
    }
  }
}
</script>

<style scoped>

</style>
