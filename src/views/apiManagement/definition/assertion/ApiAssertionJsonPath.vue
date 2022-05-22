<template>
  <div v-loading="loading">
    <el-row :gutter="10" type="flex" justify="space-between" align="middle">
      <el-col>
        <el-input
          v-model="jsonPath.expression"
          :disabled="isReadOnly"
          maxlength="200"
          size="small"
          show-word-limit
          placeholder="JSONPath表达式"
        />
      </el-col>
      <el-col>
        <el-select v-model="jsonPath.option" class="ms-col-type" size="small" style="width:40%;margin-right: 10px" value="REGEX" @change="reload">
          <el-option label="包含" value="CONTAINS" />
          <el-option label="不包含" value="NOT_CONTAINS" />
          <el-option label="等于" value="EQUALS" />
          <el-option label="不等于" value="NOT_EQUALS" />
          <el-option label="大于" value="GT" />
          <el-option label="小于" value="LT" />
          <el-option label="正则匹配" value="REGEX" />
        </el-select>
        <el-input
          v-model="jsonPath.expect"
          :disabled="isReadOnly"
          size="small"
          show-word-limit
          placeholder="预期值"
          style="width: 50%"
        />
        <el-tooltip v-if="jsonPath.option === 'REGEX'" placement="top">
          <div slot="content">特殊字符"$ ( ) * + . [ ] \ ^ { } |"需转义为"\ "+"特殊字符",如"\$"</div>
          <i class="el-icon-question" style="cursor: pointer" />
        </el-tooltip>
      </el-col>
      <el-col class="assertion-btn" style="width: 30%">
        <el-button v-if="edit" :disabled="isReadOnly" type="danger" size="mini" icon="el-icon-delete" circle @click="remove" />
        <el-button v-else :disabled="isReadOnly" type="primary" size="small" @click="add">
          添加
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { JSONPath } from '@/model/ApiTestModel'

export default {
  name: 'ApiAssertionJsonPath',
  props: {
    jsonPath: {
      type: Object,
      default: () => {
        return new JSONPath()
      }
    },
    edit: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    callback: {
      type: Function,
      default: function() {}
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
  watch: {
    'jsonPath.expect'() {
      this.setJSONPathDescription()
    },
    'jsonPath.expression'() {
      this.setJSONPathDescription()
    }
  },
  methods: {
    add: function() {
      this.list.push(this.getJSONPath())
      this.callback()
    },
    remove: function() {
      this.list.splice(this.index, 1)
    },
    getJSONPath() {
      const jsonPath = new JSONPath(this.jsonPath)
      jsonPath.description = jsonPath.expression + ' expect: ' + (jsonPath.expect ? jsonPath.expect : '')
      return jsonPath
    },
    reload() {
      this.loading = true
      this.$nextTick(() => {
        this.loading = false
      })
    },
    setJSONPathDescription() {
      this.jsonPath.description = this.jsonPath.expression + ' expect: ' + (this.jsonPath.expect ? this.jsonPath.expect : '')
    }
  }
}
</script>

<style scoped>

</style>
