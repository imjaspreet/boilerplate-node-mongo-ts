import { CustomHelpers } from 'joi'

export const objectId = (value: string, helpers: CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' })
  }
  return value
}

export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({
      custom: 'password must be at least 8 characters',
    })
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message({
      custom: 'password must contain at least 1 letter and 1 number',
    })
  }
  return value
}
/**
 *
 * @param value {string}
 * @param helpers
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const splitStringToArray = (value: string, helpers: any) => {
  if (typeof value !== 'string') {
    return helpers.error('invalid String')
  }

  const array = value.split(',').map(item => item.trim())
  return array
}

export const ignoreEmptySearch = (value, helpers) => {
  if (value === '') {
    return value
  }
  return helpers.error('Invalid Value')
}
