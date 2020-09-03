export type ScrambleText = string

export type ScrambleTexts = ScrambleText[]

export type TextScrambleProps = {
  className: string
  texts: ScrambleTexts
  letterSpeed?: number
  nextLetterSpeed?: number
  paused?: boolean
  pauseTime?: number
}
