<div align="center">

# React text scramble effect

![](https://img.shields.io/npm/v/@twistezo/react-text-scramble?style=flat-square&color=9cf)
![](https://img.shields.io/npm/dt/@twistezo/react-text-scramble?style=flat-square&color=9cf)
![](https://img.shields.io/npm/l/@twistezo/react-text-scramble?style=flat-square&color=yellow)

</div>

- React & TypeScript component
- Compatible with React 16.8+
- ESM and CJS support

## Examples

- Local examples (required [Bun](https://bun.com/))
  - React

    ```bash
    bun run example:react
    open http://localhost:5173/
    ```

  - Vanilla JS/TS

    ```bash
    bun run example:vanilla
    open http://localhost:3000/
    ```

- [CodeSandbox](https://codesandbox.io/p/sandbox/react-text-scramble-cchcm2)

## Setup

```bash
npm install @twistezo/react-text-scramble
```

## Usage

### React

```tsx
import TextScramble from '@twistezo/react-text-scramble'
import type { ScrambleTexts } from '@twistezo/react-text-scramble'

const texts: ScrambleTexts = [
  'lorem ipsum',
  'dolor sit amet',
  'consectetur adipiscing elit'
]

<TextScramble texts={texts} />
```

### Vanilla JS/TS

```ts
import { createTextScramble } from '@twistezo/react-text-scramble'

const el = document.getElementById('scramble')

// using function API
const ts = createTextScramble(el, { texts: ['Hello', 'World'] })

// using class API
// const ts = new TextScrambleAnimator(el, { texts: ['Hello', 'World'] })

ts.play()
ts.pause()
ts.reset()
ts.setTexts(['Foo', 'Bar'])
ts.destroy()
```

## Options

Defaults are defined in [src/constants.ts](./src/constants.ts)

```ts
type TextScrambleProps = {
  className?: string
  letterSpeed?: number // Animation speed for each letter change [ms]
  nextLetterSpeed?: number // Speed to reveal each letter [ms]
  paused?: boolean // Pause/resume animation
  pauseTime?: number // Delay between text changes [ms]
  texts: ScrambleTexts
}
```

## Development

```
bun run example:react
bun run example:vanilla

bun run build
bun run test
bun run lint
bun run typecheck

bunx npm login
bun publish
```
