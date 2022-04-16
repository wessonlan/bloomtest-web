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
    moduleIds: '',
    projectId: '',
    host: '',
    path: '',
    method: '',
    apiHeaders: [],
    requestInfo: [],
    responseInfo: {},
    requestType: null
  }
}

const actions = {
}

const mutations = {
  CHANGE_DIALOG(state, value) {
    if (value === 'create') {
      state.createApiRelative.apiEditDialogVisible = true
      state.createApiRelative.apiDefinitionDialogStatus = value
    }
  },
  GET_MODULE_LIST(state, value) {
    state.moduleTreeRelative.moduleList = value
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
