<template>
  <!--接口列表过滤-->
  <el-container>
    <el-main style="padding-top: 10px;">
      <template>
        <el-table
          v-loading="listLoading"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="100"
          />
          <el-table-column
            prop="name"
            label="接口名称"
            width="200"
          />
          <el-table-column
            prop="method"
            label="请求方法"
            width="120"
          />
          <el-table-column
            prop="path"
            label="路径"
            width="120"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="120"
          />
          <el-table-column
            prop="updateTime"
            label="更新时间"
            width="120"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">
                执行
              </el-button>
              <el-button type="text" size="small" @click="handleApiUpdate(scope.row)">
                编辑
              </el-button>
              <el-button type="text" size="small">
                用例
              </el-button>
              <el-button type="text" size="small">
                删除
              </el-button>
              <el-button type="text" size="small">
                复制
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="total, prev, pager, next"
          :page-size="size"
          :current-page.sync="currentPage"
          :total="total"
          @current-change="getApiList()"
        />
      </template>
    </el-main>
  </el-container>
</template>

<script>
import { getApiListByModuleId, getApiById } from '@/api/apiDefinition'

export default {
  name: 'ApiListTable',
  data() {
    return {
      listLoading: false,
      tableData: [],
      currentPage: 1,
      size: 5,
      total: null,
      currentModule: {}
    }
  },
  computed: {
    needRefreshList: {
      get() {
        return this.$store.state.apiDefinition.refreshApiList
      },
      set(boolean) {
        this.$store.state.apiDefinition.refreshApiList = boolean
      }
    },
    currentNodeInfo() {
      return this.$store.state.apiDefinition.currentNode
    },
    currentProjectId() {
      return this.$store.state.apiDefinition.currentProjectId
    },
    requestContent: {
      get() {
        return this.$store.state.apiDefinition.saveApiRequest
      },
      set(value) {
        this.$store.state.apiDefinition.saveApiRequest = value
      }
    }
  },
  watch: {
    needRefreshList: {
      // 接口编辑页保持接口，处理保存后的自动刷新当前节点下的列表
      handler() {
        if (this.needRefreshList === true) {
          if (this.currentNodeInfo.id !== '') {
            this.getApiList(this.currentNodeInfo.projectId, this.currentNodeInfo.id, this.currentPage, this.size)
          } else {
            this.getApiList(this.currentProjectId, 1, this.currentPage, this.size)
          }
          // 刷新后，恢复字段的状态，否则后续不熟悉
          this.needRefreshList = false
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // 全局事件总线-接收来自模块树组件传递来的API列表数据
    this.$bus.$on('getModuleApiList', (apiData, currentModuleData) => {
      this.tableData = apiData.records
      this.currentPage = apiData.current
      this.size = apiData.size
      this.total = apiData.total
      this.currentModule = currentModuleData
    })
  },
  methods: {
    getApiList(projectId, moduleId, currentPage, size) {
      this.listLoading = true
      getApiListByModuleId(projectId, moduleId, currentPage, size)
        .then(response => {
          this.tableData = response.data.records
          this.currentPage = response.data.current
          this.size = response.data.size
          this.total = response.data.total
        })
      this.listLoading = false
    },
    handleApiUpdate(row) {
      // 打开对话框
      this.$store.commit('apiDefinition/CHANGE_DIALOG', 'update')
      // 根据接口id查询接口，将接口的返回内容赋给对话框
      getApiById(row.id).then(response => {
        const reqParamInfoObj = JSON.parse(response.data.reqParamInfo)
        const headerInfoObj = JSON.parse(response.data.headersKeyValue)
        // console.log('headerInfoObj', headerInfoObj)
        this.requestContent = { ...response.data, reqParamInfo: reqParamInfoObj, headersKeyValue: headerInfoObj }
        console.log('this.requestContent', this.requestContent)
      }
      )
    }
  }
}
</script>
