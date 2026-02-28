import { fetchPokemons } from './api'
import { NavBar, SearchBar, PokemonCard } from './components'
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
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center"
  ></div>
</div>
`

async function renderPokemons() {
  const pokemons = await fetchPokemons(18)

  const container = document.getElementById('pokemon-list')

  container.innerHTML = pokemons.map((pokemon) => PokemonCard(pokemon)).join('')
}

renderPokemons()
