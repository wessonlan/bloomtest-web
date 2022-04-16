<template>
  <el-container style="height: 1000px; border: 1px solid #fff">
    <el-aside width="21%" style="height: 65%; background-color: rgb(255,255,255); display: flex">
      <div class="app-container">
        <div>
          <el-input v-model="filterText" placeholder="关键字过滤" style="margin-bottom:20px; width: 150px" />
          <el-button type="primary" size="small" style="margin-left: 10px" @click="handleApiAdd">创建接口</el-button>
        </div>
        <!--模块树-->
        <div class="custom-tree-container">
          <el-tree
            ref="tree"
            class="filter-tree"
            default-expand-all
            :data="data"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            @node-click="getApi"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span style="margin-left: 10px">
                <el-button
                  class="el-icon-folder-add"
                  type="text"
                  size="mini"
                  @click="() => append(data)"
                />
                <el-button
                  class="el-icon-edit-outline"
                  type="text"
                  size="mini"
                  @click="() => edit(data)"
                />
                <el-button
                  class="el-icon-delete"
                  type="text"
                  size="mini"
                  @click="() => remove(data)"
                />
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </el-aside>
    <!--接口列表过滤-->
    <el-container>
      <el-header style="text-align: left; font-size: 12px; height: 40px">
        <div style="margin-top: 20px">
          <el-select
            v-model="value"
            filterable
            placeholder="项目"
            style="width: 120px"
            value=""
            @change="queryModuleList();initProjectApi()"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.projectName"
              :value="item.id"
            />
          </el-select>
          <span style="margin-left: 10px;">
            <el-button type="primary" size="small" plain>API</el-button>
            <el-button type="primary" size="small" plain>CASE</el-button>
            <el-input
              v-model="input"
              style="width:300px; float:right; padding-right:50px"
              placeholder="根据ID/名称查询"
              clearable
            />
          </span>
        </div>
      </el-header>
      <el-main>
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
            @current-change="getApi(currentNode)"
          />
        </template>
      </el-main>
    </el-container>

    <!-- 节点名称编辑对话框 -->
    <el-dialog title="节点信息" :visible.sync="dialogFormVisible" destroy-on-close>
      <el-form :model="form">
        <el-form-item label="模块名称" :label-width="formLabelWidth" style="width: 50%">
          <el-input v-model="form.nodeName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?handleNodeAdd():handleNodeUpdate()">保 存</el-button>
      </div>
    </el-dialog>

    <!--接口定义对话框-->
    <el-dialog
      title="接口定义"
      :visible.sync="apiDefinitionDialog"
      width="73%"
    >
      <!--基础信息-->
      <el-divider content-position="left">基础信息</el-divider>
      <div>
        <el-form :inline="true" :model="baseInfoForm" class="demo-form-inline">
          <el-form-item label="名称:">
            <el-input v-model="baseInfoForm.name" placeholder="" />
          </el-form-item>
          <el-form-item label="描述:">
            <el-input v-model="baseInfoForm.description" placeholder="" />
          </el-form-item>
          <!--模块改造成级联选择器-->
          <el-form-item label="模块:">
            <!--<el-select v-model="baseInfoForm.moduleId" placeholder="" value="">-->
            <!--<el-option label="区域一" value="shanghai" />-->
            <!--<el-option label="区域二" value="beijing" />-->
            <!--</el-select>-->
            <el-cascader
              v-model="baseInfoForm.moduleId"
              :show-all-levels="false"
              filterable
              placeholder="选择模块"
              clearable
              :options="currentModuleList"
              :props="{ expandTrigger: 'hover', checkStrictly: true }"
              @change="handleChange"
            />
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :inline="true" :model="apiRequestInfoForm" class="demo-form-inline">
          <el-form-item label="请求:">
            <el-select v-model="apiRequestInfoForm.method" placeholder="方法" value="" style="width: 50%">
              <el-option label="GET" value="get" />
              <el-option label="POST" value="post" />
              <el-option label="DELETE" value="delete" />
              <el-option label="PUT" value="put" />
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: -10%">
            <el-input v-model="apiRequestInfoForm.host" placeholder="Host" style="width: 150%" />
          </el-form-item>
          <el-form-item style="margin-left: 8%">
            <el-input v-model="apiRequestInfoForm.path" placeholder="Path" style="width: 200%" />
          </el-form-item>
          <el-form-item style="margin-left: 18%">
            <el-button type="success" @click="apiTestRun">发送</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="apiDefinitionDialogStatus==='create'?saveApi():updateApi()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--请求参数表单-->
      <el-divider content-position="left">请求参数</el-divider>
      <div>
        <template>
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="请求头" name="requestHeader">
              <!--动态增删表单-->
              <el-form ref="headerDynamicForm" :model="headerDynamicForm" label-width="100px" class="demo-dynamic">
                <!--请求头动态部分-->
                <el-form-item
                  v-for="(domain, index) in headerDynamicForm.domains"
                >
                  <span style="margin-left: -100px; margin-top: -200px">
                    <el-input v-model="domain.headerKey" style="width: 200px" placeholder="key" />
                    <el-input v-model="domain.value" style="width: 200px; margin-left: 5px" placeholder="value" />
                    <el-input v-model="domain.describe" style="width: 200px; margin-left: 5px" placeholder="desc" />
                    <el-button size="mini" style="margin-left: 5px" icon="el-icon-plus" @click="headerAddDomain" />
                    <el-button size="mini" icon="el-icon-minus" @click.prevent="headerRemoveDomain(domain)" />
                  </span>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="QUERY参数" name="queryParams">
              <el-form ref="queryDynamicForm" :model="queryDynamicForm" label-width="100px" class="demo-dynamic">
                <!--QUERY参数动态部分-->
                <el-form-item
                  v-for="(domain, index) in queryDynamicForm.domains"
                >
                  <span style="margin-left: -100px; margin-top: -200px">
                    <el-input v-model="domain.queryKey" style="width: 200px" placeholder="key" />
                    <el-input v-model="domain.value" style="width: 200px; margin-left: 5px" placeholder="value" />
                    <el-input v-model="domain.describe" style="width: 200px; margin-left: 5px" placeholder="desc" />
                    <el-button size="mini" style="margin-left: 5px" icon="el-icon-plus" @click="queryAddDomain" />
                    <el-button size="mini" icon="el-icon-minus" @click.prevent="queryRemoveDomain(domain)" />
                  </span>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="REST参数" name="restParams">
              <el-form ref="restDynamicForm" :model="restDynamicForm" label-width="100px" class="demo-dynamic">
                <!--REST参数动态部分-->
                <el-form-item
                  v-for="(domain, index) in restDynamicForm.domains"
                >
                  <span style="margin-left: -100px; margin-top: -200px">
                    <el-input v-model="domain.restKey" style="width: 200px" placeholder="key" />
                    <el-input v-model="domain.value" style="width: 200px; margin-left: 5px" placeholder="value" />
                    <el-input v-model="domain.describe" style="width: 200px; margin-left: 5px" placeholder="desc" />
                    <el-button size="mini" style="margin-left: 5px" icon="el-icon-plus" @click="restAddDomain" />
                    <el-button size="mini" icon="el-icon-minus" @click.prevent="restRemoveDomain(domain)" />
                  </span>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="请求体" name="requestBody">
              <vue-json-editor
                v-model="requestBodyInput"
                :mode="'code'"
              />
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <!--响应内容-->
      <el-divider content-position="left">响应内容</el-divider>
      <json-viewer
        expanded
        :expand-depth="5"
        :value="responseJsonData"
        copyable
        boxed
        sort
      />
    </el-dialog>

  </el-container>
