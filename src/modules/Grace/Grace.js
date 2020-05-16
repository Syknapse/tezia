import { chromatic, veryPrimary } from '../../data/index.js'
import { applyVisuals, updateInfoPanel, displayInfoPanel, shuffleArray } from '../../utils/index.js'

const Grace = {
  sound: 0,
  octave: 3,
  duration: 1,
  currentScale: [],
  shuffledCurrentScale: [],
  NUMBER_OF_NOTES: 7, // Arbitrary number of notes in the scale we create
  a: 0, // position note a
  b: 0, // position note b
  cycle: 1,
  repetitions: 7, // Arbitrary number of times the same A scale repeats
  scale: chromatic,
  colors: veryPrimary,
  timeoutClearA: null,
  timeoutClearB: null,
  timeoutClearC: null,
  TEMPO: 500,
  info: {}, // Used to update the info panel
  initialInfo() { // Used to create the info panel
    return {
      'note-A': '',
      'note-B': '',
      cycle: this.cycle,
      repetitions: this.repetitions,
      'scale-A': this.currentScale,
      'scale-B': this.shuffledCurrentScale,
    }
  },

  startLoopA() {
    this.timeoutClearA = setTimeout(() => {
      const note = this.currentScale[this.a]
      console.log('A+++++: ', note)
      Synth.play(this.sound, note, this.octave, this.duration)
      applyVisuals({ id: 'loop-a', note, colors: this.colors })
      this.info = {
        ...this.info,
        'note-A': note,
        cycle: this.cycle,
        repetitions: this.repetitions,
        'scale-A': this.currentScale
      }
      if (displayInfoPanel) updateInfoPanel(this.info)
      if (this.a < this.NUMBER_OF_NOTES - 1) {
        this.a++
      } else {
        this.a = 0
        this.cycle++
        console.log(`__________ cycle: ${this.cycle} ___________`)
      }
      this.startLoopA()
    }, this.TEMPO)
  },

  startLoopB() {
    this.timeoutClearB = setTimeout(() => {
      const note = this.shuffledCurrentScale[this.b]
      console.log('B------: ', note)
      Synth.play(this.sound, note, this.octave, this.duration)
      applyVisuals({ id: 'loop-b', note, colors: this.colors })
      this.info = {
        ...this.info,
        'note-B': note,
        'scale-B': this.shuffledCurrentScale,
      }
      if (displayInfoPanel) updateInfoPanel(this.info)
      if (this.b < this.NUMBER_OF_NOTES - 1) {
        this.b++
      } else {
        this.b = 0
        if (this.cycle > this.repetitions) {
          this.setCurrentScales()
          this.cycle = 1
          console.log('==========> new current scale: ', this.currentScale)
        } else {
          shuffleArray(this.shuffledCurrentScale)
          console.log('>>> reshuffle B scale: ', this.shuffledCurrentScale)
        }
      }
      this.startLoopB()
    }, this.TEMPO)
  },

  // Create a new scale by taking the specified number of random notes from the provided scale
  createRandomScale(scale) {
    return scale.sort(() => 0.5 - Math.random()).slice(0, this.NUMBER_OF_NOTES)
  },
  setCurrentScales() {
    this.currentScale = this.createRandomScale(this.scale)
    this.shuffledCurrentScale = shuffleArray([...this.currentScale])
  },

  start() {
    console.log('-----init-------')
    this.stop()
    Synth.setVolume(0.40)
    this.setCurrentScales()
    console.log('currentScale', this.currentScale)
    console.log('shuffledCurrentScale', this.shuffledCurrentScale)
    this.startLoopA()
    this.timeoutClearC = setTimeout(() => this.startLoopB(), this.TEMPO / 2)
  },

  stop() {
    clearTimeout(this.timeoutClearA)
    clearTimeout(this.timeoutClearB)
    clearTimeout(this.timeoutClearC)
    this.a = 0
    this.b = 0
    this.cycle = 1
  },
}

export default Grace