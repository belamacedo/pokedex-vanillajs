import store from '../store'

const paginationStyles = {
  current: 'bg-[#2C2C2C] text-white cursor-default',
  default: 'bg-transparent text-[#1E1E1E] hover:bg-gray-200 cursor-pointer',
  navBtn:
    'h-8 w-[109px] flex items-center justify-center gap-2 rounded-sm transition-all font-medium',
  numBtn: 'h-8 w-8 flex items-center justify-center rounded-sm transition-all',
  disabled:
    'opacity-50 cursor-not-allowed text-[#757575] hover:bg-transparent pointer-events-auto',
}

export function Pagination() {
  const wrapper = document.createElement('div')
  wrapper.className =
    'flex items-center justify-center gap-2 mt-10 mb-10 text-[14px]'

  const render = () => {
    const { currentPage: curr, total, limit, loading } = store.state
    const totalPages = Math.ceil(total / limit) || 1

    let start = Math.max(1, curr - 1)
    let end = Math.min(totalPages, start + 2)
    if (end - start < 2) start = Math.max(1, end - 2)

    const prevDisabled = curr === 1 || loading
    const nextDisabled = curr === totalPages || loading

    const pageButtonsHtml = Array.from({ length: end - start + 1 }, (_, i) => {
      const pageNum = start + i
      const isCurrent = pageNum === curr

      const stateStyle = isCurrent
        ? paginationStyles.current
        : paginationStyles.default
      const interactionClass =
        isCurrent || loading
          ? 'cursor-not-allowed pointer-events-auto'
          : 'cursor-pointer'

      return `<button data-page="${pageNum}" ${isCurrent ? 'disabled' : ''} 
                class="${paginationStyles.numBtn} ${stateStyle} ${interactionClass} ${loading ? 'opacity-50' : ''}">
                ${pageNum}
              </button>`
    }).join('')

    wrapper.innerHTML = `
      <button data-action="prev" ${prevDisabled ? 'disabled' : ''} 
        class="${paginationStyles.navBtn} ${prevDisabled ? paginationStyles.disabled : 'text-[#1E1E1E] hover:bg-gray-200 cursor-pointer'}">
        <i class="fas fa-arrow-left text-[10px]"></i> Anterior
      </button>

      <div class="flex items-center gap-2">
        ${pageButtonsHtml}
      </div>

      <button data-action="next" ${nextDisabled ? 'disabled' : ''} 
        class="${paginationStyles.navBtn} ${nextDisabled ? paginationStyles.disabled : 'text-[#1E1E1E] hover:bg-gray-200 cursor-pointer'}">
        Próximo <i class="fas fa-arrow-right text-[10px]"></i>
      </button>
    `
  }

  wrapper.onclick = (e) => {
    const btn = e.target.closest('button')
    if (!btn || btn.disabled || store.state.loading) return

    const { action, page } = btn.dataset
    if (action) {
      store.dispatchChangePage(
        action === 'prev'
          ? store.state.currentPage - 1
          : store.state.currentPage + 1
      )
    }
    if (page) store.dispatchChangePage(Number(page))
  }

  store.subscribe(render)
  render()

  return wrapper
}
