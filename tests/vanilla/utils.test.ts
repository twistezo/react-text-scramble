import { describe, expect, it } from 'bun:test'

import { nextItem, randomItem } from '../../src/utils'

describe('randomItem', () => {
  it('returns an element from the array', () => {
    const array = ['a', 'b', 'c', 'd', 'e']
    const result = randomItem(array)
    expect(array).toContain(result)
  })

  it('returns the only element from single-item array', () => {
    const array = ['only']
    const result = randomItem(array)
    expect(result).toBe('only')
  })

  it('works with number arrays', () => {
    const array = [1, 2, 3, 4, 5]
    const result = randomItem(array)
    expect(array).toContain(result)
    expect(typeof result).toBe('number')
  })

  it('returns different values over multiple calls (statistical test)', () => {
    const array = ['a', 'b', 'c', 'd', 'e']
    const results = new Set<string>()

    for (let i = 0; i < 100; i++) {
      results.add(randomItem(array))
    }

    expect(results.size).toBeGreaterThan(1)
  })
})

describe('nextItem', () => {
  it('returns the next element in array', () => {
    const array = ['a', 'b', 'c', 'd']
    expect(nextItem(array, 'a')).toBe('b')
    expect(nextItem(array, 'b')).toBe('c')
    expect(nextItem(array, 'c')).toBe('d')
  })

  it('wraps around to first element when current is last', () => {
    const array = ['a', 'b', 'c']
    expect(nextItem(array, 'c')).toBe('a')
  })

  it('works with number arrays', () => {
    const array = [10, 20, 30]
    expect(nextItem(array, 10)).toBe(20)
    expect(nextItem(array, 30)).toBe(10)
  })

  it('returns first element for single-item array', () => {
    const array = ['only']
    expect(nextItem(array, 'only')).toBe('only')
  })

  it('returns first element when current item is not in array', () => {
    const array = ['a', 'b', 'c']
    expect(nextItem(array, 'x')).toBe('a')
  })
})
