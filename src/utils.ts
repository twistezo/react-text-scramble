export const randomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

export const nextItem = <T>(array: T[], currentItem: T): T => {
  const currentIndex = array.indexOf(currentItem)
  const bound = array.length
  const nextIndex = (currentIndex + bound + 1) % bound
  return array[nextIndex]
}
