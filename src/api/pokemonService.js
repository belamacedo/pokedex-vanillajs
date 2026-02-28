const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemons(limit = 151) {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
    const data = await response.json()

    const detailedPromises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      return res.json()
    })

    return await Promise.all(detailedPromises)
  } catch (error) {
    throw new Error('Erro ao buscar Pokémons')
  }
}
