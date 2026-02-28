export function SearchBar() {
  return `
    <div class="w-full max-w-[720px] min-w-[360px] h-14 bg-[#F2F2F7] rounded-full flex items-center pl-10 pr-6">
      
      <input 
        type="text"
        placeholder="Faça uma busca pelo nome do pokémon"
        class="flex-1 bg-transparent outline-none text-base pr-3"
      />

      <i class="fa-solid fa-magnifying-glass text-[#49454F]"></i>

    </div>
  `
}
