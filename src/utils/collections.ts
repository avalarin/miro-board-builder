export const repeat = <T>(n: number, v: T): T[] => {
  return [...Array(n).keys()].map(() => v)
}

export const repeatFn = <T>(n: number, fn: (n: number) => T): T[] => {
  return [...Array(n).keys()].map(fn)
}