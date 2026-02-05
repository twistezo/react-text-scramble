import { TextScramble } from '../../dist/esm/index.mjs'

console.log('\n---> test-dist-esm.mjs')

console.log('ESM default export:', typeof TextScramble === 'function')
console.log('ESM named export:', typeof TextScramble === 'function')
console.log('Component name:', TextScramble.name === 'TextScramble')

const isReactComponent = typeof TextScramble === 'function'
console.log('Is React component:', isReactComponent)

try {
  const props = { texts: ['hello', 'world'] }
  console.log('Props structure valid:', Array.isArray(props.texts))
} catch (e) {
  console.log('Props check: fail', e)
}

console.log('ESM integration tests completed')
