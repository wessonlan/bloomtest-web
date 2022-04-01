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
      projectValue: '',
      moduleListData: []
    }
  },
  methods: {
    queryModuleList() {
      getModuleList(this.projectValue).then(response => {
        this.moduleListData = response.data
        this.$emit('getModuleList', response.data)
      })
    }
    // initProjectApi() {
    //   this.listLoading = true
    //   getApiListByModuleId(this.value, 0, this.currentPage, this.size)
    //     .then(response => {
    //       this.tableData = response.data.records
    //       this.currentPage = response.data.current
    //       this.size = response.data.size
    //       this.total = response.data.total
    //       this.listLoading = false
    //     })
    // }
  }
}
</script>
