// eslint-disable-next-line @typescript-eslint/no-require-imports
const { GlobalRegistrator } = require('@happy-dom/global-registrator')

GlobalRegistrator.register()

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createTextScramble, TextScrambleAnimator } = require('../../dist/cjs/index.cjs')

console.log('\n---> test-vanilla-cjs.cjs')

console.log('CJS - Function API test')
console.log('createTextScramble is function:', typeof createTextScramble === 'function')

const mockElement = document.createElement('div')
const animator = createTextScramble(mockElement, {
  texts: ['Hello', 'World'],
})

console.log('animator instance created:', animator instanceof TextScrambleAnimator)
console.log('animator.play is function:', typeof animator.play === 'function')
console.log('animator.pause is function:', typeof animator.pause === 'function')
console.log('animator.reset is function:', typeof animator.reset === 'function')
console.log('animator.destroy is function:', typeof animator.destroy === 'function')
console.log('animator.setTexts is function:', typeof animator.setTexts === 'function')

console.log('\nCJS - Class API test')
console.log('TextScrambleAnimator is function:', typeof TextScrambleAnimator === 'function')

const mockElement2 = document.createElement('div')
const animator2 = new TextScrambleAnimator(mockElement2, {
  paused: true,
  texts: ['Test', 'Animation'],
})

console.log('animator2 instance created:', animator2 instanceof TextScrambleAnimator)
console.log('animator2.play is function:', typeof animator2.play === 'function')
console.log('animator2.pause is function:', typeof animator2.pause === 'function')

animator.destroy()
animator2.destroy()

console.log('\nCJS vanilla JS integration tests completed')
