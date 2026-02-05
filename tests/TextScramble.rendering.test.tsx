import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'bun:test'

import TextScramble from '../src/TextScramble'

describe('TextScramble - Rendering', () => {
  afterEach(() => {
    cleanup()
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
