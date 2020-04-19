const sound = 0 // Synth sound (piano)
const octave = 3
const duration = 1
let currentScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
let a = 0 // The position of note A to play
let b = 0 // The position of note B to play
let interval = 1 // The position in the scale array where not B begins (zero index). Musical interval is interval +1. 
let cycle = 0 // Number of elapsed cycles (full repetitions of the scale)
let repetitions = 0 // The number of repetitions loop B does before changing interval
let timeoutClearA, timeoutClearB
const TEMPO = 500

const scales = {
   C_maj: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
   D_maj: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
   E_maj: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
   F_maj: ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
   G_maj: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
   A_maj: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
   B_maj: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
}

const colors = {
   'C': '#ef7d7d',
   'C#': '#b05d5d',
   'D': '#7def96',
   'D#': '#63c077',
   'E': '#7d8bef',
   'F': '#e37def',
   'F#': '#984aa2',
   'G': '#7dcaef',
   'G#': '#4a7e97',
   'A': '#efeb7d',
   'A#': '#5cb07a',
   'B': '#efbc7d',
}

// Current scale is the scale we will be looping over. We get this by selecting a random key from the scales, then randomising the notes of the scale.
// a & b indicate the zero index position of the note to be played in the scale array. It increases by one until we reach the end of the scale.
// We start from interval 1. This is the equivalent of a 2nd interval in music.
// Loop B only plays the notes beginning from the interval position. Interval 1 plays all the notes minus the first while interval 6 plays only the last note.
// Cycle begins at 0 instead of 1 to give us one first cycle where A and B are in unison before the first cycle of shifting loops begins.
// When the b note reaches the end of the scale we repeat starting from the interval and indicate a new cycle
// The number of repetitions we want on each interval is in inverse relation to the length of the scale. (there are 7 notes, if interval is 3 the repetitions are 4 totaling 7)
// When we have had the amount of cycles the repetitions indicate, we push one interval up (interval++) and reset the cycle
// When we complete all repetitions we get a new randomised scale and start again

const startLoopA = () => {
   timeoutClearA = setTimeout(() => {
      const note = currentScale[a]
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-a', note)
      if (a < currentScale.length - 1) {
         a++
      } else {
         a = 0
         cycle++
      }
      startLoopA(currentScale)
   }, TEMPO)
}

const startLoopB = () => {
   timeoutClearB = setTimeout(() => {
      const note = currentScale[b]
      const repetitions = currentScale.length - interval
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-b', note)
      b < currentScale.length - 1 ? b++ : b = interval
      if (cycle > repetitions) {
         if (interval === 6) {
            currentScale = getRandomScale()
            interval = 1
         } else {
            interval++
         }
         cycle = 1
      }
      startLoopB(currentScale)
   }, TEMPO)
}

const applyVisuals = (id, note) => {
   const el = document.getElementById(id)
   el.style.backgroundColor = colors[note]
   el.innerText = note
}

const getRandomScale = () => {
   const shuffledScales = shuffle(Object.keys(scales)) // Get shuffled scale names
   const scale = scales[shuffledScales[0]] // Take the first scale
   const shuffledScale = shuffle(scale) // Shuffle the notes of the scale
   return shuffledScale
}

// Shuffle array util. From http://stackoverflow.com/a/2450976 
const shuffle = array => {
   let currentIndex = array.length
   let temporaryValue, randomIndex
 
   while (0 !== currentIndex) {
     randomIndex = Math.floor(Math.random() * currentIndex)
     currentIndex -= 1
     temporaryValue = array[currentIndex]
     array[currentIndex] = array[randomIndex]
     array[randomIndex] = temporaryValue
   }
 
   return array
 }

const start = () => {
   stop()
   currentScale = getRandomScale()
   Synth.setVolume(0.50)
   startLoopA()
   startLoopB()
}

const stop = () => {
   clearTimeout(timeoutClearA)
   clearTimeout(timeoutClearB)
   a = 0
   b = 0
   interval = 1
   cycle = 0
}

const button = document.getElementById('start')
let on = false
const toggleMusic = () => {
   on = !on
   on ? start() : stop()
}
button.addEventListener('click', toggleMusic)
