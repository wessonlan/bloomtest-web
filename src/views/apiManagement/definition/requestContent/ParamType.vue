<template>
  <!--动态增删表单-->
  <el-form :model="dynamicForm" label-width="100px" class="demo-dynamic">
    <!--请求头动态部分-->
    <el-form-item
      v-for="(domain) in dynamicForm.domains"
      :key="domain.key"
    >
      <span style="margin-left: -100px; margin-top: -200px">
        <el-input v-model="domain.name" style="width: 200px" placeholder="键" />
        <el-input v-model="domain.value" style="width: 200px; margin-left: 5px" placeholder="值" />
        <el-input v-model="domain.describe" style="width: 200px; margin-left: 5px" placeholder="描述" />
        <el-button size="mini" style="margin-left: 5px" icon="el-icon-plus" @click="addDomain" />
        <el-button size="mini" icon="el-icon-minus" @click.prevent="removeDomain(domain)" />
      </span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ParamType',
  props: ['currentTabName'],
  data() {
    return {
      dynamicForm: {
        domains: [
          {
            name: '',
            value: '',
            describe: ''
          }
        ]
      }
    }
  },
  computed: {
    currentRequestRequestType() {
      return this.$store.state.apiDefinition.saveApiRequest.requestType
    },
    currentRequestReqParamInfo() {
      return this.$store.state.apiDefinition.saveApiRequest.reqParamInfo
    }
  },
  watch: {
    // 深度监听
    dynamicForm: {
      // 把表达里的数据发送给父组件
      handler(newData) {
        this.$emit('getArgInfo', newData, this.currentTabName)
      },
      immediate: true,
      deep: true
    },
    currentRequestReqParamInfo: {
      // 监听当前的请求内容，把参数表单内容回显
      handler(newData) {
        console.log('currentRequestRequestType', this.currentRequestRequestType)
        // console.log('currentRequestReqParamInfo', this.currentRequestReqParamInfo.paramKeyValue)
        if (this.currentRequestRequestType === 0) {
          console.log('0')
          this.dynamicForm.domains = this.currentRequestReqParamInfo.paramKeyValue
        }
      }
      // immediate: true
    }
  },
  mounted() {
    this.$bus.$on('clear', (data) => {
      this.dynamicForm = {
        domains: [{
          name: '',
          value: '',
          describe: ''
        }]
      }
    })
  },
  methods: {
    addDomain() {
      this.dynamicForm.domains.push({
        name: '',
        value: '',
        describe: ''
      })
    },
    removeDomain(item) {
      const index = this.dynamicForm.domains.indexOf(item)
      if (index !== -1 && index !== 0) {
        this.dynamicForm.domains.splice(index, 1)
      }
    }
  }
}
</script>
