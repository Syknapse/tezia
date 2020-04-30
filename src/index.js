import Ada from './modules/Ada.js'

const button = document.getElementById('start')
let on = false

const toggleMusic = () => {
   on = !on
   on ? Ada.start() : Ada.stop()
}

button.addEventListener('click', toggleMusic)
