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
      </el-main>
    </el-container>

    <!-- 节点名称编辑对话框 -->

    <!--接口定义对话框-->
    <!--基础信息-->
    <!--<el-divider content-position="left">基础信息</el-divider>-->

    <!--请求参数表单-->
    <!--<el-divider content-position="left">请求参数</el-divider>-->

    <!--响应内容-->
    <!--<el-divider content-position="left">响应内容</el-divider>-->

  </el-container>
</template>

<script>
import ModuleTree from './ModuleTree'
import ApiProjectFilter from './ApiProjectFilter'

import { getProjectAll } from '../../../api/projectManagement'

export default {
  // 组件名称
  name: 'ApiDefinitionBase',
  // 注册组件
  // components: { JsonViewer, vueJsonEditor },
  components: { ModuleTree, ApiProjectFilter },
  data() {
    return {
      projectAllList: []
    }
  },
  created() {
    this.getAllProject()
  },
  methods: {
    getAllProject() {
      getProjectAll().then(response => {
        this.projectAllList = response.data
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
