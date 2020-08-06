let utils = require('@zqlianweb/utils')
let path = require('path')
module.exports = {
  async start (options) {
    let pages = require('../pages')
    let copyOptions = {}
    if (options.pagesType === 'subpackages') {
      console.log('mergeSubpackages pages')
      if (!Array.isArray(pages)) pages = [pages]
      utils.app.mergeSubpackages(pages)
    } else {
      // pages
      pages = pages.pages.map(path => pages.root + path)
      
      if (options.useIndex) {
        pages = pages.map(path => path.replace('demo', 'index'))
        copyOptions.formatToPath = path => path.replace('demo', 'index')
      }
      console.log('mergePages pages')
      utils.app.mergePages(pages)
    }
    console.log('copy src')
    utils.file.copyDir(path.join(__dirname, '../src'), utils.file.getResolvePath('./src'), copyOptions)
  }
}