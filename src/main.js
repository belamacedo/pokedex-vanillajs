import { App } from './App'
import { loadLocale } from './services'

const browserLang = navigator.language.slice(0, 2)
await loadLocale(browserLang)

document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.hash) {
    window.location.hash = '#/home'
  }

  App()
})
