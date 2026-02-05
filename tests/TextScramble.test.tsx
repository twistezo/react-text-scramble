import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'

import TextScramble from '../src/TextScramble'

describe('TextScramble', () => {
  beforeEach(() => {
    mock.module('../src/utils', () => ({
      nextItem: <T,>(array: T[], currentItem: T): T => {
        const currentIndex = array.indexOf(currentItem)
        const nextIndex = (currentIndex + 1) % array.length
        return array[nextIndex]
      },
      randomItem: <T,>(array: T[]): T => array[0],
    }))
  })

  afterEach(() => {
    cleanup()
    mock.restore()
  })

  it('renders a div element', () => {
    render(<TextScramble texts={['hello']} />)
    const element = screen.getByText(/./i)
    expect(element.tagName).toBe('DIV')
  })

  it('applies className prop to the container', () => {
    const { container } = render(<TextScramble className='custom-class' texts={['hello']} />)
    const div = container.firstChild as HTMLElement
    expect(div.className).toBe('custom-class')
  })

  it('renders with initial scrambled text of correct length', () => {
    const { container } = render(<TextScramble texts={['hello']} />)
    const div = container.firstChild as HTMLElement
    expect(div.textContent?.length).toBe(5)
  })

  it('handles empty string in texts array', () => {
    const { container } = render(<TextScramble texts={['']} />)
    const div = container.firstChild as HTMLElement
    expect(div.textContent).toBe('')
  })

  it('renders text with correct initial length', () => {
    const { container } = render(<TextScramble texts={['a']} />)
    let div = container.firstChild as HTMLElement
    expect(div.textContent?.length).toBe(1)

    cleanup()

    const { container: container2 } = render(<TextScramble texts={['longer text here']} />)
    div = container2.firstChild as HTMLElement
    expect(div.textContent?.length).toBe(16)
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

  it('handles texts array with multiple items', () => {
    expect(() => {
      render(<TextScramble texts={['first', 'second', 'third']} />)
    }).not.toThrow()
  })

  it('uses default values for optional props', () => {
    const { container } = render(<TextScramble texts={['test']} />)
    expect(container.firstChild).toBeTruthy()
  })
})
