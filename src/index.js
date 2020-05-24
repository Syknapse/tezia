import { Ada, Grace } from './modules/index.js'
import { showInfoPanel, hideInfoPanel } from './utils/index.js'

const button = document.getElementById('start')
const panelsContainer = document.getElementById('panels-container')
const modeSelector = document.getElementById('mode-select')
let selectedMode, on, showInfo


const toggleButton = mode => {
  on = !on
  if (on) {
    mode.start()
    modeSelector.disabled = true
  } else {
    mode.stop()
    modeSelector.disabled = false
  }
}

const showPanel = mode => {
  showInfo = !showInfo
  showInfo ? showInfoPanel(mode.initialInfo()) : hideInfoPanel()
}

const selectMode = e => {
  switch (e.currentTarget.value) {
    case 'Ada':
      selectedMode = Ada
      if (showInfo) showInfoPanel(Ada.initialInfo())
      break
    case 'Grace':
      selectedMode = Grace
      if (showInfo) showInfoPanel(Grace.initialInfo())
      break
    default:
      selectedMode = Ada
      if (showInfo) showInfoPanel(Ada.initialInfo())
  }
}

const init = () => {
  selectedMode = Ada
  on = false
  showInfo = false
  button.addEventListener('click', () => toggleButton(selectedMode))
  panelsContainer.addEventListener('dblclick', () => showPanel(selectedMode))
  modeSelector.addEventListener('change', e => selectMode(e))
  console.info('** Double click the top control panel to view the info panel and have a peek inside of the patterns. **')
}

init()