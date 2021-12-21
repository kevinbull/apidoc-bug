const packageJS = require('./package.json')

const config = {
  name: packageJS.name,
  version: packageJS.version,
  description: packageJS.description,
  title: process.env.DOCS_TITLE || `${packageJS.name.toUpperCase()} Documentation`,
  sampleUrl: null,
  header: {
    title: process.env.DOCS_HEADER_TITLE || 'Overview',
    filename: './docs/markdown/header.md'
  },
  footer: {
    title: process.env.DOCS_FOOTER_TITLE || 'Additional Info',
    filename: './docs/markdown/footer.md'
  },
  template: {
    withGenerator: false
  }
}

module.exports = config
