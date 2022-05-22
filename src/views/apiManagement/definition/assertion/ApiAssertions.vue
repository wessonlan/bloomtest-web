<template>
  <div>
    <div class="assertion-add">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select
            v-model="type"
            :disabled="isReadOnly"
            class="assertion-item"
            placeholder="选择类型"
            size="small"
          >
            <el-option :label="'JSONPath'" :value="options.JSON_PATH" />
          </el-select>
        </el-col>
        <el-col :span="20">
          <ApiAssertionJsonPath
            v-if="type === options.JSON_PATH"
            :is-read-only="isReadOnly"
            :list="assertions.jsonPath"
            :callback="after"
          />
          <el-button v-if="!type" :disabled="true" type="primary" size="small">
            添加
          </el-button>
        </el-col>
      </el-row>
    </div>
    <ApiAssertionsEdit
      :is-read-only="isReadOnly"
      :assertions="assertions"
      :reload-data="reloadData"
      style="margin-bottom: 20px"
    />
  </div>
</template>

<script>
import ApiAssertionsEdit from '@/views/apiManagement/definition/assertion/ApiAssertionsEdit'
import ApiAssertionJsonPath from '@/views/apiManagement/definition/assertion/ApiAssertionJsonPath'
import { ASSERTION_TYPE, JSONPath } from '@/model/ApiTestModel'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'ApiAssertions',
  components: { ApiAssertionsEdit, ApiAssertionJsonPath },
  props: {
    draggable: {
      type: Boolean,
      default: false
    },
    isMax: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    assertions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    node: {},
    request: {},
    response: {},
    customizeStyle: {
      type: String,
      default: 'margin-top: 10px'
    },
    isReadOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: ASSERTION_TYPE,
      time: '',
      type: '',
      loading: false,
      reloadData: ''
    }
  },
  methods: {
    after() {
      this.type = ''
      // this.reloadData = getUUID().substring(0, 8)
      this.reloadData = uuidv4()
      this.reload()
    },
    copyRow() {
      this.$emit('copyRow', this.assertions, this.node)
    },
    reload() {
      this.loading = true
      this.$nextTick(() => {
        this.loading = false
      })
    },
    active() {
      this.assertions.active = !this.assertions.active
      this.reload()
    },
    remove() {
      this.$emit('remove', this.assertions, this.node)
    }
  }
}
</script>

<style scoped>

</style>
