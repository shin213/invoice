import { User } from '../generated/graphql'

export function fullName<T extends Pick<User, 'familyName' | 'givenName'>>(user: T) {
  return `${user.familyName} ${user.givenName}`
}
