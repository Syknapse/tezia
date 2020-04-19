const sound = 0 // Synth sound (piano)
const octave = 3
const duration = 1
const C_major = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
let a = 0 // The position of note A to play
let b = 0 // The position of note B to play
let interval = 1 // The position in the scale array where not B begins (zero index). Musical interval is interval +1. 
let cycle = 0 // Number of elapsed cycles (full repetitions of the scale)
let repetitions = 0 // The number of repetitions loop B does before changing interval
let timeoutClearA, timeoutClearB
const TEMPO = 500

const colors = {
   C: '#ef7d7d',
   D: '#7def96',
   E: '#7d8bef',
   F: '#e37def',
   G: '#7dcaef',
   A: '#efeb7d',
   B: '#efbc7d',
}

// a & b indicate the zero index position of the note to be played in the scale array. It increases by one until we reach the end of the scale.
// We start from interval 1. This is the equivalent of a 2nd interval in music.
// Loop B only plays the notes beginning from the interval position. Interval 1 plays all the notes minus the first while interval 6 plays only the last note.
// Cycle begins at 0 instead of 1 to give us one first cycle where A and B are in unison before the first cycle of shifting loops begins.
// When the b note reaches the end of the scale we repeat starting from the interval and indicate a new cycle
// The number of repetitions we want on each interval is in inverse relation to the length of the scale. (there are 7 notes, if interval is 3 the repetitions are 4 totaling 7)
// When we have had the amount of cycles the repetitions indicate, we push one interval up (interval++) and reset the cycle

const startLoopA = scale => {
   timeoutClearA = setTimeout(() => {
      const note = scale[a]
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-a', note)
      if (a < scale.length - 1) {
         a++
      } else {
         a = 0
         cycle++
      }
      startLoopA(scale)
   }, TEMPO)
}

const startLoopB = scale => {
   timeoutClearB = setTimeout(() => {
      const note = scale[b]
      const repetitions = scale.length - interval
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-b', note)
      b < scale.length - 1 ? b++ : b = interval
      if (cycle > repetitions) {
         interval === 6 ? interval = 1 : interval++
         cycle = 1
      }
      startLoopB(scale)
   }, TEMPO)
}

const applyVisuals = (id, note) => {
   const el = document.getElementById(id)
   el.style.backgroundColor = colors[note]
   el.innerText = note
}

const start = () => {
   stop()
   Synth.setVolume(0.50)
   startLoopA(C_major)
   startLoopB(C_major)
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
