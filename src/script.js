const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const NUMBER_OF_NOTES = 7
let randomScale = () => chromaticScale.sort(() => 0.5 - Math.random()).slice(0, NUMBER_OF_NOTES)
console.log('random scale: ', randomScale())
const C_major = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
// const shuffled = shuffle([...C_major])
const shuffled = [...C_major]
// const shuffled = [...randomScale()]
const sound = 0
// const note = 'A'
const octave = 3
const duration = 1
let i = 0
let b = 0

const startLoop = () => {
   setTimeout(() => {
       const note = C_major[i]
       console.log('+++++: ', note)
    Synth.play(sound, note, octave, duration)
    i < C_major.length - 1 ? i++ : i = 0
    startLoop()
   }, 1000)
}

/* const startLoopB = () => {
   setTimeout(() => {
       const note = C_major[b]
       console.log('++note: ', note)
    Synth.play(sound, note, octave, duration)
    b < C_major.length - 1 ? b++ : b = 3
    startLoopB()
   }, 1000)
} */
const startLoopB = () => {
   setTimeout(() => {
       const note = shuffled[b]
       console.log('------: ', note)
    Synth.play(sound, note, octave, duration)
    b < C_major.length - 1 ? b++ : reShuffle()
    startLoopB()
   }, 1000)
}
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

const reShuffle = () => {
   // i = 0
   b = 0
   shuffle(shuffled)
   console.log('REshuffled', shuffled)
}

const shuffle = array => {
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
 }

// console.log('C_major', C_major)
shuffle(shuffled)
console.log('C_major', C_major)
console.log('shuffled', shuffled)
console.log('i, b', i, b)
startLoop()
setTimeout(() => startLoopB(), 500)
// startLoopB(C_major, i)
// setTimeout(() => startLoopB(shuffled, b), 500)
