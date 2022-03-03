export function existsSameElement<T>(arr: T[]): boolean {
  const s = new Set(arr)
  return s.size !== arr.length
}

export function unreachable(...t: never): never {
  throw new Error(`unreachable ${JSON.stringify(t)}`)
}
