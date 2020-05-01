import major from '../_res/scales/major.js'
import hipsterPastel from '../_res/colors/hipster-pastel.js'
import { applyVisuals, updateInfoPanel, displayInfoPanel, shuffleArray } from '../utils/index.js'

// Current scale is the scale we will be looping over. We get this by selecting a random key from the scales, then randomising the notes of the scale.
// a & b indicate the zero index position of the note to be played in the scale array. It increases by one until we reach the end of the scale.
// We start from interval 1. This is the equivalent of a 2nd interval in music.
// Loop B only plays the notes beginning from the interval position. Interval 1 plays all the notes minus the first while interval 6 plays only the last note.
// Cycle begins at 0 instead of 1 to give us one first cycle where A and B are in unison before the first cycle of shifting loops begins.
// When the b note reaches the end of the scale we repeat starting from the interval and indicate a new cycle
// The number of repetitions we want on each interval is in inverse relation to the length of the scale. (there are 7 notes, if interval is 3 the repetitions are 4 totaling 7)
// When we have had the amount of cycles the repetitions indicate, we push one interval up (interval++) and reset the cycle
// When we complete all repetitions we get a new randomised scale and start again

const Ada = {
  sound: 0, // Synth sound (piano)
  octave: 3,
  duration: 1,
  currentScale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  a: 0, // The position of note A to play
  b: 0, // The position of note B to play
  interval: 1, // The position in the scale array where not B begins (zero index). Musical interval is interval +1. 
  cycle: 0, // Number of elapsed cycles (full repetitions of the scale)
  repetitions() {
    // The number of repetitions loop A does before loop B changes interval
    return this.currentScale.length - this.interval
  },
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
  timeoutClearA: null,
  timeoutClearB: null,
  TEMPO: 500,
  scales: major,
  colors: hipsterPastel,

  startLoopA() {
    this.timeoutClearA = setTimeout(() => {
      const note = this.currentScale[this.a]
      Synth.play(this.sound, note, this.octave, this.duration)
      applyVisuals({ id: 'loop-a', note, colors: this.colors })
      this.info = {
        ...this.info,
        'note-A': note,
        cycle: this.cycle,
        interval: this.interval + 1, // Add one to get non-zero based musical interval
        repetitions: this.repetitions(),
        scale: this.currentScale
      }
      console.log('displayInfoPanel: ', displayInfoPanel)
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
    const shuffledScales = shuffleArray(Object.keys(this.scales)) // Get shuffled scale names
    const scale = this.scales[shuffledScales[0]] // Take the first scale
    const shuffledScale = shuffleArray(scale) // Shuffle the notes of the scale
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