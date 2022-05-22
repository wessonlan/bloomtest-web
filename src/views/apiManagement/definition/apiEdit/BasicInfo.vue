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
            <el-input v-model="apiInfo.host" placeholder="host" style="width: 150%" />
          </el-form-item>
          <el-form-item style="margin-left: 8%">
            <el-input v-model="apiInfo.path" placeholder="输入接口path，如/api/demo/:id，其中id为路径参数" style="width: 200%" />
          </el-form-item>
          <el-form-item style="margin-left: 18%">
            <el-button type="success" @click="apiTestRun">发送</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveApi()">保存</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { saveApiDefinition, updateApiDefinition, runTestApi } from '@/api/apiDefinition'

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
    handleChange() {
      console.log('变化了：apiInfo.moduleId', this.apiInfo.moduleId)
    },
    saveApi() {
      this.apiInfo.projectId = this.$store.state.apiDefinition.currentProjectId
      this.apiInfo.headersKeyValue = JSON.stringify(this.apiInfo.headersKeyValue)
      this.apiInfo.reqParamInfo = JSON.stringify(this.apiInfo.reqParamInfo)
      this.apiInfo.responseInfo = JSON.stringify({})
      if (this.createOrUpdateDialog === 'create') {
        this.apiInfo.moduleId = this.apiInfo.moduleId[this.apiInfo.moduleId.length - 1]
        saveApiDefinition(this.apiInfo).then(response => {
          if (response.code === 20000) {
            this.$message({
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        updateApiDefinition(this.apiInfo).then(response => {
          if (response.code === 20000) {
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      }
      this.editDialogVisible = false
      // 重新刷新列表，更新vuex里的 refreshApiList 字段 为true触发
      this.$store.state.apiDefinition.refreshApiList = true
      // 初始化请求对象
      this.$store.commit('apiDefinition/INIT_SAVE_API_REQUEST')
    },
    apiTestRun() {
      const requestObj = { ...this.apiInfo }
      requestObj.headersKeyValue = JSON.stringify(this.apiInfo.headersKeyValue)
      requestObj.reqParamInfo = JSON.stringify(this.apiInfo.reqParamInfo)
      // requestObj.responseInfo.body = JSON.stringify(this.apiInfo.responseInfo)
      runTestApi(requestObj).then(response => {
        if (response.code === 20000) {
          try {
            this.$store.state.apiDefinition.responseInfo.respBody = JSON.parse(response.data.body)
            this.$store.state.apiDefinition.responseInfo.respHeaders = response.data.responseHeaders
            this.$message({
              message: '发送请求成功',
              type: 'success',
              duration: 2000
            })
          } catch (e) {
            this.$message.error('接口返回内容错误')
          }
        } else {
          this.$message.error('发送请求失败')
        }
      })
    },
    checkRequestType() {},
    checkRequestNull() {}
  }
}
</script>
