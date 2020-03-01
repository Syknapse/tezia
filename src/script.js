const C_major = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const sound = 0
// const note = 'A'
const octave = 3
const duration = 1
let i = 0
let b = 3

const startLoop = () => {
   setTimeout(() => {
       const note = C_major[i]
       console.log('note: ', note)
    Synth.play(sound, note, octave, duration)
    i < C_major.length - 1 ? i++ : i = 0
    startLoop()
   }, 1000)
}

const startLoopB = () => {
   setTimeout(() => {
       const note = C_major[b]
       console.log('note: ', note)
    Synth.play(sound, note, octave, duration)
    b < C_major.length - 1 ? b++ : b = 0
    startLoop()
   }, 1000)
}

startLoop()
startLoopB()
