import Ada from './modules/Ada.js'
import { showInfoPanel, hideInfoPanel } from './utils/index.js'

// Start button
const button = document.getElementById('start')
let on = false

const toggleMusic = () => {
  on = !on
  on ? Ada.start() : Ada.stop()
}

button.addEventListener('click', toggleMusic)

// Info panel
const controlPanel = document.getElementById('control-panel')
let showInfo = false

const showPanel = () => {
  showInfo = !showInfo
  showInfo ? showInfoPanel(Ada.initialInfo()) : hideInfoPanel()
}

controlPanel.addEventListener('dblclick', showPanel)