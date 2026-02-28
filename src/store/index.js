import { pokemonService } from '../api'

const store = {
  state: {
    pokemons: [],
    currentPage: 1,
    limit: 18,
    total: 0,
    loading: false,
    error: null,
    search: '',
  },

  listeners: [],

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.notify()
  },

  subscribe(listener) {
    this.listeners.push(listener)
    return () => (this.listeners = this.listeners.filter((l) => l !== listener))
  },

  notify() {
    this.listeners.forEach((listener) => listener(this.state))
  },

  async dispatchSearch(term) {
    this.setState({ searchTerm: term, currentPage: 1, loading: true })
    this.dispatchChangePage(1) // Reinicia na página 1 com o novo termo
  },

  async dispatchChangePage(page) {
    this.setState({ loading: true })
    const { limit, searchTerm } = this.state
    const offset = (page - 1) * limit

    try {
      // Passamos o searchTerm para o service
      const { pokemons, total } = await pokemonService.fetchPokemons(
        limit,
        offset,
        searchTerm
      )
      this.setState({ pokemons, total, currentPage: page, loading: false })
    } catch (error) {
      this.setState({ error: 'Erro ao buscar', loading: false })
    }
  },
}

export default store
