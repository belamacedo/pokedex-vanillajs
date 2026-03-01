import { t } from '@/services'

export const typeStyles = {
  grass: { light: '#F0F3FF', strong: '#4CAF50', emoji: '🌿' },
  fire: { light: '#FFF3F0', strong: '#F44336', emoji: '🔥' },
  water: { light: '#F0F7FF', strong: '#2196F3', emoji: '💧' },
  electric: { light: '#FFFBEF', strong: '#FFC107', emoji: '⚡' },
  psychic: { light: '#FFF0F6', strong: '#E91E63', emoji: '🔮' },
  ice: { light: '#F0FFFF', strong: '#00BCD4', emoji: '❄️' },
  ground: { light: '#FFF6F0', strong: '#795548', emoji: '🌍' },
  bug: { light: '#F7FFF0', strong: '#8BC34A', emoji: '🐛' },
  poison: { light: '#F8F0FF', strong: '#9C27B0', emoji: '☠️' },
  normal: { light: '#F5F5F5', strong: '#9E9E9E', emoji: '⚪' },
  fairy: { light: '#FFF0FA', strong: '#FF80AB', emoji: '✨' },
  fighting: { light: '#FFF0F0', strong: '#D32F2F', emoji: '🥊' },
  rock: { light: '#F7F5F0', strong: '#A1887F', emoji: '🪨' },
  ghost: { light: '#F4F0FF', strong: '#673AB7', emoji: '👻' },
  dragon: { light: '#F0F3FF', strong: '#3F51B5', emoji: '🐉' },
  flying: { light: '#F0F7FF', strong: '#64B5F6', emoji: '🕊️' },
  steel: { light: '#F2F2F2', strong: '#607D8B', emoji: '⚙️' },
  dark: { light: '#ECEBED', strong: '#424242', emoji: '🌙' },
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
      style="background: ${mainStyle.light}"
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
