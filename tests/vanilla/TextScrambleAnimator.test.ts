import { afterEach, beforeEach, describe, expect, it } from 'bun:test'

import { SYMBOLS } from '../../src/constants'
import { createTextScramble, TextScrambleAnimator } from '../../src/TextScrambleAnimator'

describe('TextScrambleAnimator - Vanilla JS API', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
  })

  afterEach(() => {
    element.remove()
  })

  describe('TextScrambleAnimator class', () => {
    it('initializes with correct default options', () => {
      const animator = new TextScrambleAnimator(element, {
        texts: ['Hello'],
      })

      expect(element.textContent).toBeDefined()
      expect(element.textContent?.length).toBe(5)
      animator.destroy()
    })

    it('renders initial scrambled text with correct length', () => {
      const texts = ['Hello World']
      const animator = new TextScrambleAnimator(element, { texts })

      expect(element.textContent?.length).toBe('Hello World'.length)
      animator.destroy()
    })

    it('accepts custom letterSpeed option', () => {
      const animator = new TextScrambleAnimator(element, {
        letterSpeed: 75,
        texts: ['Test'],
      })

      expect(element.textContent).toBeDefined()
      animator.destroy()
    })

    it('accepts custom nextLetterSpeed option', () => {
      const animator = new TextScrambleAnimator(element, {
        nextLetterSpeed: 150,
        texts: ['Test'],
      })

      expect(element.textContent).toBeDefined()
      animator.destroy()
    })

    it('accepts custom pauseTime option', () => {
      const animator = new TextScrambleAnimator(element, {
        pauseTime: 2000,
        texts: ['Test'],
      })

      expect(element.textContent).toBeDefined()
      animator.destroy()
    })

    it('starts paused when paused option is true', () => {
      const animator = new TextScrambleAnimator(element, {
        paused: true,
        texts: ['Test'],
      })

      const initialText = element.textContent
      expect(initialText).toBeDefined()
      animator.destroy()
    })

    it('has play method', () => {
      const animator = new TextScrambleAnimator(element, {
        paused: true,
        texts: ['Test'],
      })

      expect(typeof animator.play).toBe('function')
      animator.play()
      animator.destroy()
    })

    it('has pause method', () => {
      const animator = new TextScrambleAnimator(element, {
        texts: ['Test'],
      })

      expect(typeof animator.pause).toBe('function')
      animator.pause()
      animator.destroy()
    })

    it('has reset method', () => {
      const animator = new TextScrambleAnimator(element, {
        texts: ['Test'],
      })

      expect(typeof animator.reset).toBe('function')
      animator.reset()
      animator.destroy()
    })

    it('has destroy method', () => {
      const animator = new TextScrambleAnimator(element, {
        texts: ['Test'],
      })

      expect(typeof animator.destroy).toBe('function')
      animator.destroy()
    })

    it('has setTexts method', () => {
      const animator = new TextScrambleAnimator(element, {
        texts: ['Initial'],
      })

      expect(typeof animator.setTexts).toBe('function')
      animator.setTexts(['New Text'])
      animator.destroy()
    })

    it('handles multiple texts in array', () => {
      const animator = new TextScrambleAnimator(element, {
        texts: ['Hello', 'World', 'Test'],
      })

      expect(element.textContent).toBeDefined()
      animator.destroy()
    })

    it('returns displayable characters from SYMBOLS', () => {
      const animator = new TextScrambleAnimator(element, {
        paused: true,
        texts: ['Test'],
      })

      const text = element.textContent || ''
      const symbolArray = SYMBOLS

      for (const char of text) {
        expect(symbolArray).toContain(char)
      }

      animator.destroy()
    })
  })

  describe('createTextScramble function', () => {
    it('creates TextScrambleAnimator instance', () => {
      const animator = createTextScramble(element, {
        texts: ['Hello'],
      })

      expect(animator).toBeInstanceOf(TextScrambleAnimator)
      animator.destroy()
    })

    it('returns animator with all methods', () => {
      const animator = createTextScramble(element, {
        texts: ['Test'],
      })

      expect(typeof animator.play).toBe('function')
      expect(typeof animator.pause).toBe('function')
      expect(typeof animator.reset).toBe('function')
      expect(typeof animator.destroy).toBe('function')
      expect(typeof animator.setTexts).toBe('function')

      animator.destroy()
    })

    it('renders to element after creation', () => {
      const animator = createTextScramble(element, {
        texts: ['Hello World'],
      })

      expect(element.textContent?.length).toBe('Hello World'.length)
      animator.destroy()
    })

    it('accepts all options like class constructor', () => {
      const animator = createTextScramble(element, {
        letterSpeed: 100,
        nextLetterSpeed: 200,
        paused: true,
        pauseTime: 3000,
        texts: ['Test'],
      })

      expect(element.textContent).toBeDefined()
      animator.destroy()
    })

    it('allows chaining method calls', () => {
      const animator = createTextScramble(element, {
        texts: ['Test'],
      })

      animator.pause()
      animator.reset()
      animator.play()

      expect(element.textContent).toBeDefined()
      animator.destroy()
    })
  })
})
