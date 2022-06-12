<template>
  <div>
    <div class="assertion-add">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select
            v-model="type"
            class="assertion-item"
            placeholder="选择类型"
            size="small"
            value=""
          >
            <el-option label="JSONPath" :value="options.JSON_PATH" />
            <el-option label="文本" :value="options.TEXT" />
            <el-option label="响应时长" :value="options.DURATION" />
          </el-select>
        </el-col>
        <el-col :span="20">
          <ApiAssertionJsonPath
            v-if="type === options.JSON_PATH"
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
      :assertions="assertions"
      style="margin-bottom: 20px"
    />
  </div>
</template>

<script>
import ApiAssertionsEdit from '@/views/apiManagement/definition/assertion/ApiAssertionsEdit'
import ApiAssertionJsonPath from '@/views/apiManagement/definition/assertion/ApiAssertionJsonPath'
import { ASSERTION_TYPE } from '@/model/ApiTestModel'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'ApiAssertions',
  components: { ApiAssertionsEdit, ApiAssertionJsonPath },
  props: {
    assertions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      options: ASSERTION_TYPE,
      type: '',
      reloadData: ''
    }
  },
  computed: {
    // assertions: {
    //   get() {
    //     return this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.assertions
    //   },
    //   set(value) {
    //     this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.assertions = value
    //   }
    // }
  },
  watch: {
    type() {
      // console.log('this.type:', this.type)
    }
  },
  mounted() {
    // console.log('ApiAssertions组件this.assertions', this.assertions)
  },
  methods: {
    after() {
      this.type = ''
    }
  }
}
</script>

<style scoped>
    .assertion-item {
        width: 100%;
    }

    .assertion-add {
        padding: 10px;
        margin: 5px 0;
        border-radius: 5px;
        border: #DCDFE6 solid 1px;
    }
</style>
