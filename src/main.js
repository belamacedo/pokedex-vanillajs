import { NavBar, SearchBar, PokemonCard, Pagination } from './components'
import store from './store'
import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  ${NavBar()}
  <div class="flex justify-center mt-8">
    ${SearchBar()}
  </div>
  <div class="mt-8 px-6">
    <div 
      id="pokemon-list" 
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center transition-opacity duration-300"
    ></div>
  </div>
  <div id="pagination-container" class="mt-10"></div>
`

const paginationElement = Pagination()
document.getElementById('pagination-container').appendChild(paginationElement)

function render(state) {
  const container = document.getElementById('pokemon-list')

  if (state.loading) {
    container.classList.add('opacity-50')
  } else {
    container.classList.remove('opacity-50')
  }

  if (state.error) {
    container.innerHTML = `<p class="col-span-full text-center text-red-500">${state.error}</p>`
    return
  }

  container.innerHTML = state.pokemons.map((p) => PokemonCard(p)).join('')

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

store.subscribe((state) => {
  render(state)
})

store.dispatchChangePage(1)
