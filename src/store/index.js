import { pokemonService, t } from '@/services'

const store = {
  state: {
    pokemons: [],
    currentPage: 1,
    limit: 18,
    total: 0,
    loading: false,
    error: null,
    searchTerm: '',
    selectedType: '',
  },

  listeners: [],

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.notify()
  },

  getState() {
    return this.state
  },

  subscribe(listener) {
    this.listeners.push(listener)
    return () => (this.listeners = this.listeners.filter((l) => l !== listener))
  },

  notify() {
    this.listeners.forEach((listener) => listener(this.state))
  },

  async dispatchSearch(search) {
    this.setState({ searchTerm: search, currentPage: 1, loading: true })
    this.dispatchChangePage(1)
  },

  async dispatchFilterByType(type) {
    this.setState({ selectedType: type, currentPage: 1, loading: true })
    this.dispatchChangePage(1)
  },

  async dispatchChangePage(page) {
    this.setState({ loading: true })
    const { limit, searchTerm, selectedType } = this.state
    const offset = (page - 1) * limit

    try {
      const { pokemons, total } = await pokemonService.fetchPokemons(
        limit,
        offset,
        searchTerm,
        selectedType
      )
      this.setState({ pokemons, total, currentPage: page, loading: false })
    } catch (error) {
      this.setState({ error: t('loading_error'), loading: false })
    }
  },
}

export default store
