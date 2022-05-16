<template>
  <el-container style="height: 1000px; border: 1px solid #fff">
    <el-aside width="21%" style="height: 65%; background-color: rgb(255,255,255); display: flex">
      <div class="app-container">
        <!--模块树-->
        <ModuleTree />
      </div>
    </el-aside>
    <el-container>
      <el-header style="text-align: left; font-size: 12px; height: 40px">
        <!--项目选择-->
        <div style="margin-top: 20px">
          <ApiProjectFilter
            ref="getModuleList"
            :project-list="projectAllList"
            @getModuleList="getModuleList"
          />
        </div>
      </el-header>
      <el-main>
        <!--接口列表-->
        <ApiListTable />
      </el-main>
    </el-container>

    <!--接口定义对话框-->
    <EditDialog />
  </el-container>
</template>

<script>
import ModuleTree from '@/views/apiManagement/definition/ModuleTree'
import ApiProjectFilter from '@/views/apiManagement/definition/ApiProjectFilter'
import ApiListTable from '@/views/apiManagement/definition/ApiListTable'
import EditDialog from '@/views/apiManagement/definition/apiEdit/EditDialog'

import { getProjectAll } from '@/api/projectManagement'

export default {
  // 组件名称
  name: 'ApiDefinitionBase',
  // 注册组件
  // components: { JsonViewer, vueJsonEditor },
  components: { EditDialog, ModuleTree, ApiProjectFilter, ApiListTable },
  data() {
    return {
      projectAllList: []
    }
  },
  mounted() {
    this.getAllProject()
  },
  methods: {
    getAllProject() {
      getProjectAll().then(response => {
        this.projectAllList = response.data
        // 把第一个项目当做默认初始化查询的项目，放到vuex
        this.$store.state.apiDefinition.initProjectInfo = this.projectAllList[0]
      })
    },
    getModuleList(val) {
      // 全局事件总线，给组件tree发送模块树数据
      this.$bus.$emit('getModule', val)
    }
  }
}
</script>

<style>
    .el-aside {
        color: #333;
        border-right-style: solid;
        border-color: #f4f4f5;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
</style>
