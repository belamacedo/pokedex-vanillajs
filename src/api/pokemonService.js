const GQL_URL = 'https://beta.pokeapi.co/graphql/v1beta'

export const pokemonService = {
  async fetchPokemons(limit = 18, offset = 0) {
    const query = `
      query getPokemons($limit: Int, $offset: Int) {
        # Busca a lista
        pokemon: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
          id
          name
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              name
            }
          }
        }
        # Busca o total de registros no banco
        info: pokemon_v2_pokemon_aggregate {
          aggregate {
            count
          }
        }
      }
    `

    try {
      const response = await fetch(GQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { limit, offset } }),
      })

      const result = await response.json()

      if (result.errors) return { pokemons: [], total: 0 }

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
      return { pokemons: [], total: 0 }
    }
  },
}
