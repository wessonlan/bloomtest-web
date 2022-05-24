<template>
  <div v-loading="loading">
    <div v-if="assertions.jsonPath.length > 0" class="assertion-item-editing json_path">
      <div>
        {{ 'JSONPath' }}
      </div>
      <div v-for="(jsonPath, index) in assertions.jsonPath" :key="index" class="regex-item">
        <ApiAssertionJsonPath
          :is-read-only="isReadOnly"
          :list="assertions.jsonPath"
          :json-path="jsonPath"
          :edit="true"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ApiAssertionJsonPath from '@/views/apiManagement/definition/assertion/ApiAssertionJsonPath'

export default {
  name: 'ApiAssertionsEdit',
  components: { ApiAssertionJsonPath },
  props: {
    assertions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isReadOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
  },
  watch: {
    reloadData() {
      this.reload()
    }
  },
  mounted() {
  },
  methods: {
    reload() {
      this.loading = true
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
    .assertion-item-editing {
        padding-left: 10px;
        margin-top: 10px;
    }

    .assertion-item-editing.json_path {
        border-left: 2px solid #1dc7d2;
    }

    .regex-item {
        margin-top: 10px;
    }
</style>
