export function unreachable(...t: never): never {
  throw new Error(`unreachable ${JSON.stringify(t)}`)
}
