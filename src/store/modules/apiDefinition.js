const state = {
  createApiRelative: {
    apiEditDialogVisible: false,
    apiDefinitionDialogStatus: ''
  }
}

const actions = {
  // 响应组件中更改创建状态的动作
  // changeDialog(context) {
  //   context.commit('CHANGE_DIALOG')
  // }

}

const mutations = {
  // 执行更改创建状态
  CHANGE_DIALOG(state, value) {
    if (value === 'create') {
      state.createApiRelative.apiEditDialogVisible = true
      state.createApiRelative.apiDefinitionDialogStatus = value
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
