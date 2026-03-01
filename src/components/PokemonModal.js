import { typeStyles } from './PokemonCard'
import { t } from '../services'

export function createPokemonModal(pokemon) {
  const overlay = document.createElement('div')

  const mainType = pokemon.types[0]

  const mainStyle = typeStyles[mainType] || {
    base: '#F5F5F5',
    emoji: '',
  }

  overlay.className = `
    fixed inset-0 bg-black/50 backdrop-blur-sm
    flex items-center justify-center
    z-50 opacity-0 transition-opacity duration-300
  `

  overlay.innerHTML = `
<div class="bg-white w-[95%] max-w-[900px] rounded-2xl shadow-2xl transform scale-95 transition-all duration-300 overflow-hidden max-h-[90vh] flex flex-col">

  <div class="relative p-6 flex flex-col sm:flex-row items-center gap-6" style="background: ${mainStyle.base}">
    
    <button 
      class="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
      id="close-modal"
    >
      ✕
    </button>

    <img 
      src="${pokemon.image}"
      class="w-40 h-40 object-contain"
    />

    <div class="text-center sm:text-left">
      <h2 class="text-3xl font-bold capitalize">
        ${pokemon.name}
      </h2>

      <p class="text-gray-500 text-sm mb-3">
        #${pokemon.id.toString().padStart(3, '0')}
      </p>

      <div class="flex flex-wrap justify-center sm:justify-start gap-2">
       ${pokemon.types
         .map((type) => {
           const style = typeStyles[type] || { emoji: '' }

           return `
      <span class="px-3 py-1 bg-white shadow rounded-full text-sm capitalize flex items-center gap-2">
        <span class="text-base">${style.emoji}</span>
        ${t(`types.${type}`)}
      </span>
    `
         })
         .join('')}
      </div>
    </div>
  </div>

  <div class="p-6 overflow-y-auto">

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-8">
      <div>
        <p class="text-gray-500 text-xs uppercase">${t('pokemon.height')}</p>
        <p class="font-semibold text-lg"> ${new Intl.NumberFormat().format(pokemon.height / 10)} m</p>
      </div>
      <div>
        <p class="text-gray-500 text-xs uppercase">${t('pokemon.weight')}</p>
        <p class="font-semibold text-lg">${new Intl.NumberFormat().format(pokemon.weight / 10)} kg</p>
      </div>
      <div class="col-span-2 sm:col-span-2">
        <p class="text-gray-500 text-xs uppercase mb-2">${t('pokemon.abilities')}</p>
        <div class="flex flex-wrap justify-center gap-2">
          ${pokemon.abilities
            .map(
              (ability) => `
                <span class="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
                  ${ability}
                </span>
              `
            )
            .join('')}
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-4"> ${t('pokemon.base_stats')}</h3>

      <div class="grid sm:grid-cols-2 gap-x-6">
        ${pokemon.stats
          .map(
            (stat) => `
              <div class="mb-3">
                <div class="flex justify-between text-xs capitalize mb-1">
                  <span>${stat.name.replace('-', ' ')}</span>
                  <span>${stat.value}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style="width: ${Math.min(stat.value, 100)}%"
                  ></div>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    </div>

  </div>
</div>
`

  document.body.appendChild(overlay)

  requestAnimationFrame(() => {
    overlay.classList.remove('opacity-0')
    overlay.firstElementChild.classList.remove('scale-95')
  })

  function close() {
    overlay.classList.add('opacity-0')
    overlay.firstElementChild.classList.add('scale-95')

    setTimeout(() => overlay.remove(), 200)
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close()
  })

  overlay.querySelector('#close-modal').addEventListener('click', close)

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
}
