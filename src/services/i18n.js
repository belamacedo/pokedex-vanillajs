let currentLocale = 'pt'
const translations = {}

export async function loadLocale(locale) {
  const res = await fetch(`/src/locales/${locale}.json`)
  translations[locale] = await res.json()
  currentLocale = locale
}

export function t(key) {
  const keys = key.split('.')
  let value = translations[currentLocale]
  for (let k of keys) {
    if (!value) return key
    value = value[k]
  }
  return value || key
}
