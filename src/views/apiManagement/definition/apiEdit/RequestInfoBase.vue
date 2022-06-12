<template>
  <div>
    <el-divider content-position="left">请求参数</el-divider>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="请求头" name="headers">
        <RequestHeader />
      </el-tab-pane>
      <el-tab-pane label="QUERY参数" name="parameters">
        <RequestQueryParam />
      </el-tab-pane>
      <el-tab-pane label="REST参数" name="rest">
        <RequestRestParam />
      </el-tab-pane>
      <el-tab-pane label="请求体" name="body">
        <vue-json-editor
          v-model="requestBody"
          :mode="'code'"
        />
      </el-tab-pane>
      <el-tab-pane label="前置操作" name="prepositive">
        待开发
      </el-tab-pane>
      <el-tab-pane label="后置操作" name="postpositive">
        待开发
      </el-tab-pane>
      <el-tab-pane label="断言规则" name="assert">
        <ApiAssertions :assertions="assertions" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RequestHeader from '../requestContent/RequestHeader'
import RequestRestParam from '../requestContent/RequestRestParam'
import vueJsonEditor from 'vue-json-editor'
import RequestQueryParam from '../requestContent/RequestQueryParam'
import ApiAssertions from '../assertion/ApiAssertions'

export default {
  name: 'RequestInfoBase',
  components: { RequestQueryParam, RequestHeader, RequestRestParam, vueJsonEditor, ApiAssertions },
  props: {
  },
  data() {
    return {
      activeName: 'parameters',
      assertions: {
        jsonPath: []
      }
    }
  },
  computed: {
    storeAssertions: {
      get() {
        return this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.assertions
      },
      set(value) {
        this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.assertions = value
      }
    },
    requestBody: {
      get() {
        return this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.body
      },
      set(value) {
        this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.body = value
      }
    },
    paramInfo: {
      get() {
        return this.$store.state.apiDefinition.saveApiRequest.reqParamInfo
      },
      set(value) {
        this.$store.state.apiDefinition.saveApiRequest.reqParamInfo = value
      }
    },
    headerInfo: {
      get() {
        return this.$store.state.apiDefinition.saveApiRequest.headersKeyValue
      },
      set(value) {
        this.$store.state.apiDefinition.saveApiRequest.headersKeyValue = value
      }
    }
  },
  watch: {
    assertions: {
      handler(newData) {
        // 把值付给store里的变量
        this.storeAssertions = this.assertions
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // console.log('RequestInfoBase 组件this.assertions', this.assertions)
    // console.log('paramInfo:', this.paramInfo)
  },
  methods: {
    handleClick() {
      // console.log('当前tabactiveName', this.activeName)
    }
  }
}
</script>
