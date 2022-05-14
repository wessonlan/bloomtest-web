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
  watch: {
    dialogVisible: {
      // 当接口编辑页面关闭，初始化请求内容
      handler() {
        if (this.dialogVisible === false) {
          // 初始化请求对象
          this.$store.commit('apiDefinition/INIT_SAVE_API_REQUEST')
          // 这里是解决上面的方法无法初始化 ParamType组件里的v-model
          // this.$bus.$emit('clear', true)
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    test() {
    }
  }
}
</script>
