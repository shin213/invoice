export function existsSameElement<T>(arr: T[]): boolean {
  const s = new Set(arr)
  return s.size !== arr.length
}

export function unreachable(...t: never): never {
  throw new Error(`unreachable ${JSON.stringify(t)}`)
}

export function checkProperty(
  obj: unknown,
  propName: string | number,
): unknown {
  if (obj instanceof Object && propName in obj) {
    return (obj as { [key: string]: unknown })[propName]
  }
  return undefined
}

const alphabets =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
export function randomString(length: number): string {
  return Array.from(Array(length))
    .map(() => alphabets[Math.floor(Math.random() * alphabets.length)])
    .join('')
}
