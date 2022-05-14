const state = {
  createApiRelative: {
    apiEditDialogVisible: false,
    apiDefinitionDialogStatus: ''
  },
  moduleTreeRelative: {
    moduleList: []
  },
  saveApiRequest: {
    id: '',
    name: '',
    description: '',
    moduleId: '',
    projectId: '',
    host: '',
    path: '',
    method: '',
    headersKeyValue: [{
      name: '',
      value: '',
      describe: ''
    }],
    reqParamInfo: {
      paramKeyValue: [{
        name: '',
        value: '',
        describe: ''
      }],
      restKeyValue: [{
        name: '',
        value: '',
        describe: ''
      }],
      body: {}
    },
    responseInfo: {},
    requestType: null
  },
  refreshApiList: false,
  currentNode: {
    id: '',
    projectId: ''
  },
  currentProjectId: null,
  initProjectInfo: {}
}

const actions = {
}

const mutations = {
  CHANGE_DIALOG(state, value) {
    state.createApiRelative.apiEditDialogVisible = true
    state.createApiRelative.apiDefinitionDialogStatus = value
  },
  GET_MODULE_LIST(state, value) {
    state.moduleTreeRelative.moduleList = value
  },
  INIT_SAVE_API_REQUEST(state, value) {
    console.log('INIT_SAVE_API_REQUEST 初始化请求对象')
    state.saveApiRequest = {
      id: '',
      name: '',
      description: '',
      moduleId: '',
      projectId: '',
      host: '',
      path: '',
      method: '',
      headersKeyValue: [{
        name: '',
        value: '',
        describe: ''
      }],
      reqParamInfo: {
        paramKeyValue: [{
          name: '',
          value: '',
          describe: ''
        }],
        restKeyValue: [{
          name: '',
          value: '',
          describe: ''
        }],
        body: {}
      },
      responseInfo: {},
      requestType: null
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
