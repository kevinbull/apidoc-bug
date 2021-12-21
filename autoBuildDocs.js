const path = require('path')
const apidoc = require('apidoc')
const rimraf = require('rimraf')

const options = require('./docs/bin/options')
const config = require('./apidoc.config')

const log = (...m) => console.log('\x1b[36m%s\x1b[0m', ...m, '- 🤖');

const buildDocumentation = () => {
  rimraf.sync(path.resolve(options.dest + '/*'))
  log(`building documentation now src:${options.src.join(' ')} pwd:${__dirname}`)
  log('apidoc options:', JSON.stringify(options, null, 2))
  log('apidoc config:', JSON.stringify(config, null, 2))
  const doc = apidoc.createDoc(options)
  let returnCode = 0
  if (typeof doc !== 'boolean') {
    log(`documentation built successfully output dir: ${options.dest}`)
  } else {
    log(`documentation build failed!!`)
    returnCode = 1
  }
  process.exit(returnCode)
}

buildDocumentation()
