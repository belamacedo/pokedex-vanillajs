import { t } from '../services'

export const typeStyles = {
  grass: { base: '#F0F3FF', emoji: '🌿' },
  fire: { base: '#FFF3F0', emoji: '🔥' },
  water: { base: '#F0F7FF', emoji: '💧' },
  electric: { base: '#FFFBEF', emoji: '⚡' },
  psychic: { base: '#FFF0F6', emoji: '🔮' },
  ice: { base: '#F0FFFF', emoji: '❄️' },
  ground: { base: '#FFF6F0', emoji: '🌍' },
  bug: { base: '#F7FFF0', emoji: '🐛' },
  poison: { base: '#F8F0FF', emoji: '☠️' },
  normal: { base: '#F5F5F5', emoji: '⚪' },
  fairy: { base: '#FFF0FA', emoji: '✨' },
  fighting: { base: '#FFF0F0', emoji: '🥊' },
  rock: { base: '#F7F5F0', emoji: '🪨' },
  ghost: { base: '#F4F0FF', emoji: '👻' },
  dragon: { base: '#F0F3FF', emoji: '🐉' },
  flying: { base: '#F0F7FF', emoji: '🕊️' }, // Adicionado
  steel: { base: '#F2F2F2', emoji: '⚙️' }, // Adicionado
  dark: { base: '#ECEBED', emoji: '🌙' }, // Adicionado
}

export function PokemonCard(pokemon) {
  const mainType = pokemon.types[0]

  const mainStyle = typeStyles[mainType] || {
    background: '#F5F5F5',
    text: '#333',
  }

  const typesHTML = pokemon.types
    .map((type) => {
      const style = typeStyles[type] || {
        background: '#F5F5F5',
        text: '#333',
        emoji: '',
      }

      const translated = t(`types.${type}`)

      return `
        <span
          class="flex items-center gap-1 hover:scale-110"
          title="${translated}"
        >
          <span class="text-lg leading-none"
            style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.25));">
              ${style.emoji}
         </span>
        </span>
      `
    })
    .join('')

  return `
    <div 
      data-id="${pokemon.id}"
      class="pokemon-card w-full px-4 pt-4 pb-14 rounded-2xl flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-md cursor-pointer"
      style="background: ${mainStyle.base}"
    >

      <div class="flex justify-between items-start">
        <div class="flex gap-2 flex-wrap">
          ${typesHTML}
        </div>

        <span class="text-[#263156] font-bold text-sm">
          #${pokemon.id.toString().padStart(3, '0')}
        </span>
      </div>

      <div class="flex justify-center mt-6">
        <img 
          src="${pokemon.image}" 
          alt="${pokemon.name}"
          class="w-[143px] h-[143px] object-contain transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
      </div>

      <h2 class="text-center font-bold text-[14px] leading-[14px] capitalize mt-4 text-[#263156]">
        ${pokemon.name}
      </h2>

    </div>
  `
}
