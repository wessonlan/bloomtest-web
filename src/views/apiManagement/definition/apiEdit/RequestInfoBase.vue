<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="请求头" name="headers">
        <ParamType
          :current-tab-name="activeName"
          @getArgInfo="getArgInfo"
        />
      </el-tab-pane>
      <el-tab-pane label="QUERY参数" name="parameters">
        <ParamType
          :current-tab-name="activeName"
          @getArgInfo="getArgInfo"
        />
      </el-tab-pane>
      <el-tab-pane label="REST参数" name="rest">
        <ParamType
          :current-tab-name="activeName"
          @getArgInfo="getArgInfo"
        />
      </el-tab-pane>
      <el-tab-pane label="请求体" name="body">
        请求体
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
    <!--&lt;!&ndash;测试按钮&ndash;&gt;-->
    <!--<el-button type="primary" size="small" style="margin-left: 10px" @click="test">test</el-button>-->
  </div>
</template>

<script>
import ParamType from '../requestContent/ParamType'
export default {
  name: 'RequestInfoBase',
  components: { ParamType },
  data() {
    return {
      activeName: 'parameters'
    }
  },
  methods: {
    handleClick() {
      console.log('当前tabactiveName', this.activeName)
    },
    getArgInfo(data, currentTabName) {
      // 收到子组件 ParamType 传来的数据，根据不同参数类型argType，赋值给 vuex里的state
      if (currentTabName === 'headers') {
        this.$store.state.apiDefinition.saveApiRequest.apiHeaders = data.domains
      } else {
        this.$store.state.apiDefinition.saveApiRequest.requestInfo = data.domains
      }
    }
    // test() {
    //   console.log('@@@@')
    // }
  }
}
</script>
