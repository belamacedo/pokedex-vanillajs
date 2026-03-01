import { NavBar } from '@/components'
import { renderRoute } from '@/router'
import '@/style.css'

export function App() {
  const root = document.querySelector('#app')
  root.innerHTML = ''

  const layout = document.createElement('div')
  layout.className = 'min-h-screen bg-white flex flex-col'

  const header = NavBar()
  const main = document.createElement('main')
  main.className = 'flex-1 flex'

  layout.append(header, main)
  root.appendChild(layout)

  function handleRoute() {
    renderRoute(main)
  }

  window.addEventListener('hashchange', handleRoute)

  handleRoute()
}
