# React text scramble effect

- React & TypeScript component
- lightweight package ~7kB

## <a href="https://codesandbox.io/s/react-text-scramble-eyzqm">Live example</a>

## Setup

```
npm install @twistezo/react-text-scramble
or
yarn add @twistezo/react-text-scramble
```

## Usage

```jsx
const texts: ScrambleTexts = [
  'lorem ipsum',
  'dolor sit amet',
  'consectetur adipiscing elit'
]

<TextScramble texts={texts} />
```

### Types and props

```js
type ScrambleText = string

type ScrambleTexts = ScrambleText[]

type TextScrambleProps = {
  texts: ScrambleTexts
  className?: string
  letterSpeed?: number // [ms]
  nextLetterSpeed?: number // [ms]
  paused?: boolean
  pauseTime?: number // [ms]
}
```

### Defaults

```js
letterSpeed = 5
nextLetterSpeed = 100
paused = false
pauseTime = 1500
```
