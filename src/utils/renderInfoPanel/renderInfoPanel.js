const infoPanel = document.getElementById('info-panel')
let displayInfoPanel = false

const createInfoPanel = info => {
  destroyInfoPanel()
  Object.entries(info).forEach(([key, value]) => {
    const element = document.createElement('div')
    element.setAttribute('class', `info-item ${key}`)
    const item = `<span>${key}:</span><span>${value}</span>`
    element.innerHTML = item
    infoPanel.append(element)
  })
}

const destroyInfoPanel = () => {
  infoPanel.innerHTML = ''
}

const updateInfoPanel = info => {
  Object.entries(info).forEach(([key, value]) => {
    const element = document.querySelector(`.info-item.${key} span:nth-of-type(2)`)
    element.textContent = value
  })
}

const showInfoPanel = info => {
  displayInfoPanel = true
  createInfoPanel(info)
  infoPanel.style.display = 'flex'
}

const hideInfoPanel = () => {
  displayInfoPanel = false
  destroyInfoPanel()
  infoPanel.style.display = 'none'
}

export { showInfoPanel, hideInfoPanel, displayInfoPanel, updateInfoPanel }