</template>

<script>
import { getModuleList, addModuleNode, renameModuleNode, deleteNode } from '@/api/apiModule'
import { getProjectAll } from '@/api/projectManagement'
import { getApiListByModuleId, saveApiDefinition, getApiById, updateApiDefinition, runTestApi } from '@/api/apiDefinition'
import JsonViewer from 'vue-json-viewer'
import vueJsonEditor from 'vue-json-editor'

export default {
  components: { JsonViewer, vueJsonEditor },
  data() {
    return {
      currentModuleList: [],
      selectedModuleValue: [],
      apiDefinitionDialogStatus: 'create',
      saveApiRequest: {
        id: '',
        name: '',
        description: '',
        moduleId: '',
        projectId: '',
        host: '',
        path: '',
        method: '',
        apiHeader: '',
        request: '',
        response: '',
        requestType: ''
      },
      requestBodyInput: '',
      responseJsonData: {},
      headerDynamicForm: {
        domains: [{
          headerKey: '',
          value: '',
          describe: ''
        }]
      },
      queryDynamicForm: {
        domains: [{
          queryKey: '',
          value: '',
          describe: ''
        }]
      },
      restDynamicForm: {
        domains: [{
          restKey: '',
          value: '',
          describe: ''
        }]
      },
      activeName: 'queryParams',
      apiRequestInfoForm: {
        method: '',
        host: '',
        path: ''
      },
      baseInfoForm: {
        id: '',
        name: '',
        description: '',
        moduleId: ''
      },
      listLoading: true,
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      options: [],
      value: '',
      input: '',
      form: {
        nodeName: ''
      },
      dialogStatus: '',
      dialogFormVisible: false,
      apiDefinitionDialog: false,
      formLabelWidth: '80px',
      currentNode: {},
      currentPage: 1,
      size: 5,
      total: null
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getAllProject()
  },
  methods: {
    handleChange(value) {
      // console.log(this.baseInfoForm.moduleId[this.baseInfoForm.moduleId.length - 1]);
    },
    onJsonChange(value) {
      console.log('value:', value)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleApiAdd() {
      this.resetApiForm()
      this.resetSaveApiRequest()
      this.apiDefinitionDialog = true
      this.apiDefinitionDialogStatus = 'create'
    },
    restAddDomain() {
      this.restDynamicForm.domains.push({
        restKey: '',
        value: '',
        describe: ''
      })
    },
    restRemoveDomain(item) {
      const index = this.restDynamicForm.domains.indexOf(item)
      if (index !== -1) {
        this.restDynamicForm.domains.splice(index, 1)
      }
    },
    headerRemoveDomain(item) {
      const index = this.headerDynamicForm.domains.indexOf(item)
      if (index !== -1) {
        this.headerDynamicForm.domains.splice(index, 1)
      }
    },
    headerAddDomain() {
      this.headerDynamicForm.domains.push({
        headerKey: '',
        value: '',
        describe: ''
      })
    },
    queryRemoveDomain(item) {
      const index = this.queryDynamicForm.domains.indexOf(item)
      if (index !== -1) {
        this.queryDynamicForm.domains.splice(index, 1)
      }
    },
    queryAddDomain() {
      this.queryDynamicForm.domains.push({
        queryKey: '',
        value: '',
        describe: ''
      })
    },
    tabClick(tab, event) {
      if (this.activeName === 'queryParams') {
        this.saveApiRequest.requestType = 0
      }
      if (this.activeName === 'restParams') {
        this.saveApiRequest.requestType = 1
      }
      if (this.activeName === 'requestBody') {
        this.saveApiRequest.requestType = 2
      }
    },
    checkRequestNull() {
      if (this.activeName === 'queryParams') {
        if (this.queryDynamicForm.domains[0].queryKey === '') {
          return false
        }
      }
      if (this.activeName === 'restParams') {
        if (this.restDynamicForm.domains[0].restKey === '') {
          return false
        }
      }
      if (this.activeName === 'requestBody') {
        if (this.requestBodyInput === null) {
          return false
        }
      }
    },
    handleSaveRequest() {
      this.saveApiRequest.id = this.baseInfoForm.id
      this.saveApiRequest.projectId = this.value
      this.saveApiRequest.name = this.baseInfoForm.name
      this.saveApiRequest.description = this.baseInfoForm.description
      if (this.apiDefinitionDialogStatus === 'create') {
        this.saveApiRequest.moduleId = this.baseInfoForm.moduleId[this.baseInfoForm.moduleId.length - 1]
      } else {
        // 当是编辑页面，判断传进来的是否是数组，是的话 取最后一个赋值给 saveApiRequest.moduleId
        if (typeof (this.baseInfoForm.moduleId) === 'object') {
          this.saveApiRequest.moduleId = this.baseInfoForm.moduleId[this.baseInfoForm.moduleId.length - 1]
        } else {
          this.saveApiRequest.moduleId = this.baseInfoForm.moduleId
        }
      }
      this.saveApiRequest.method = this.apiRequestInfoForm.method
      this.saveApiRequest.host = this.apiRequestInfoForm.host
      this.saveApiRequest.path = this.apiRequestInfoForm.path
      this.saveApiRequest.apiHeader = JSON.stringify(this.headerDynamicForm.domains)
      this.saveApiRequest.response = JSON.stringify(this.responseJsonData)
      if (this.activeName === 'queryParams') {
        this.saveApiRequest.request = JSON.stringify(this.queryDynamicForm.domains)
      }
      if (this.activeName === 'restParams') {
        this.saveApiRequest.request = JSON.stringify(this.restDynamicForm.domains)
      }
      if (this.activeName === 'requestBody') {
        this.saveApiRequest.request = JSON.stringify(this.requestBodyInput)
      }
    },
    resetSaveApiRequest() {
      this.saveApiRequest.id = ''
      this.saveApiRequest.projectId = this.value
      this.saveApiRequest.name = ''
      this.saveApiRequest.description = ''
      this.saveApiRequest.moduleId = ''

      this.saveApiRequest.method = ''
      this.saveApiRequest.host = ''
      this.saveApiRequest.path = ''
      this.saveApiRequest.response = {}
      this.responseJsonData = {}
      this.saveApiRequest.apiHeader = JSON.stringify([{
        headerKey: '',
        value: '',
        describe: ''
      }])
      if (this.activeName === 'queryParams') {
        this.saveApiRequest.request = JSON.stringify([{
          queryKey: '',
          value: '',
          describe: ''
        }])
      }
      if (this.activeName === 'restParams') {
        this.saveApiRequest.request = JSON.stringify([{
          restKey: '',
          value: '',
          describe: ''
        }])
      }
      if (this.activeName === 'requestBody') {
        this.saveApiRequest.request = {}
      }
    },
    resetApiForm() {
      this.baseInfoForm.id = ''
      this.baseInfoForm.name = ''
      this.baseInfoForm.description = ''
      this.baseInfoForm.moduleId = 0
      this.apiRequestInfoForm.method = ''
      this.apiRequestInfoForm.host = ''
      this.apiRequestInfoForm.path = ''
      this.headerDynamicForm.domains = [{
        headerKey: '',
        value: '',
        describe: ''
      }]
      this.queryDynamicForm.domains = [{
        queryKey: '',
        value: '',
        describe: ''
      }]
      this.restDynamicForm.domains = [{
        restKey: '',
        value: '',
        describe: ''
      }]
      this.requestBodyInput = {}
    },
    handleApiUpdate(row) {
      getApiById(row.id).then(response => {
        this.baseInfoForm.id = response.data.id
        this.value = response.data.projectId
        this.baseInfoForm.name = response.data.name
        this.baseInfoForm.description = response.data.description
        this.baseInfoForm.moduleId = response.data.moduleId
        console.log('点完编辑后，此时表单里的 moduleId')
        console.log(this.baseInfoForm.moduleId)
        this.apiRequestInfoForm.method = response.data.method
        this.apiRequestInfoForm.host = response.data.host
        this.apiRequestInfoForm.path = response.data.path
        this.responseJsonData = JSON.parse(response.data.response)
        this.headerDynamicForm.domains = JSON.parse(response.data.apiHeader)
        if (response.data.requestType === 0) {
          this.queryDynamicForm.domains = JSON.parse(response.data.request)
          this.activeName = 'queryParams'
          this.saveApiRequest.requestType = 0
        }
        if (response.data.requestType === 1) {
          this.restDynamicForm.domains = JSON.parse(response.data.request)
          this.activeName = 'restParams'
          this.saveApiRequest.requestType = 1
        }
        if (response.data.requestType === 2) {
          this.responseJsonData = JSON.parse(response.data.response)
          this.activeName = 'requestBody'
          this.requestBodyInput = JSON.parse(response.data.request)
          this.saveApiRequest.requestType = 2
        }
      })
      this.apiDefinitionDialog = true
      this.apiDefinitionDialogStatus = 'update'
    },
    updateApi(row) {
      this.handleSaveRequest()
      if (this.checkRequestNull() === false) {
        this.$message.error('当前tab请求参数为空')
      } else {
        updateApiDefinition(this.saveApiRequest).then(response => {
          if (response.code === 20000) {
            this.$message({
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }
          this.apiDefinitionDialog = false
          // 初始化列表
          this.initProjectApi()
          this.resetSaveApiRequest()
          this.resetApiForm()
        })
      }
    },
    saveApi() {
      this.handleSaveRequest()
      if (this.checkRequestNull() === false) {
        this.$message.error('当前tab请求参数为空')
      } else {
        saveApiDefinition(this.saveApiRequest).then(response => {
          if (response.code === 20000) {
            this.$message({
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          }
          this.apiDefinitionDialog = false
          // 初始化列表
          this.initProjectApi()
          this.restSaveApiRequest()
          this.resetApiForm()
        })
      }
    },
    apiTestRun() {
      const requestBody = {
        'host': this.apiRequestInfoForm.host,
        'path': this.apiRequestInfoForm.path,
        'method': this.apiRequestInfoForm.method,
        'header': JSON.stringify(this.headerDynamicForm.domains),
        'request': '',
        'requestType': ''
      }
      if (this.activeName === 'queryParams') {
        requestBody.request = JSON.stringify(this.queryDynamicForm.domains)
        requestBody.requestType = 0
      }
      if (this.activeName === 'restParams') {
        requestBody.request = JSON.stringify(this.restDynamicForm.domains)
        requestBody.requestType = 1
      }
      if (this.activeName === 'requestBody') {
        requestBody.request = JSON.stringify(this.requestBodyInput)
        requestBody.requestType = 2
      }
      runTestApi(requestBody).then(response => {
        this.responseJsonData = (response.data)
        this.$message({
          message: '发送成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    initProjectApi() {
      this.listLoading = true
      getApiListByModuleId(this.value, 0, this.currentPage, this.size)
        .then(response => {
          this.tableData = response.data.records
          this.currentPage = response.data.current
          this.size = response.data.size
          this.total = response.data.total
          this.listLoading = false
        })
    },
    getApi(data) {
      this.listLoading = true
      this.currentNode = data
      getApiListByModuleId(this.currentNode.projectId, this.currentNode.id, this.currentPage, this.size)
        .then(response => {
          this.tableData = response.data.records
          this.currentPage = response.data.current
          this.size = response.data.size
          this.total = response.data.total
          this.listLoading = false
        })
    },
    getAllProject() {
      getProjectAll().then(response => {
        this.options = response.data
      })
    },
    queryModuleList() {
      getModuleList(this.value).then(response => {
        this.data = response.data
        this.currentModuleList = response.data
        console.log(this.currentModuleList)
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    append(data) {
      this.dialogFormVisible = true
      // 把对话框的值赋给data的name字段传给后端
      this.currentNode = data
      // console.log('传入的node：' + JSON.stringify(data))
      this.dialogStatus = 'create'
    },
    edit(data) {
      // console.log(data)
      // 打开对话框
      this.dialogFormVisible = true
      // 把 data 赋给 currentNode，用于后面其他方法的请求
      this.currentNode = data
      // 把 name 赋值给 this.form.nodeName 用于外显
      this.form.nodeName = data.name
      // 点击保存的时候，判断后调用 handleNodeUpdate 方法
      this.dialogStatus = 'update'
    },
    handleNodeUpdate() {
      // 传入后端当前节点的 id，实际输入的name，进行更新
      renameModuleNode({
        id: this.currentNode.id,
        name: this.form.nodeName
      }).then(response => {
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        this.dialogFormVisible = false
        // 清空表单
        this.form.nodeName = ''
        // 刷新树列表
        this.queryModuleList()
      })
    },
    handleNodeAdd() {
      this.currentNode.name = this.form.nodeName
      addModuleNode(this.currentNode).then(response => {
        this.$message({
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.dialogFormVisible = false
        // 清空表单
        this.form.nodeName = ''
        // 刷新树列表
        this.queryModuleList()
      })
    },
    remove(data) {
      deleteNode(data.id).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        // 刷新树列表
        this.queryModuleList()
      })
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
