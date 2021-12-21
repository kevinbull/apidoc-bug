const get = require('lodash/get')
const {sortObj} = require('jsonabc')

/**
 * Alphabetically order params, json request, success, and error examples
 */
function postFilter (parsedFiles, filenames, tagName) {
  tagName = tagName || 'parameter'
  parsedFiles.forEach((parsedFile, fileIndex) => {
    parsedFile.forEach((block) => {
      const filename = filenames[fileIndex]
      orderParamFields(block, tagName)
      orderRequestPayloadExamples(block, filename)
      orderResponseExamples(block, 'success', filename)
      orderResponseExamples(block, 'error', filename)
    })
  })
}

function orderParamFields (block, tagName) {
  if (block.local[tagName] && block.local[tagName].fields) {
    const blockFields = block.local[tagName].fields
    Object.keys(blockFields).forEach((blockFieldKey) => {
      const fields = block.local[tagName].fields[blockFieldKey]
      block.local[tagName].fields[blockFieldKey] = fields.sort((a, b) => {
        if (a.field > b.field) return 1
        if (a.field < b.field) return -1
        return 0
      })
    })
  }
}

function orderRequestPayloadExamples (block, filename) {
  const parameterExamples = get(block, 'local.parameter.examples')
  if (parameterExamples) {
    parameterExamples.forEach(example => {
      if (String(get(example, 'content')).trim().substr(0, 1) === '{') {
        try {
          example.content = JSON.stringify(sortObj(JSON.parse(example.content)), null, 2)
        } catch (e) {
          const name = get(block, 'local.name')
          console.error(`Invalid json request example: ${name || filename}`)
          if (!name) {
            console.error(example.content)
          }
        }
      }
    })
  }
}

function orderResponseExamples (block, type, filename) {
  const examples = get(block, `local.${type}.examples`)
  if (!Array.isArray(examples)) return
  examples.forEach(example => {
    const name = get(block, 'local.name', '')
    const content = String(get(example, 'content'))
    // some responses have the status(ex: HTTP/1.1 200 OK) on the first line
    const firstOpenBracketPos = content.indexOf('{')
    if (firstOpenBracketPos > -1) {
      const json = content
        .substr(firstOpenBracketPos)
        .split('\n')
        .map(l => l.trim())
        .join('')
      try {
        const status = content.substr(0, firstOpenBracketPos).trim()
        example.content = status + (status ? '\n' : '') + JSON.stringify(sortObj(JSON.parse(json)), null, 2)
      } catch (e) {
        const globalName = get(block, 'global.define.name', '')
        const info = [`Invalid json ${type} example:`, globalName, name, filename, `- ${e.message}`].filter(Boolean)
        console.log(...info)
      }
    }
  })
}

module.exports = {
  postFilter
}
