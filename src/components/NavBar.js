import { t } from '../services'

export function NavBar() {
  const wrapper = document.createElement('header')
  wrapper.className =
    'w-full bg-[#FFFFFF] border-b border-[#D9D9D9] flex justify-center'

  let activeTab = 'home'

  const navStyles = {
    base: 'p-2 rounded-lg text-base font-normal transition-all cursor-pointer outline-none',
    active: 'bg-[#F5F5F5] text-[#1E1E1E]',
    inactive: 'text-[#757575] hover:bg-[#F5F5F5] hover:text-[#1E1E1E]',
  }

  const render = () => {
    wrapper.innerHTML = `
      <nav class="w-full h-24 max-w-[1300px] px-6 flex items-center justify-between">
        <img 
          src="/logo.png" 
          alt="Logo Pokedex" 
          class="h-10 object-contain cursor-pointer"
          data-tab="home"
        />

        <div class="flex gap-3">
          <button data-tab="home" class="${navStyles.base} ${activeTab === 'home' ? navStyles.active : navStyles.inactive}">
            ${t('home')}
          </button>

          <button data-tab="pokedex" class="${navStyles.base} ${activeTab === 'pokedex' ? navStyles.active : navStyles.inactive}">
            ${t('pokedex')}
          </button>
        </div>
      </nav>
    `
  }

  wrapper.onclick = (e) => {
    const target = e.target.closest('[data-tab]')
    if (!target) return

    activeTab = target.dataset.tab
    if (activeTab === 'home') store.dispatchSearch('')
    render()
  }

  render()
  return wrapper
}
