import { t } from '@/services'
import store from '@/store'
import { PokemonTypes } from '@/types'

export function TypeFilter() {
  const wrapper = document.createElement('div')
  wrapper.className =
    'w-full max-w-[720px] flex flex-wrap justify-center gap-2 mt-4'

  const render = (activeType = null) => {
    wrapper.innerHTML = PokemonTypes.map((type) => {
      const translated = t(`types.${type}`)
      const isActive = activeType === type

      const baseClasses = `
      px-4 py-1.5 
      rounded-full 
      text-sm 
      font-semibold 
      tracking-wide
      transition-all 
      duration-200
      border
    `

      const activeClasses = `
      bg-poke-navy 
      text-white 
      border-poke-navy
      shadow-md
      scale-105
    `

      const inactiveClasses = `
      bg-white 
      text-poke-navy 
      border-poke-navy
      hover:bg-poke-navy
      hover:text-white
      hover:shadow-md
      hover:-translate-y-0.5
    `

      return `
      <button 
        data-type="${type}" 
        class="${baseClasses} ${isActive ? activeClasses : inactiveClasses}"
      >
        ${translated}
      </button>
    `
    }).join('')
  }

  let activeType = null

  wrapper.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-type]')
    if (!btn) return

    const type = btn.dataset.type
    activeType = activeType === type ? null : type

    store.dispatchFilterByType(activeType)

    render(activeType)
  })

  render()
  return wrapper
}
