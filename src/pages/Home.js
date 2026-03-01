import { t } from '../services'

export function Home() {
  const container = document.createElement('div')
  container.className = 'w-full'

  container.innerHTML = `
    <section class="relative w-full min-h-full flex items-center justify-center overflow-hidden">
      
      <img 
        src="hero-background.jpg"
        class="absolute inset-0 w-full h-full object-cover"
        alt="Pokemon background"
      />

      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

      <div class="relative z-10 text-center text-white px-6 max-w-[900px] flex flex-col items-center gap-6">
        
        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight">
         ${t('home_page.title')}
        </h1>

        <p class="text-lg md:text-xl text-gray-200 max-w-[600px]">
          ${t('home_page.description')}
        </p>

        <button 
          id="go-pokedex"
          class="mt-6 px-8 py-4 bg-yellow-400 text-[#263156] font-bold rounded-xl shadow-xl hover:scale-110 transition-transform duration-300"
        >
         ${t('home_page.button')}
        </button>

      </div>
    </section>
  `

  container.querySelector('#go-pokedex').addEventListener('click', () => {
    window.location.hash = '#/pokedex'
  })

  return container
}
