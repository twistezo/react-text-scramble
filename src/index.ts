import TextScramble from './TextScramble'

export {
  DEFAULT_LETTER_SPEED,
  DEFAULT_NEXT_LETTER_SPEED,
  DEFAULT_PAUSE_TIME,
  DEFAULT_PAUSED,
  SYMBOLS,
} from './constants'
export { createTextScramble, TextScrambleAnimator } from './TextScrambleAnimator'
export { TextScramble as default, TextScramble }

export type { TextScrambleOptions } from './TextScrambleAnimator'
export type { ScrambleText, ScrambleTexts, TextScrambleProps } from './types'
