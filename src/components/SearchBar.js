import store from '../store'

export function SearchBar() {
  const wrapper = document.createElement('div')
  wrapper.className =
    'w-full max-w-[720px] min-w-[360px] h-14 bg-[#F2F2F7] rounded-full flex items-center pl-10 pr-6'

  wrapper.innerHTML = `
    <input 
      type="text"
      placeholder="Faça uma busca pelo nome do pokémon"
      class="flex-1 bg-transparent outline-none text-base pr-3"
    />
    <i class="fa-solid fa-magnifying-glass text-[#49454F]"></i>
  `

  const input = wrapper.querySelector('input')

  // Debounce para não disparar a API a cada tecla (opcional, mas recomendado)
  let timeout
  input.addEventListener('input', (e) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      store.dispatchSearch(e.target.value)
    }, 500) // Aguarda 500ms após o usuário parar de digitar
  })

  return wrapper
}
