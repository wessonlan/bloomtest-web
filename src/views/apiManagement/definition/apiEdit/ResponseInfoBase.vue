<template>
  <div>
    <el-divider content-position="left">响应内容</el-divider>
    <el-tabs>
      <el-tab-pane label="响应体">
        <ResponseBody />
      </el-tab-pane>
      <el-tab-pane label="响应头">
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
  components: { ResponseBody, ResponseHeaders }
}
</script>
