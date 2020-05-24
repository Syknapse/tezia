import { major, hipsterPastel } from '../../data/index.js'
import { applyVisuals, updateInfoPanel, displayInfoPanel, shuffleArray } from '../../utils/index.js'

const Ada = {
  sound: 0,
  octave: 3,
  duration: 1,
  currentScale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  a: 0,
  b: 0,
  interval: 1,
  cycle: 0,
  repetitions() {
  
    return this.currentScale.length - this.interval
  },
  scales: major,
  colors: hipsterPastel,
  timeoutClearA: null,
  timeoutClearB: null,
  TEMPO: 500,
  info: {},
  initialInfo() {
    return {
      'note-A': '',
      'note-B': '',
      cycle: this.cycle,
      interval: 0, 
      repetitions: this.repetitions(),
      scale: this.currentScale
    }
  },

  startLoopA() {
    this.timeoutClearA = setTimeout(() => {
      const note = this.currentScale[this.a]
      Synth.play(this.sound, note, this.octave, this.duration)
      applyVisuals({ id: 'loop-a', note, colors: this.colors })
      this.info = {
        ...this.info,
        'note-A': note,
        cycle: this.cycle,
        interval: this.interval + 1,
        repetitions: this.repetitions(),
        scale: this.currentScale
      }
      if (displayInfoPanel) updateInfoPanel(this.info)
      if (this.a < this.currentScale.length - 1) {
        this.a++
      } else {
        this.a = 0
        this.cycle++
      }
      this.startLoopA()
    }, this.TEMPO)
  },

  startLoopB() {
    this.timeoutClearB = setTimeout(() => {
      const note = this.currentScale[this.b]
      Synth.play(this.sound, note, this.octave, this.duration)
      applyVisuals({ id: 'loop-b', note, colors: this.colors })
      this.info = {
        ...this.info,
        'note-B': note,
      }
      if (displayInfoPanel) updateInfoPanel(this.info)
      this.b < this.currentScale.length - 1 ? this.b++ : this.b = this.interval
      if (this.cycle > this.repetitions()) {
        if (this.interval === 6) {
          this.currentScale = this.getRandomScale()
          this.interval = 1
        } else {
          this.interval++
        }
        this.cycle = 1
      }
      this.startLoopB()
    }, this.TEMPO)
  },

  getRandomScale() {
    const shuffledScales = shuffleArray(Object.keys(this.scales))
    const scale = this.scales[shuffledScales[0]]
    const shuffledScale = shuffleArray(scale)
    return shuffledScale
  },

  start() {
    this.stop()
    this.currentScale = this.getRandomScale()
    Synth.setVolume(0.50)
    this.startLoopA()
    this.startLoopB()
  },

  stop() {
    clearTimeout(this.timeoutClearA)
    clearTimeout(this.timeoutClearB)
    this.a = 0
    this.b = 0
    this.interval = 1
    this.cycle = 0
  },
}

export default Ada