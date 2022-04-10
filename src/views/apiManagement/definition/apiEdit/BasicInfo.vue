<template>
  <div>
    <!--基础信息-->
    <el-divider content-position="left">基础信息</el-divider>
    <el-form :inline="true" :model="baseInfoForm" class="demo-form-inline">
      <div>
        <el-form-item label="名称:">
          <el-input v-model="baseInfoForm.name" placeholder="" />
        </el-form-item>
        <el-form-item label="描述:">
          <el-input v-model="baseInfoForm.description" placeholder="" />
        </el-form-item>
        <!--模块-级联选择器-->
        <el-form-item label="模块:">
          <el-cascader
            v-model="baseInfoForm.moduleIds"
            :show-all-levels="false"
            filterable
            placeholder="选择模块"
            clearable
            :options="$store.state.apiDefinition.moduleTreeRelative.moduleList"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            @change="handleChange"
          />
        </el-form-item>
        <div>
          <el-form-item label="请求:">
            <el-select v-model="baseInfoForm.method" placeholder="方法" value="" style="width: 50%">
              <el-option label="GET" value="get" />
              <el-option label="POST" value="post" />
              <el-option label="DELETE" value="delete" />
              <el-option label="PUT" value="put" />
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: -10%">
            <el-input v-model="baseInfoForm.host" placeholder="Host" style="width: 150%" />
          </el-form-item>
          <el-form-item style="margin-left: 8%">
            <el-input v-model="baseInfoForm.path" placeholder="Path" style="width: 200%" />
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
export default {
  name: 'BasicInfo',
  data() {
    return {
      currentModuleList: [],
      baseInfoForm: {
        id: '',
        name: '',
        description: '',
        moduleIds: [],
        method: '',
        host: '',
        path: ''
      }
    }
  },
  computed: {
    createOrUpdateDialog() {
      return this.$store.state.apiDefinition.createApiRelative.apiDefinitionDialogStatus
    }
  },
  mounted() {

  },
  methods: {
    handleChange() {},
    apiTestRun() {
      console.log('@@@@@', this.baseInfoForm)
    }
  }
}
</script>

<style scoped>

</style>
