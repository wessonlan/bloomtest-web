<template>
  <el-card class="box-card">
    <div v-for="(i, v) in headersObj" :key="v" class="text item">
      {{ v + '：' + i }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ResponseHeaders',
  data() {
    return {
      headersObj: {}
    }
  },
  computed: {
    respHeaders() {
      return this.$store.state.apiDefinition.responseInfo.respHeaders
    }
  },
  watch: {
    respHeaders: {
      handler() {
        this.headersObj = this.respHeaders[0]
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
