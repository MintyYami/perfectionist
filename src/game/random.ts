/** Random whole number from `min` to `max`, inclusive. */
export function randomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

/** Random element of a list. The list must not be empty. */
export function randomItem<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)]
}
