const sound = 0
const octave = 3
const duration = 1
const C_major = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
let a = 0
let b = 0
let interval = 1
let round = 0
let repetitions = 0
let timeoutClearA, timeoutClearB
const TEMPO = 600

const colors = {
   C: '#ef7d7d',
   D: '#7def96',
   E: '#7d8bef',
   F: '#e37def',
   G: '#7dcaef',
   A: '#efeb7d',
   B: '#efbc7d',
}

/* const startLoop = scale => {
   timeoutClearA = setTimeout(() => {
      const note = scale[a]
      // console.log('A+++++: ', note)
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-a', note)
      a < scale.length - 1 ? a++ : a = 0
      startLoop(scale)
   }, TEMPO)
} */
const startLoop = scale => {
   timeoutClearA = setTimeout(() => {
      const note = scale[a]
      // console.log('A+++++: ', note)
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-a', note)
      // a < scale.length - 1 ? a++ : a = 0
      if (a < scale.length - 1) {
         a++
      } else {
         a = 0
         round++
      }
      startLoop(scale)
   }, TEMPO)
}

/* const startLoopB = scale => {
   timeoutClearB = setTimeout(() => {
      const note = scale[b]
      console.log('B------: ', note)
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-b', note)
      b < scale.length - 1 ? b++ : b = 3
      startLoopB(scale)
   }, TEMPO)
} */

// b is the position of the note to play. increase by one until we reach the end of the scale.
// interval is the note interval from which to start
// When the b note reaches the end of the scale we repeat starting from the interval and indicate a new round
// The number of repetitions we want on each interval is in inverse relation to the length of the scale. (there are 7 notes, if interval is 3 the repetitions are 4 totaling 7)
// When we have had the amount of rounds the repetitions indicate, we push one interval up (interval++) and reset the round
// Problems to solve:
// check the repetitions are right

const startLoopB = scale => {
   timeoutClearB = setTimeout(() => {
      const note = scale[b]
      // console.log('B------: ', note)
      const repetitions = scale.length - interval
      console.log("interval, repetitions: ", interval, repetitions)
      console.log('round----: ', round)
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-b', note)
      b < scale.length - 1 ? b++ : b = interval
      /* if (b < scale.length - 1) {
         b++
      } else {
         b = interval
         round++
      } */
      if (round > repetitions) {
         interval === 6 ? interval = 1 : interval++
         
         round = 1
      }
      startLoopB(scale)
   }, TEMPO)
}
/* const startLoopB = scale => {
   timeoutClearB = setTimeout(() => {
      const note = scale[b]
      // console.log('B------: ', note)
      const repetitions = scale.length - interval
      console.log("interval, repetitions: ", interval, repetitions)
      console.log('round----: ', round)
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-b', note)
      if (b < scale.length - 1) {
         b++
      } else {
         b = interval
         round++
      }
      if (round > repetitions) {
         interval === 6 ? interval = 1 : interval++
         
         round = 1
      }
      startLoopB(scale)
   }, TEMPO)
} */
// repetitions--
         /* if (interval === 6) {
            interval = 1
            repetitions = scale.length - 1
         } else {
            interval++
         } */

const applyVisuals = (id, note) => {
   const el = document.getElementById(id)
   el.style.backgroundColor = colors[note]
   el.innerText = note
}

const init = () => {
   console.log('-----init-------')
   Synth.setVolume(0.50)
   // Synth.play(sound, 'C', '5', '4')
   stop()
   // repetitions = C_major.length - 1 
   startLoop(C_major)
   startLoopB(C_major)
}

const stop = () => {
   clearTimeout(timeoutClearA)
   clearTimeout(timeoutClearB)
   a = 0
   b = 0
   interval = 1
   round = 0
}

const button = document.getElementById('start')
let on = false
const toggleMusic = () => {
   on = !on
   console.log('toggle', on)
   on ? init() : stop()
}
button.addEventListener('click', toggleMusic)
