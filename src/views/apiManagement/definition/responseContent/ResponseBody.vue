<template>
  <div>
    <el-divider content-position="left">响应内容</el-divider>
    <el-tabs>
      <el-tab-pane label="响应体">
        <json-viewer
          expanded
          :expand-depth="5"
          :value="$store.state.apiDefinition.saveApiRequest.responseInfo"
          copyable
          boxed
          sort
        />
      </el-tab-pane>
      <el-tab-pane label="响应头">响应头</el-tab-pane>
      <el-tab-pane label="断言">待开发</el-tab-pane>
      <el-tab-pane label="提取">待开发</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
  name: 'ResponseBody',
  components: { JsonViewer }
}
</script>
