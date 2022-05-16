<template>
  <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ResponseHeaders',
  data() {
    return {
      headers: []
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
        for (const x in this.respHeaders[0]) {
          const tempObj = {}
          tempObj[x] = this.respHeaders[0][x][0]
          this.headers.push(tempObj)
        }
        console.log(this.headers)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
