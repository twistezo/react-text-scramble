export type ScrambleText = string

export type ScrambleTexts = ScrambleText[]

export type TextScrambleProps = {
  className?: string
  letterSpeed?: number
  nextLetterSpeed?: number
  paused?: boolean
  pauseTime?: number
  texts: ScrambleTexts
}
