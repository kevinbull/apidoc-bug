const path = require('path')

const rootPath = path.normalize(path.join(__dirname, '..', '..'))

const options = {
  includeFilters: [ ".*\\.js$" ],
  src: [
    path.join(rootPath, 'docs', 'src'),
    path.join(rootPath, 'src', 'routes')
  ],
  dest: path.resolve('./docs/dist/'),
  config: path.resolve('./apidoc.config.js'),
  filters: {
    orderFilter: path.resolve('./docs/apidoc/filters/order.js')
  },
  languages: {},
  workers: {},
  markdown: true,
  encoding: 'utf8',
  copyDefinitions: true
}

module.exports = options
