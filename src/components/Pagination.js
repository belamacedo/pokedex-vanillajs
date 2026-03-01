import { t } from '@/services'
import store from '@/store'

const paginationStyles = {
  current: 'bg-poke-dark text-white cursor-default',
  default:
    'bg-transparent text-poke-text-main hover:bg-poke-border cursor-pointer',
  navBtn:
    'h-8 w-[109px] flex items-center justify-center gap-2 rounded-sm transition-all font-normal',
  numBtn:
    'h-8 min-w-8 px-2 flex items-center justify-center rounded-sm transition-all',
  disabled:
    'opacity-50 cursor-not-allowed text-poke-muted hover:bg-transparent pointer-events-auto',
  ellipsis:
    'h-8 w-8 flex items-center justify-center cursor-default text-poke-muted',
}

export function Pagination() {
  const wrapper = document.createElement('div')
  wrapper.className =
    'flex items-center justify-center gap-2 mt-10 mb-10 text-[14px]'

  const render = () => {
    const { currentPage: curr, total, limit, loading } = store.state
    const totalPages = Math.ceil(total / limit) || 1

    const range = 1
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, i) => i + 1
    ).filter(
      (i) =>
        i === 1 || i === totalPages || (i >= curr - range && i <= curr + range)
    )

    const pagesWithEllipsis = pageNumbers.reduce((acc, currPage, idx) => {
      if (idx > 0) {
        const prevPage = pageNumbers[idx - 1]
        if (currPage - prevPage === 2) {
          acc.push(prevPage + 1)
        } else if (currPage - prevPage > 2) {
          acc.push('...')
        }
      }
      acc.push(currPage)
      return acc
    }, [])

    const prevDisabled = curr === 1 || loading
    const nextDisabled = curr === totalPages || loading

    const pageButtonsHtml = pagesWithEllipsis
      .map((page) => {
        if (page === '...') {
          return `<span class="${paginationStyles.ellipsis}">...</span>`
        }

        const isCurrent = page === curr
        const stateStyle = isCurrent
          ? paginationStyles.current
          : paginationStyles.default

        return `
        <button data-page="${page}" ${isCurrent ? 'disabled' : ''} 
          class="${paginationStyles.numBtn} ${stateStyle} ${loading ? 'opacity-50' : ''}">
          ${page}
        </button>`
      })
      .join('')

    wrapper.innerHTML = `
      <button data-action="prev" ${prevDisabled ? 'disabled' : ''} 
        class="${paginationStyles.navBtn} ${prevDisabled ? paginationStyles.disabled : 'text-poke-text-main hover:bg-poke-border cursor-pointer'}">
        <i class="fa-solid fa-arrow-left"></i> ${t('previous')}
      </button>

      <div class="flex items-center gap-1">
        ${pageButtonsHtml}
      </div>

      <button data-action="next" ${nextDisabled ? 'disabled' : ''} 
        class="${paginationStyles.navBtn} ${nextDisabled ? paginationStyles.disabled : 'text-poke-text-main hover:bg-poke-border cursor-pointer'}">
        ${t('next')} <i class="fa-solid fa-arrow-right"></i>
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
