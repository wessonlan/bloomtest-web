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
    requestType: null
  },
  responseInfo: {
    respBody: {},
    respHeaders: []
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
  INIT_RESPONSE_INFO(state, value) {
    state.responseInfo = {
      respBody: {},
      respHeaders: []
    }
  },
  INIT_SAVE_API_REQUEST(state, value) {
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
