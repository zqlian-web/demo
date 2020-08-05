let paramsModule = require('./libs/params')
module.exports = {
  async apply (action, paramsString) {
    let params = await paramsModule.getParams(paramsString)
    console.log('params', params)
  }
}