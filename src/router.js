import { Home } from '@/pages/Home'
import { Pokedex } from '@/pages/Pokedex'

const routes = {
  home: Home,
  pokedex: Pokedex,
}

export function renderRoute(container) {
  const hash = window.location.hash.replace('#/', '') || 'home'

  const Page = routes[hash] || Home

  container.innerHTML = ''
  container.appendChild(Page())
}
