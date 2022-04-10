<template>
  <el-dialog
    title="接口定义"
    :visible.sync="dialogVisible"
    width="73%"
  >
    <!--基础信息组件-->
    <BasicInfo />

    <!--测试用按钮-->
    <el-button type="primary" size="small" style="margin-left: 10px" @click="test">test</el-button>
  </el-dialog>
</template>

<script>
import BasicInfo from '@/views/apiManagement/definition/apiEdit/BasicInfor'
export default {
  name: 'EditDialog',
  components: { BasicInfo },
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
  methods: {
    test() {
      console.log('test111')
    }
  }
}
</script>

<style scoped>

</style>
