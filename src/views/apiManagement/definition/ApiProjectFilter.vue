<template>
  <div>
    <el-select
      v-model="projectValue"
      filterable
      placeholder="项目"
      style="width: 120px"
      value=""
      @change="queryModuleList()"
    >
      <el-option
        v-for="item in projectList"
        :key="item.id"
        :label="item.projectName"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import { getModuleList } from '@/api/apiModule'

export default {
  name: 'ApiProjectFilter',
  props: ['projectList'],
  data() {
    return {
      projectValue: ''
    }
  },
  computed: {
    initProjectInfo() {
      return this.$store.state.apiDefinition.initProjectInfo
    }
  },
  watch: {
    initProjectInfo: {
      // 接口管理页面，初始化的时候选择一个默认项目查询树节点
      handler() {
        if (this.initProjectInfo !== {}) {
          this.projectValue = this.initProjectInfo.id
          this.queryModuleList()
          // 全局事件总线，给ModuleTree组件，传过去一个值，表示需要初始化查询
          this.$bus.$emit('needInitTree', true)
        }
      }
    }
  },
  methods: {
    queryModuleList() {
      // 把当前的项目id 放到 vuex中
      this.$store.state.apiDefinition.currentProjectId = this.projectValue
      getModuleList(this.projectValue).then(response => {
        this.$emit('getModuleList', response.data)
        this.$store.commit('apiDefinition/GET_MODULE_LIST', response.data)
      })
    }
  }
}
</script>
