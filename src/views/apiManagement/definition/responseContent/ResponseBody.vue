<template>
  <json-viewer
    expanded
    :expand-depth="5"
    :value="responseInfoBody"
    copyable
    boxed
    sort
  />
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
  name: 'ResponseBody',
  components: { JsonViewer },
  data() {
    return {

    }
  },
  computed: {
    responseInfoBody() {
      return this.$store.state.apiDefinition.responseInfo.respBody
    }
  }
}
</script>
