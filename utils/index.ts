import type { Updater } from '@tanstack/vue-table'

export function joinValues<T>(array: T[], separator = ' | '): string {
  return array.map((val) => (typeof val === 'string' ? `'${val}'` : val)).join(separator)
}

export function jsonStringifyReplacer<T>(_: string, value: T): T | string {
  if (typeof value === 'bigint') {
    return value.toString()
  }

  return value
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  for (const key in value) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      return false
    }
  }

  return true
}

export function getKeyAndValues(
  param: unknown,
  defaultKey: string,
  i18n: any
): {
  values: Record<string, string>
  key: string
} {
  const { t } = i18n
  if (typeof param === 'string') {
    return { key: param, values: {} }
  }

  if (isRecord(param)) {
    const key = 'key' in param && typeof param.key === 'string' ? param.key : defaultKey
    const values =
      'values' in param && isRecord(param.values)
        ? Object.entries(param.values).reduce((acc, [key, value]) => {
            acc = { ...acc, [key]: t(value as string) }
            return acc
          }, {})
        : {}

    return { key, values }
  }

  return { key: defaultKey, values: {} }
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}
