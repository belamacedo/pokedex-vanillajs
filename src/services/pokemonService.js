const GQL_URL = 'https://beta.pokeapi.co/graphql/v1beta'

export const pokemonService = {
  async fetchPokemons(limit = 18, offset = 0, name = '', type = '') {
    const query = `
  query getPokemons(
    $limit: Int, 
    $offset: Int, 
    $name: String,
    $type: String
  ) {
    pokemon: pokemon_v2_pokemon(
      limit: $limit,
      offset: $offset,
      where: {
        name: { _ilike: $name }
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _ilike: $type } }
        }
      }
    ) {
      id
      name
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type { name }
      }
    }

    info: pokemon_v2_pokemon_aggregate(
      where: {
        name: { _ilike: $name }
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _ilike: $type } }
        }
      }
    ) {
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
            type: type ? `%${type}%` : '%',
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

  async fetchPokemonById(id) {
    const query = `
    query getPokemonById($id: Int!) {
      pokemon_v2_pokemon_by_pk(id: $id) {
        id
        name
        height
        weight

        pokemon_v2_pokemontypes {
          pokemon_v2_type { name }
        }

        pokemon_v2_pokemonabilities {
          pokemon_v2_ability { name }
        }

        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat { name }
        }
      }
    }
  `

    try {
      const response = await fetch(GQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: { id },
        }),
      })

      const result = await response.json()

      if (result.errors) {
        console.error(result.errors)
        return null
      }

      const p = result.data.pokemon_v2_pokemon_by_pk

      return {
        id: p.id,
        name: p.name,
        height: p.height,
        weight: p.weight,
        types: p.pokemon_v2_pokemontypes.map((t) => t.pokemon_v2_type.name),
        abilities: p.pokemon_v2_pokemonabilities.map(
          (a) => a.pokemon_v2_ability.name
        ),
        stats: p.pokemon_v2_pokemonstats.map((s) => ({
          name: s.pokemon_v2_stat.name,
          value: s.base_stat,
        })),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
      }
    } catch (error) {
      console.error(error)
      return null
    }
  },
}
