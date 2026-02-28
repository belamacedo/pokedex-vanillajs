import './style.css'
import { NavBar } from './components/NavBar.js'

document.querySelector('#app').innerHTML = `
  ${NavBar()}
`
