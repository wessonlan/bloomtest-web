<template>
  <div>
    <!--基础信息-->
    <el-divider content-position="left">基础信息</el-divider>
    <el-form :inline="true" :model="apiInfo" class="demo-form-inline">
      <div>
        <el-form-item label="名称:">
          <el-input v-model="apiInfo.name" placeholder="" />
        </el-form-item>
        <el-form-item label="描述:">
          <el-input v-model="apiInfo.description" placeholder="" />
        </el-form-item>
        <!--模块-级联选择器-->
        <el-form-item label="模块:">
          <el-cascader
            v-model="apiInfo.moduleId"
            :show-all-levels="false"
            filterable
            placeholder="选择模块"
            clearable
            :options="moduleTree"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            @change="handleChange"
          />
        </el-form-item>
        <div>
          <el-form-item label="请求:">
            <el-select v-model="apiInfo.method" placeholder="方法" value="" style="width: 50%">
              <el-option label="GET" value="get" />
              <el-option label="POST" value="post" />
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: -10%">
            <el-input v-model="apiInfo.host" placeholder="Host" style="width: 150%" />
          </el-form-item>
          <el-form-item style="margin-left: 8%">
            <el-input v-model="apiInfo.path" placeholder="请输入接口的URL，如/api/demo/#{id}，其中id为路径参数" style="width: 200%" />
          </el-form-item>
          <el-form-item style="margin-left: 18%">
            <el-button type="success" @click="apiTestRun">发送</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createOrUpdateDialog==='create'?saveApi():updateApi()">保存</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { saveApiDefinition, runTestApi } from '@/api/apiDefinition'

export default {
  name: 'BasicInfo',
  data() {
    return {
      currentModuleList: []
    }
  },
  computed: {
    createOrUpdateDialog() {
      return this.$store.state.apiDefinition.createApiRelative.apiDefinitionDialogStatus
    },
    editDialogVisible: {
      get() {
        return this.$store.state.apiDefinition.createApiRelative.apiEditDialogVisible
      },
      set(boolean) {
        this.$store.state.apiDefinition.createApiRelative.apiEditDialogVisible = boolean
      }
    },
    moduleTree() {
      return this.$store.state.apiDefinition.moduleTreeRelative.moduleList
    },
    apiInfo() {
      return this.$store.state.apiDefinition.saveApiRequest
    },
    paramKeyValue() {
      return this.apiInfo.reqParamInfo.paramKeyValue
    },
    restKeyValue() {
      return this.apiInfo.reqParamInfo.restKeyValue
    },
    body() {
      return this.apiInfo.reqParamInfo.body
    }
  },
  methods: {
    handleChange() {},
    saveApi() {
      this.apiInfo.projectId = this.$store.state.apiDefinition.currentProjectId
      this.apiInfo.moduleId = this.apiInfo.moduleId[this.apiInfo.moduleId.length - 1]
      this.apiInfo.headersKeyValue = JSON.stringify(this.apiInfo.headersKeyValue)
      this.apiInfo.reqParamInfo = JSON.stringify(this.apiInfo.reqParamInfo)
      this.apiInfo.responseInfo = JSON.stringify(this.apiInfo.responseInfo)
      if (this.apiInfo.requestType === null) {
        this.$store.state.apiDefinition.saveApiRequest.requestType = 2
      }
      saveApiDefinition(this.apiInfo).then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '新增成功',
            type: 'success',
            duration: 2000
          })
        }
        this.editDialogVisible = false
        // 重新刷新列表，更新vuex里的 refreshApiList 字段 为true触发
        this.$store.state.apiDefinition.refreshApiList = true
        // 初始化请求对象
        this.$store.commit('apiDefinition/INIT_SAVE_API_REQUEST')
        // 这里是解决上面的方法无法初始化 ParamType组件里的v-model
        this.$bus.$emit('clear', true)
      })
    },
    updateApi() {
    },
    apiTestRun() {
      console.log('发送请求@@@', this.apiInfo)
      runTestApi()
    },
    checkRequestType() {},
    checkRequestNull() {}
  }
}
</script>
