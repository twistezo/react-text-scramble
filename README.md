<div align="center">

# React text scramble effect

![](https://img.shields.io/npm/v/@twistezo/react-text-scramble?style=flat-square&color=9cf)
![](https://img.shields.io/npm/dt/@twistezo/react-text-scramble?style=flat-square&color=9cf)
![](https://img.shields.io/npm/l/@twistezo/react-text-scramble?style=flat-square&color=yellow)

</div>

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
