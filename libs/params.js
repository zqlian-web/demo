let utils = require('@zqlianweb/utils')
let fs = require('fs')
let path = require('path')
let useParams = {
  pagesType: {
    type: 'list',
    message: '请选择pages方式',
    name: 'pagesType',
    choices: [
      {value: 'subpackages', name: '分包subpackages'},
      {value: 'pages', name: '主包pages'}
    ],
    default: 0
  }
}
let indexParams = {
  pagesType: {
    type: 'confirm',
    message: '是否用作index页面?',
    name: 'useIndex'
  }
}
let indexPath = './src/pages/index/index'
module.exports = {
  async getParams (paramsString) {
    let autoParams = Object.assign(utils.string.getParams(paramsString), utils.config.read('demo'))
    let params = utils.params.getParams(useParams, autoParams)
    // 主包模式
    if (params.pagesType === 'pages') {
      let rootPath = utils.file.getRootPath()
      let useIndexPath = path.join(rootPath, indexPath)
      // 如果不存在首页 询问是否直接生成首页
      if (!fs.existsSync(useIndexPath)) {
        params = utils.params.getParams(indexParams, paramsString)
      }
    } else {
      params.useIndex = 0
    }
    console.log('params', params)
    utils.config.merge('demo', params)
  }
}