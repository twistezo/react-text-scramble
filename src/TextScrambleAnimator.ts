import {
  DEFAULT_LETTER_SPEED,
  DEFAULT_NEXT_LETTER_SPEED,
  DEFAULT_PAUSE_TIME,
  DEFAULT_PAUSED,
  SYMBOLS,
} from './constants'
import { nextItem, randomItem } from './utils'

export interface TextScrambleOptions {
  letterSpeed?: number
  nextLetterSpeed?: number
  paused?: boolean
  pauseTime?: number
  texts: string[]
}

export class TextScrambleAnimator {
  private bakeLetterInterval: null | ReturnType<typeof setInterval> = null
  private bakeTextInterval: null | ReturnType<typeof setInterval> = null
  private currentText: string
  private displayedText: string[]
  private element: HTMLElement
  private leftIndexes: number[] = []

  private letterSpeed: number
  private nextLetterSpeed: number
  private paused: boolean

  private pauseTime: number
  private pauseTimeout: null | ReturnType<typeof setTimeout> = null
  private texts: string[]

  constructor(element: HTMLElement, options: TextScrambleOptions) {
    this.element = element
    this.texts = options.texts
    this.letterSpeed = options.letterSpeed ?? DEFAULT_LETTER_SPEED
    this.nextLetterSpeed = options.nextLetterSpeed ?? DEFAULT_NEXT_LETTER_SPEED
    this.pauseTime = options.pauseTime ?? DEFAULT_PAUSE_TIME
    this.paused = options.paused ?? DEFAULT_PAUSED

    this.currentText = this.texts[0]
    this.displayedText = this.initSymbols()
    this.render()

    if (!this.paused) {
      this.animate()
    }
  }

  public destroy(): void {
    this.clearAllIntervals()
  }

  public pause(): void {
    this.paused = true
    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout)
      this.pauseTimeout = null
    }
  }

  public play(): void {
    this.paused = false
    this.clearAllIntervals()
    this.animate()
  }

  public reset(): void {
    this.clearAllIntervals()
    this.currentText = this.texts[0]
    this.displayedText = this.initSymbols()
    this.render()
    this.leftIndexes = []

    if (!this.paused) {
      this.animate()
    }
  }

  public setTexts(texts: string[]): void {
    this.texts = texts
    this.reset()
  }

  private animate(): void {
    this.bakeText()
  }

  private bakeLetter(): void {
    this.bakeLetterInterval = setInterval(() => {
      if (!this.paused) {
        const updatedText: string[] = []

        this.currentText.split('').forEach((char, i) => {
          if (!this.leftIndexes.includes(i)) {
            updatedText[i] = this.currentText[i]
            return
          }
          updatedText[i] = randomItem(SYMBOLS)
        })

        this.displayedText = updatedText
        this.render()
      }
    }, this.letterSpeed)
  }

  private bakeText(): void {
    this.leftIndexes = this.currentText.split('').map((_, i) => i)

    this.bakeLetter()

    this.bakeTextInterval = setInterval(() => {
      if (!this.paused) {
        if (this.leftIndexes.length === 0) {
          this.clearAllIntervals()

          this.pauseTimeout = setTimeout(() => {
            this.currentText = nextItem(this.texts, this.currentText)
            this.displayedText = this.initSymbols()
            this.render()
            this.animate()
          }, this.pauseTime)
          return
        }

        this.leftIndexes.shift()
      }
    }, this.nextLetterSpeed)
  }

  private clearAllIntervals(): void {
    if (this.bakeLetterInterval) {
      clearInterval(this.bakeLetterInterval)
      this.bakeLetterInterval = null
    }
    if (this.bakeTextInterval) {
      clearInterval(this.bakeTextInterval)
      this.bakeTextInterval = null
    }
    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout)
      this.pauseTimeout = null
    }
  }

  private initSymbols(): string[] {
    return Array(this.currentText.length)
      .fill(0)
      .map(() => randomItem(SYMBOLS))
  }

  private render(): void {
    this.element.textContent = this.displayedText.join('')
  }
}

export function createTextScramble(
  element: HTMLElement,
  options: TextScrambleOptions,
): TextScrambleAnimator {
  return new TextScrambleAnimator(element, options)
}
