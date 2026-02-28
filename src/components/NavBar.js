export function NavBar() {
  return `
    <nav class="w-full h-24 bg-[#FFFFFF] border-b border-[#D9D9D9] px-8 flex items-center justify-between">
      
      <img 
        src="/logo.png" 
        alt="Logo Pokedex" 
        class="h-10 object-contain"
      />

      <div class="flex gap-3">
        <button class="p-2 rounded-lg text-base font-normal hover:bg-[#F5F5F5] transition">
          Home
        </button>

        <button class="p-2 rounded-lg text-base font-normal hover:bg-[#F5F5F5] transition">
          Pokédex
        </button>
      </div>
    </nav>
  `
}
