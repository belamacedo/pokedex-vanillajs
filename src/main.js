import { NavBar, SearchBar, PokemonCard, Pagination } from './components'
import store from './store'
import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <div id="navbar-container"></div>
  
  <main class="max-w-[1300px] mx-auto px-6 w-full flex flex-col items-center">
    <div id="search-container" class="w-full flex justify-center mt-8"></div>

    <div class="mt-8 w-full">
      <div 
        id="pokemon-list" 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-4 justify-items-center transition-opacity duration-300"
      ></div>
    </div>

    <div id="pagination-container" class="mt-10 mb-10"></div>
  </main>
`

document.getElementById('navbar-container').appendChild(NavBar())

const searchContainer = document.getElementById('search-container')
const paginationContainer = document.getElementById('pagination-container')

searchContainer.appendChild(SearchBar())

paginationContainer.appendChild(Pagination())

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
