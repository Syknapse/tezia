// const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
// const NUMBER_OF_NOTES = 7
// const SCALE_REPETITIONS = 2 // probably 7
const C_major = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
// let currentScale = []
// let shuffled = []
const sound = 0
const octave = 3
const duration = 1
let i = 0
let b = 3
// let b = 0
// let c = 0
let timeoutClearA, timeoutClearB, timeoutClearC

const colors = {
   C: '#ef7d7d',
   D: '#7def96',
   E: '#7d8bef',
   F: '#e37def',
   G: '#7dcaef',
   A: '#efeb7d',
   B: '#efbc7d',
}

const startLoop = scale => {
   timeoutClearA = setTimeout(() => {
      const note = scale[i]
      console.log('A+++++: ', note)
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-a', note)
      i < scale.length - 1 ? i++ : i = 0
      startLoop(scale)
   }, 1000)
}

const startLoopB = scale => {
   timeoutClearB = setTimeout(() => {
      const note = scale[b]
      console.log('B------: ', note)
      console.log('============================')
      Synth.play(sound, note, octave, duration)
      applyVisuals('loop-b', note)
      b < scale.length - 1 ? b++ : b = 3

      startLoopB(scale)
   }, 1000)
}

const applyVisuals = (id, note) => {
   const el = document.getElementById(id)
   el.style.backgroundColor = colors[note]
   el.innerText = note
}

/* const startLoopB = () => {
   timeoutClearB = setTimeout(() => {
       const note = shuffled[b]
       console.log('B------: ', note)
    Synth.play(sound, note, octave, duration)
   if ( b < NUMBER_OF_NOTES - 1) {
      b++
   } else {
      reShuffle()
      return
   }
    startLoopB()
   }, 1000)
} */

/* const startLoopB = (scale, count) => {
   console.log('count: ', count)
   setTimeout(() => {
       const note = scale[count]
       console.log('------: ', count, note)
    Synth.play(sound, note, octave, duration)
    count < C_major.length - 1 ? count++ : reShuffle()
    startLoopB()
   }, 1000)
} */

/* const reShuffle = () => {
   b = 0
   c++
   console.log('c: ', c)
   if (c === SCALE_REPETITIONS) {
      console.log('REshuffle INIT --->')
      init()
      return
   }
   shuffle(shuffled)
   clearTimeout(timeoutClearB)
   startLoopB()
   console.log('REshuffled', shuffled)
} */

// let getRandomScale = () => chromaticScale.sort(() => 0.5 - Math.random()).slice(0, NUMBER_OF_NOTES)


/* const shuffle = array => {
   var currentIndex = array.length, temporaryValue, randomIndex;
 
   // While there remain elements to shuffle...
   while (0 !== currentIndex) {
 
     // Pick a remaining element...
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
 
     // And swap it with the current element.
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
   }
 
   return array;
 } */

const init = () => {
   console.log('Script B-----init-------', timeoutClearA, timeoutClearB, timeoutClearC)
   stop()
   // currentScale = getRandomScale()
   // shuffled = [...currentScale]
   // shuffle(shuffled)
   // console.log('currentScale', currentScale)
   // console.log('shuffled', shuffled)
   Synth.setVolume(0.50)
   startLoop(C_major)
   startLoopB(C_major)
   // timeoutClearC = setTimeout(() => startLoopB(), 500)
}

const stop = () => {
   clearTimeout(timeoutClearA)
   clearTimeout(timeoutClearB)
   // clearTimeout(timeoutClearC)
   i = 0
   b = 0
   c = 0
}

const button = document.getElementById('start')
let on = false
const toggleMusic = () => {
   on = !on
   console.log('toggle', on)
   on ? init() : stop()
}
button.addEventListener('click', toggleMusic)
