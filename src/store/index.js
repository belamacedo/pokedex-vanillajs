import { pokemonService } from '../api'

const store = {
  state: {
    pokemons: [],
    currentPage: 1,
    limit: 18,
    total: 0,
    loading: false,
    error: null,
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

  async dispatchChangePage(page) {
    this.setState({ loading: true })

    try {
      const limit = this.state.limit
      const offset = (page - 1) * limit

      const { pokemons, total } = await pokemonService.fetchPokemons(
        limit,
        offset
      )

      this.setState({
        pokemons,
        total,
        loading: false,
        currentPage: page,
      })
    } catch (error) {
      this.setState({ error: 'Erro ao carregar', loading: false })
    }
  },
}

export default store
