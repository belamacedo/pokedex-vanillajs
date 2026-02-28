import { NavBar, SearchBar } from './components'
import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  ${NavBar()}
  <div class="flex justify-center mt-8">
    ${SearchBar()}
  </div>
`
