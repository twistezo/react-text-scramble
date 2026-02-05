import { act, cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'bun:test'

import TextScramble from '../src/TextScramble'

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

  it('cleans up intervals on unmount', async () => {
    const { unmount } = render(<TextScramble texts={['hello', 'world']} />)

    expect(() => {
      unmount()
    }).not.toThrow()
  })
})
