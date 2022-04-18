import { unreachable } from '.'
import { ShownName } from '../generated/graphql'

type _Construction = {
  shownName: ShownName
  name: string
  code: string
  customShownName: string
}

export function shownName(construction: _Construction): string {
  if (construction.shownName === 'name') {
    return construction.name
  }
  if (construction.shownName === 'code') {
    return construction.code
  }
  if (construction.shownName === 'custom') {
    if (construction.customShownName === '') {
      console.error('shownName is custom but customShownName is empty')
    }
    return construction.customShownName
  }
  unreachable(construction.shownName)
}
