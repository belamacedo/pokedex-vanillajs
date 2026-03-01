import { t } from '@/services'
import store from '@/store'

export function SearchBar() {
  const wrapper = document.createElement('div')
  wrapper.className =
    'w-full max-w-[720px] min-w-[360px] h-14 bg-border rounded-full flex items-center pl-10 pr-6'

  wrapper.innerHTML = `
  <input 
    type="text"
    placeholder="${t('search_placeholder')}"
    class="flex-1 bg-transparent outline-none text-base pr-3"
  />
  <i class="fa-solid fa-magnifying-glass text-[#49454F]"></i>
`

  const input = wrapper.querySelector('input')

  let timeout
  input.addEventListener('input', (e) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      store.dispatchSearch(e.target.value)
    }, 500)
  })

  return wrapper
}
