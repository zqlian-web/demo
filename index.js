let libsParams = require('./libs/params')
let libsCopy = require('./libs/copy')
module.exports = {
  async apply (action, paramsString) {
    let params = await libsParams.getParams(paramsString)
    console.log('params', params)
    await libsCopy.start(params)
  }
}