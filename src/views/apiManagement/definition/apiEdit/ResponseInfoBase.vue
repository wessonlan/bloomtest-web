<template>
  <div>
    <el-divider content-position="left">响应内容</el-divider>
    <el-tabs v-model="activeName">
      <el-tab-pane label="响应体" name="respBody">
        <ResponseBody />
      </el-tab-pane>
      <el-tab-pane label="响应头" name="respHeaders">
        <ResponseHeaders />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ResponseBody from '@/views/apiManagement/definition/responseContent/ResponseBody'
import ResponseHeaders from '@/views/apiManagement/definition/responseContent/ResponseHeaders'

export default {
  name: 'ResponseInfoBase',
  components: { ResponseBody, ResponseHeaders },
  data() {
    return {
      activeName: 'respBody'
    }
  }
}
</script>
