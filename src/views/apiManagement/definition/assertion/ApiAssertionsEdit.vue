<template>
  <div>
    <div v-if="assertions.jsonPath.length > 0" class="assertion-item-editing json_path">
      <div>
        {{ 'JSONPath' }}
      </div>
      <div v-for="(jsonPath, index) in assertions.jsonPath" :key="index" class="regex-item">
        <ApiAssertionJsonPath
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
    }
  },
  data() {
    return {}
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
