<template>
  <div>
    <el-divider content-position="left">请求参数</el-divider>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="请求头" name="headers">
        <!--<ParamType-->
        <!--:current-tab-name="activeName"-->
        <!--:current-data="headers"-->
        <!--@getArgInfo="getArgInfo"-->
        <!--/>-->
        <RequestHeader />
      </el-tab-pane>
      <el-tab-pane label="QUERY参数" name="parameters">
        <!--<ParamType-->
        <!--:current-tab-name="activeName"-->
        <!--:current-data="params"-->
        <!--@getArgInfo="getArgInfo"-->
        <!--/>-->
        <RequestQueryParam />
      </el-tab-pane>
      <el-tab-pane label="REST参数" name="rest">
        <!--<ParamType-->
        <!--:current-tab-name="activeName"-->
        <!--:current-data="rests"-->
        <!--@getArgInfo="getArgInfo"-->
        <!--/>-->
        <RequestRestParam />
      </el-tab-pane>
      <el-tab-pane label="请求体" name="body">
        <vue-json-editor
          v-model="body"
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
        待开发
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ParamType from '../requestContent/ParamType'
import RequestHeader from '../requestContent/RequestHeader'
import RequestRestParam from '../requestContent/RequestRestParam'
import vueJsonEditor from 'vue-json-editor'
import RequestQueryParam from '../requestContent/RequestQueryParam'

export default {
  name: 'RequestInfoBase',
  components: { RequestQueryParam, ParamType, RequestHeader, RequestRestParam, vueJsonEditor },
  data() {
    return {
      activeName: 'parameters',
      headers: [{
        name: '',
        value: '',
        describe: ''
      }],
      params: [{
        name: '',
        value: '',
        describe: ''
      }],
      rests: [{
        name: '',
        value: '',
        describe: ''
      }]
    }
  },
  computed: {
    body: {
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
    },
    requestContent() {
      // console.log('Base组件中，拿到的requestContent：', this.$store.state.apiDefinition.saveApiRequest)
      return this.$store.state.apiDefinition.saveApiRequest
    }
  },
  watch: {
    requestContent() {
      // 把监听到的数据传给ParamType组件
      this.headers = this.headerInfo
      this.params = this.paramInfo.paramKeyValue
      this.rests = this.paramInfo.restKeyValue
    }
  },
  methods: {
    handleClick() {
      // console.log('当前tabactiveName', this.activeName)
    }
    // getArgInfo(data, currentTabName) {
    //   // console.log('getArgInfo被调用，data：', data)
    //   // 收到子组件 ParamType 传来的数据，根据不同参数类型argType，赋值给 vuex里的state
    //   if (currentTabName === 'headers') {
    //     console.log('headers赋值：', data.domains)
    //     this.headerInfo = data.domains
    //   } else if (currentTabName === 'parameters') {
    //     this.paramInfo.paramKeyValue = data.domains
    //     console.log('paramKeyValue 赋值：', data.domains)
    //     // console.log('data.domains:', data.domains)
    //     // console.log('getArgInfo被调用,此时：', this.paramInfo)
    //     this.$store.state.apiDefinition.saveApiRequest.requestType = 0
    //   } else if (currentTabName === 'rest') {
    //     console.log('rest 赋值：', data.domains)
    //     this.paramInfo.restKeyValue = data.domains
    //     this.$store.state.apiDefinition.saveApiRequest.requestType = 1
    //   }
    // }
  }
}
</script>
