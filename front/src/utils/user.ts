import { AutoCompletableItem } from '../components/molecules/AutoCompleteInput'

export function fullName(user: { familyName: string; givenName: string }) {
  return `${user.familyName} ${user.givenName}`
}

export function adminJp(user: { isAdmin: boolean }) {
  return user.isAdmin ? '管理者' : '一般'
}

export function autoCompletabeUser(user: {
  id: string
  familyName: string
  givenName: string
  familyNameFurigana: string
  givenNameFurigana: string
}): AutoCompletableItem<string> {
  return {
    id: user.id,
    label: fullName(user),
    completableStr:
      `${user.familyName} ${user.givenName}${user.familyNameFurigana} ${user.givenNameFurigana}` +
      `${
        `${user.familyName}${user.givenName}${user.familyNameFurigana}${user.givenNameFurigana}` +
        // eslint-disable-next-line no-irregular-whitespace
        `${user.familyName}　${user.givenName}${user.familyNameFurigana}　${user.givenNameFurigana}`
      }`,
  }
}
