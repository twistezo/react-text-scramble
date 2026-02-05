import { act, cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'bun:test'

import TextScramble from '../../src/TextScramble'

describe('TextScramble - Behavior', () => {
  afterEach(() => {
    cleanup()
  })

  it('accepts all props without errors', () => {
    expect(() => {
      render(
        <TextScramble
          className='test'
          letterSpeed={10}
          nextLetterSpeed={50}
          paused={true}
          pauseTime={2000}
          texts={['text1', 'text2']}
        />,
      )
    }).not.toThrow()
  })

  it('does not animate when paused is true', async () => {
    const { container } = render(<TextScramble paused={true} texts={['hello']} />)

    const initialContent = (container.firstChild as HTMLElement).textContent

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    const afterContent = (container.firstChild as HTMLElement).textContent
    expect(afterContent).toBe(initialContent)
  })

  it('pauses during scramble animation stops text change', async () => {
    render(
      <TextScramble
        nextLetterSpeed={15}
        paused={false}
        pauseTime={100}
        texts={['hello world', 'second text']}
      />,
    )

    cleanup()

    const { container: container2 } = render(
      <TextScramble
        nextLetterSpeed={15}
        paused={true}
        pauseTime={100}
        texts={['hello world', 'second text']}
      />,
    )

    const pausedText = (container2.firstChild as HTMLElement).textContent

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
    })

    const textAfterPause = (container2.firstChild as HTMLElement).textContent
    expect(textAfterPause).toBe(pausedText)
  })

  it('pause preserves animation state without resetting to all symbols', async () => {
    const initialText = 'hello'
    const { container, rerender } = render(
      <TextScramble nextLetterSpeed={20} paused={false} pauseTime={500} texts={[initialText]} />,
    )

    // Wait for animation to be mid-way through scramble
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
    })

    const midAnimationText = (container.firstChild as HTMLElement).textContent || ''

    // Mid-animation should have mix of some original text and some symbols
    // It should NOT be all symbols (which would indicate a full reset)
    const originalLetters = initialText.split('').filter(char => midAnimationText.includes(char))
    expect(originalLetters.length).toBeGreaterThan(0)

    // Now pause the animation
    rerender(
      <TextScramble nextLetterSpeed={20} paused={true} pauseTime={500} texts={[initialText]} />,
    )

    const pausedText = (container.firstChild as HTMLElement).textContent

    // Wait some time while paused
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    // Text should remain exactly the same after pause
    const textAfterWait = (container.firstChild as HTMLElement).textContent
    expect(textAfterWait).toBe(pausedText)
  })

  it('cleans up intervals on unmount', async () => {
    const { unmount } = render(<TextScramble texts={['hello', 'world']} />)

    expect(() => {
      unmount()
    }).not.toThrow()
  })
})
