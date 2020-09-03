export type ScrambleText = string

export type ScrambleTexts = ScrambleText[]

export type TextScrambleProps = {
  texts: ScrambleTexts
  className?: string
  letterSpeed?: number
  nextLetterSpeed?: number
  paused?: boolean
  pauseTime?: number
}
