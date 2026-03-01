import { t } from '../services'

const routes = [
  { key: 'home', path: '#/home', label: () => t('home') },
  { key: 'pokedex', path: '#/pokedex', label: () => t('pokedex') },
]

export function NavBar() {
  const wrapper = document.createElement('header')
  wrapper.className =
    'w-full bg-white border-b border-gray-200 flex justify-center'

  wrapper.innerHTML = `
    <nav class="w-full h-24 max-w-[1300px] px-6 flex items-center justify-between">
      
      <img 
        src="/logo.png" 
        alt="Logo Pokedex" 
        class="h-10 object-contain cursor-pointer"
        data-path="#/home"
      />

      <div class="flex gap-3" id="nav-links"></div>

    </nav>
  `

  const linksContainer = wrapper.querySelector('#nav-links')

  routes.forEach((route) => {
    const button = document.createElement('button')

    button.dataset.path = route.path
    button.className =
      'p-2 rounded-lg text-base transition-all cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-900'

    button.textContent = route.label()

    linksContainer.appendChild(button)
  })

  function updateActiveState() {
    const current = window.location.hash || '#/home'

    wrapper.querySelectorAll('[data-path]').forEach((el) => {
      el.classList.remove('bg-gray-100', 'text-gray-900')

      if (el.dataset.path === current) {
        el.classList.add('bg-gray-100', 'text-gray-900')
      }
    })
  }

  wrapper.addEventListener('click', (e) => {
    const target = e.target.closest('[data-path]')
    if (!target) return

    window.location.hash = target.dataset.path
  })

  window.addEventListener('hashchange', updateActiveState)

  updateActiveState()

  return wrapper
}
