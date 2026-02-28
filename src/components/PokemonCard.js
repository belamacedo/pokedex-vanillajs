const typeStyles = {
  grass: { background: '#F0F3FF', text: '#11B047' },
  fire: { background: '#FFF3F0', text: '#E95C4B' },
  water: { background: '#F0F7FF', text: '#4B7BE9' },
  electric: { background: '#FFFBEF', text: '#E9B84B' },
  psychic: { background: '#FFF0F6', text: '#E94B9B' },
  ice: { background: '#F0FFFF', text: '#4BD8E9' },
  ground: { background: '#FFF6F0', text: '#C17C4B' },
  bug: { background: '#F7FFF0', text: '#8CBF26' },
  poison: { background: '#F8F0FF', text: '#9B4BE9' },
  normal: { background: '#F5F5F5', text: '#7A7A7A' },
  fairy: { background: '#FFF0FA', text: '#E94BC7' },
  fighting: { background: '#FFF0F0', text: '#D94B4B' },
  rock: { background: '#F7F5F0', text: '#A88C4B' },
  ghost: { background: '#F4F0FF', text: '#6E4BE9' },
  dragon: { background: '#F0F3FF', text: '#4B5BE9' },
}

export function PokemonCard(pokemon) {
  const mainType = pokemon.types[0]

  const style = typeStyles[mainType] || {
    background: '#F5F5F5',
    text: '#333',
  }

  return `
    <div 
      class="w-full px-4 pt-4 pb-14 rounded-lg flex flex-col transition-transform hover:scale-105 cursor-pointer"
      style="background: ${style.background}"
    >
      
      <div class="flex justify-between items-center text-xs font-medium">
        <span 
          class="capitalize" 
          style="color: ${style.text}"
        >
          ${mainType}
        </span>

        <span class="text-[#263156] font-bold">
          #${pokemon.id.toString().padStart(3, '0')}
        </span>
      </div>

      <div class="flex justify-center mt-6">
        <img 
          src="${pokemon.image}" 
          alt="${pokemon.name}"
          class="w-[143px] h-[143px] object-contain"
          loading="lazy"
        />
      </div>

      <h2 class="text-center font-bold text-[14px] leading-[14px] capitalize mt-4 text-[#263156]">
        ${pokemon.name}
      </h2>

    </div>
  `
}
