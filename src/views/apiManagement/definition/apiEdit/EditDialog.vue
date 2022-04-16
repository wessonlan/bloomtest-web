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

    测试用按钮
    <el-button type="primary" size="small" style="margin-left: 10px" @click="test">test</el-button>
  </el-dialog>
</template>

<script>
import BasicInfo from '@/views/apiManagement/definition/apiEdit/BasicInfo'
import RequestInfoBase from '@/views/apiManagement/definition/apiEdit/RequestInfoBase'

export default {
  name: 'EditDialog',
  components: { RequestInfoBase, BasicInfo },
  data() {
    return {
      // saveApiRequest: {
      //   id: '',
      //   name: '',
      //   description: '',
      //   moduleId: '',
      //   projectId: '',
      //   host: '',
      //   path: '',
      //   method: '',
      //   apiHeader: '',
      //   request: '',
      //   response: '',
      //   requestType: ''
      // }
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
  },
  methods: {
    test() {
      console.log('state中的请求数据', this.$store.state.apiDefinition.saveApiRequest)
    },
    apiTestRun() {},
    saveApi() {},
    updateApi() {}
  }
}
</script>

<style scoped>

</style>
