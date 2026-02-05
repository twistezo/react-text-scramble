import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { TextScrambleProps } from './types'

import {
  DEFAULT_LETTER_SPEED,
  DEFAULT_NEXT_LETTER_SPEED,
  DEFAULT_PAUSE_TIME,
  DEFAULT_PAUSED,
  SYMBOLS,
} from './constants'
import { nextItem, randomItem } from './utils'

const TextScramble: React.FC<TextScrambleProps> = ({
  className,
  letterSpeed = DEFAULT_LETTER_SPEED,
  nextLetterSpeed = DEFAULT_NEXT_LETTER_SPEED,
  paused = DEFAULT_PAUSED,
  pauseTime = DEFAULT_PAUSE_TIME,
  texts,
}) => {
  const [currentText, setCurrentText] = useState<string>(texts[0])
  const [displayedText, setDisplayedText] = useState<string[]>([])

  const bakeLetterIntervalRef = useRef<null | ReturnType<typeof setInterval>>(null)
  const bakeTextIntervalRef = useRef<null | ReturnType<typeof setInterval>>(null)
  const pauseTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null)
  const leftIndexesRef = useRef<number[]>([])
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
    if (paused && pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
      pauseTimeoutRef.current = null
    }
  }, [paused])

  const initSymbols = useMemo(
    () =>
      Array(currentText.length)
        .fill(0)
        .map(() => randomItem(SYMBOLS)),
    [currentText.length],
  )

  useEffect(() => {
    setDisplayedText(initSymbols)
  }, [initSymbols])

  const clearAllIntervals = useCallback(() => {
    if (bakeLetterIntervalRef.current) {
      clearInterval(bakeLetterIntervalRef.current)
      bakeLetterIntervalRef.current = null
    }
    if (bakeTextIntervalRef.current) {
      clearInterval(bakeTextIntervalRef.current)
      bakeTextIntervalRef.current = null
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
      pauseTimeoutRef.current = null
    }
  }, [])

  const bakeLetter = useCallback(() => {
    bakeLetterIntervalRef.current = setInterval(() => {
      if (!pausedRef.current) {
        const updatedText: string[] = []
        const leftIndexes = leftIndexesRef.current

        currentText.split('').forEach((char, i) => {
          if (!leftIndexes.includes(i)) {
            updatedText[i] = currentText[i]
            return
          }
          updatedText[i] = randomItem(SYMBOLS)
        })

        setDisplayedText(updatedText)
      }
    }, letterSpeed)
  }, [currentText, letterSpeed])

  const bakeText = useCallback(() => {
    leftIndexesRef.current = currentText.split('').map((_, i) => i)

    bakeLetter()

    bakeTextIntervalRef.current = setInterval(() => {
      if (!pausedRef.current) {
        if (leftIndexesRef.current.length === 0) {
          clearAllIntervals()

          pauseTimeoutRef.current = setTimeout(() => {
            setCurrentText(nextItem(texts, currentText))
          }, pauseTime)
          return
        }

        leftIndexesRef.current.shift()
      }
    }, nextLetterSpeed)
  }, [bakeLetter, clearAllIntervals, currentText, nextLetterSpeed, pauseTime, texts])

  useEffect(() => {
    if (!paused) {
      bakeText()
    }

    return () => {
      clearAllIntervals()
    }
  }, [bakeText, clearAllIntervals, paused])

  return <div className={className}>{displayedText}</div>
}

export default TextScramble
