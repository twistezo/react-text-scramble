import { useEffect, useRef } from 'react'

import type { TextScrambleProps } from './types'

import { TextScrambleAnimator } from './TextScrambleAnimator'

const TextScramble: React.FC<TextScrambleProps> = ({
  className,
  letterSpeed,
  nextLetterSpeed,
  paused,
  pauseTime,
  texts,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const animatorRef = useRef<null | TextScrambleAnimator>(null)

  useEffect(() => {
    if (!elementRef.current) return

    animatorRef.current = new TextScrambleAnimator(elementRef.current, {
      letterSpeed,
      nextLetterSpeed,
      paused,
      pauseTime,
      texts,
    })

    return () => {
      animatorRef.current?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts, letterSpeed, nextLetterSpeed, pauseTime])

  useEffect(() => {
    if (!animatorRef.current) return

    if (paused) {
      animatorRef.current.pause()
    } else {
      animatorRef.current.play()
    }
  }, [paused])

  return <div className={className} ref={elementRef} />
}

export default TextScramble
