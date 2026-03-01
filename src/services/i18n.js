import pt from '../locales/pt.json'
import en from '../locales/en.json'
import es from '../locales/es.json'

const locales = { pt, en, es }
let currentDictionary = pt

export async function loadLocale(lang) {
  currentDictionary = locales[lang] || locales['pt']
  return currentDictionary
}

export function t(path) {
  const keys = path.split('.')
  let value = currentDictionary

  for (const key of keys) {
    value = value?.[key]
    if (!value) return path
  }

  return value
}
