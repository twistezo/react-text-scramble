import { act, cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, mock } from 'bun:test'

import TextScramble from '../src/TextScramble'

describe('TextScramble - Props Respect', () => {
  afterEach(() => {
    cleanup()
    mock.restore()
  })

  it('respects letterSpeed and nextLetterSpeed props on iteration repeat with single text', async () => {
    const customLetterSpeed = 25
    const customNextLetterSpeed = 50
    const customPauseTime = 100

    const setIntervalCalls: Array<{ delay: number }> = []
    const setTimeoutCalls: Array<{ delay: number }> = []

    const originalSetInterval = global.setInterval
    const originalSetTimeout = global.setTimeout

    global.setInterval = mock((callback: () => void, delay?: number) => {
      setIntervalCalls.push({ delay: delay || 0 })
      return originalSetInterval(callback, delay) as ReturnType<typeof setInterval>
    })

    global.setTimeout = mock((callback: () => void, delay?: number) => {
      setTimeoutCalls.push({ delay: delay || 0 })
      return originalSetTimeout(callback, delay) as ReturnType<typeof setTimeout>
    })

    try {
      render(
        <TextScramble
          letterSpeed={customLetterSpeed}
          nextLetterSpeed={customNextLetterSpeed}
          pauseTime={customPauseTime}
          texts={['dev']}
        />,
      )

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 350))
      })

      const letterSpeedCalls = setIntervalCalls.filter(call => call.delay === customLetterSpeed)
      const nextLetterSpeedCalls = setIntervalCalls.filter(
        call => call.delay === customNextLetterSpeed,
      )
      const pauseTimeCalls = setTimeoutCalls.filter(call => call.delay === customPauseTime)

      expect(letterSpeedCalls.length).toBeGreaterThanOrEqual(1)
      expect(nextLetterSpeedCalls.length).toBeGreaterThanOrEqual(1)
      expect(pauseTimeCalls.length).toBeGreaterThanOrEqual(1)

      const firstLetterSpeedCallIdx = setIntervalCalls.findIndex(
        call => call.delay === customLetterSpeed,
      )
      const firstNextLetterSpeedCallIdx = setIntervalCalls.findIndex(
        call => call.delay === customNextLetterSpeed,
      )

      expect(firstLetterSpeedCallIdx).toBeGreaterThanOrEqual(0)
      expect(firstNextLetterSpeedCallIdx).toBeGreaterThanOrEqual(0)
      expect(firstLetterSpeedCallIdx).toBeLessThan(firstNextLetterSpeedCallIdx)
    } finally {
      global.setInterval = originalSetInterval
      global.setTimeout = originalSetTimeout
    }
  })

  it('respects changed letterSpeed and nextLetterSpeed props on second iteration with single text', async () => {
    const allIntervalDelays: number[] = []

    const originalSetInterval = global.setInterval

    global.setInterval = mock((callback: () => void, delay?: number) => {
      allIntervalDelays.push(delay || 0)
      return originalSetInterval(callback, delay) as ReturnType<typeof setInterval>
    })

    try {
      const { rerender } = render(
        <TextScramble letterSpeed={10} nextLetterSpeed={20} pauseTime={80} texts={['a']} />,
      )

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 150))
      })

      const callsAfterFirstIteration = [...allIntervalDelays]

      allIntervalDelays.length = 0

      rerender(<TextScramble letterSpeed={50} nextLetterSpeed={100} pauseTime={80} texts={['a']} />)

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 150))
      })

      const callsAfterSecondIteration = allIntervalDelays

      expect(callsAfterFirstIteration).toContain(10)
      expect(callsAfterFirstIteration).toContain(20)
      expect(callsAfterSecondIteration).toContain(50)
      expect(callsAfterSecondIteration).toContain(100)
    } finally {
      global.setInterval = originalSetInterval
    }
  })

  it('keeps custom letterSpeed/nextLetterSpeed on repeat iterations with single text (no prop changes)', async () => {
    const allIntervalDelays: number[] = []
    const defaultNextLetterSpeed = 100

    const originalSetInterval = global.setInterval

    global.setInterval = mock((callback: () => void, delay?: number) => {
      allIntervalDelays.push(delay || 0)
      return originalSetInterval(callback, delay) as ReturnType<typeof setInterval>
    })

    try {
      const customLetterSpeed = 15
      const customNextLetterSpeed = 35

      render(
        <TextScramble
          letterSpeed={customLetterSpeed}
          nextLetterSpeed={customNextLetterSpeed}
          pauseTime={100}
          texts={['test']}
        />,
      )

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 450))
      })

      const intervalDelays = allIntervalDelays

      const hasCustomLetterSpeed = intervalDelays.includes(customLetterSpeed)
      const hasCustomNextLetterSpeed = intervalDelays.includes(customNextLetterSpeed)
      const hasDefaultLetterSpeed = intervalDelays.includes(5)
      const hasDefaultNextLetterSpeed = intervalDelays.includes(defaultNextLetterSpeed)

      expect(hasCustomLetterSpeed).toBe(true)
      expect(hasCustomNextLetterSpeed).toBe(true)
      expect(hasDefaultLetterSpeed).toBe(false)
      expect(hasDefaultNextLetterSpeed).toBe(false)
    } finally {
      global.setInterval = originalSetInterval
    }
  })

  it('triggers proper cleanup and re-creation for second iteration with same text', async () => {
    const setIntervalCalls: Array<number> = []
    const setClearIntervalCalls: Array<ReturnType<typeof setInterval>> = []

    const originalSetInterval = global.setInterval
    const originalClearInterval = global.clearInterval

    global.setInterval = mock((callback: () => void, delay?: number) => {
      setIntervalCalls.push(delay || 0)
      const id = originalSetInterval(callback, delay) as ReturnType<typeof setInterval>
      return id
    })

    global.clearInterval = mock((id: ReturnType<typeof setInterval>) => {
      setClearIntervalCalls.push(id)
      return originalClearInterval(id) as void
    })

    try {
      const customLetterSpeed = 22
      const customNextLetterSpeed = 44

      render(
        <TextScramble
          letterSpeed={customLetterSpeed}
          nextLetterSpeed={customNextLetterSpeed}
          pauseTime={100}
          texts={['a']}
        />,
      )

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 350))
      })

      const firstIterationIntervals = setIntervalCalls.slice()
      const clearCalls = setClearIntervalCalls.length

      expect(firstIterationIntervals.length).toBeGreaterThan(0)
      expect(clearCalls).toBeGreaterThan(0)
      expect(firstIterationIntervals).toContain(customLetterSpeed)
      expect(firstIterationIntervals).toContain(customNextLetterSpeed)
    } finally {
      global.setInterval = originalSetInterval
      global.clearInterval = originalClearInterval
    }
  })
})
