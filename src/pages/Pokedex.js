import {
  SearchBar,
  TypeFilter,
  Pagination,
  PokemonCard,
  createPokemonModal,
} from '../components'
import { pokemonService } from '../services'

import store from '../store'

export function Pokedex() {
  const container = document.createElement('div')
  container.className =
    'max-w-[1300px] mx-auto px-6 w-full flex flex-col items-center'

  container.innerHTML = `
    <div id="search-container" class="w-full flex flex-col items-center mt-8 gap-4"></div>

    <div class="mt-8 w-full">
      <div 
        id="pokemon-list" 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-4 justify-items-center transition-opacity duration-300"
      ></div>
    </div>

    <div id="pagination-container" class="mt-10 mb-10"></div>
  `

  const searchContainer = container.querySelector('#search-container')
  const list = container.querySelector('#pokemon-list')
  const paginationContainer = container.querySelector('#pagination-container')

  searchContainer.appendChild(SearchBar())
  searchContainer.appendChild(TypeFilter())
  paginationContainer.appendChild(Pagination())

  list.addEventListener('click', async (e) => {
    const card = e.target.closest('.pokemon-card')
    if (!card) return

    const id = Number(card.dataset.id)

    try {
      // 🔄 busca detalhes completos
      const fullPokemon = await pokemonService.fetchPokemonById(id)

      if (fullPokemon) {
        createPokemonModal(fullPokemon)
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error)
    }
  })

  function render(state) {
    if (state.loading) list.classList.add('opacity-50')
    else list.classList.remove('opacity-50')

    if (state.error) {
      list.innerHTML = `
        <p class="col-span-full text-center text-red-500">
          ${state.error}
        </p>`
      return
    }

    list.innerHTML = state.pokemons.map((p) => PokemonCard(p)).join('')
  }

  store.subscribe(render)
  store.dispatchChangePage(1)

  return container
}
