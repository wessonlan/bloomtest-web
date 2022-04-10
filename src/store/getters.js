const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  createApiRelative: state => state.apiDefinition.createApiRelative,
  moduleTreeRelative: state => state.apiDefinition.moduleTreeRelative
}
export default getters
