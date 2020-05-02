// Add visual styles
// @id: string. id of HTML element to apply visuals to.
// @note: string. Note name to display.
// @colors: array. Palette of colours corresponding with each note.
const applyVisuals = ({id, note, colors}) => {
    const el = document.getElementById(id)
    el.style.backgroundColor = colors[note]
    el.innerText = note
}

export default applyVisuals