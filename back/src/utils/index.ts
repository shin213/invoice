export function existsSameElement<T>(arr: T[]): boolean {
  const s = new Set(arr)
  return s.size !== arr.length
}
