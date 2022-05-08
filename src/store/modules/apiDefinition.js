// api接口请求体
const apiRequest = {
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
  responseInfo: '',
  requestType: null
}

const state = {
  createApiRelative: {
    apiEditDialogVisible: false,
    apiDefinitionDialogStatus: ''
  },
  moduleTreeRelative: {
    moduleList: []
  },
  saveApiRequest: apiRequest,
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
    state.saveApiRequest = apiRequest
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
