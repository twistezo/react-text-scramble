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

- Local example (required [Bun](https://bun.com/))

```bash
cd example
bun install
bun run dev
open http://localhost:5173/
```

- [CodeSandbox](https://codesandbox.io/p/sandbox/react-text-scramble-cchcm2)

## Setup

```bash
npm install @twistezo/react-text-scramble
```

## Usage

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

### Props

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

### Defaults

Defined in [src/constants.ts](./src/constants.ts):

## Development

```
bun run example     # run examples
bun run build       # build all formats

bun run test        # run all tests
bun run lint        # check lint
bun run lint:fix    # fix lint & format
bun run typecheck   # check types

bunx npm login      # login to npm
bun publish         # publish to npm
```
