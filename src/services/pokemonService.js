const GQL_URL = 'https://beta.pokeapi.co/graphql/v1beta'

export const pokemonService = {
  async fetchPokemons(limit = 18, offset = 0, name = '') {
    const query = `
    query getPokemons($limit: Int, $offset: Int, $name: String) {
      pokemon: pokemon_v2_pokemon(
        limit: $limit, 
        offset: $offset, 
        where: { name: { _ilike: $name } }
      ) {
        id
        name
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type { name }
        }
      }
      info: pokemon_v2_pokemon_aggregate(where: { name: { _ilike: $name } }) {
        aggregate { count }
      }
    }
  `

    try {
      const response = await fetch(GQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: {
            limit,
            offset,
            name: `${name}%`,
          },
        }),
      })

      const result = await response.json()

      if (result.errors) {
        console.error('GQL Errors:', result.errors)
        return { pokemons: [], total: 0 }
      }

      return {
        pokemons: result.data.pokemon.map((p) => ({
          id: p.id,
          name: p.name,
          types: p.types.map((t) => t.type.name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
        })),
        total: result.data.info.aggregate.count,
      }
    } catch (error) {
      console.error('Fetch error:', error)
      return { pokemons: [], total: 0 }
    }
  },
}
