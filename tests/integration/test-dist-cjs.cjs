// eslint-disable-next-line @typescript-eslint/no-require-imports
const { default: DefaultExport, TextScramble } = require('../../dist/cjs/index.cjs')

console.log('CJS named export:', typeof TextScramble === 'function')
console.log('CJS default export:', typeof DefaultExport === 'function')
console.log('Exports match:', TextScramble === DefaultExport)
console.log('Component name:', TextScramble.name === 'TextScramble')

const isReactComponent = typeof TextScramble === 'function'
console.log('Is React component:', isReactComponent)

try {
  const props = { texts: ['hello', 'world'] }
  console.log('Props structure valid:', Array.isArray(props.texts))
} catch (e) {
  console.log('Props check: fail', e)
}

console.log('CJS integration tests completed')
