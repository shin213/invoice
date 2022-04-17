export function fullName<T extends { familyName: string; givenName: string }>(user: T) {
  return `${user.familyName} ${user.givenName}`
}

export function adminJp<T extends { isAdmin: boolean }>(user: T) {
  return user.isAdmin ? '管理者' : '一般'
}
