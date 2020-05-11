const sound = 0
const octave = 3
const duration = 1
const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const NUMBER_OF_NOTES = 7 // Arbitrary number of notes in the scale we create
const repetitions = 7 // Arbitrary number of times the same A scale repeats
let currentScale = []
let shuffledCurrentScale = []
let a = 0 // position note a
let b = 0 // position note b
let cycle = 1
let timeoutClearA, timeoutClearB, timeoutClearC
const TEMPO = 500

const startLoop = () => {
  timeoutClearA = setTimeout(() => {
    const note = currentScale[a]
    console.log('A+++++: ', note)
    Synth.play(sound, note, octave, duration)
    if (a < NUMBER_OF_NOTES - 1) {
      a++
    } else {
      a = 0
      cycle++
      console.log(`__________ cycle: ${cycle} ___________`)
    }
    startLoop()
  }, TEMPO)
}

const startLoopB = () => {
  timeoutClearB = setTimeout(() => {
    const note = shuffledCurrentScale[b]
    console.log('B------: ', note)
    Synth.play(sound, note, octave, duration)
    if (b < NUMBER_OF_NOTES - 1) {
      b++
    } else {
      b = 0
      if (cycle > repetitions) {
        setCurrentScales()
        cycle = 1
        console.log('==========> new current scale: ', currentScale)
      } else {
        shuffle(shuffledCurrentScale)
        console.log('>>> reshuffle B scale: ', shuffledCurrentScale)
      }
    }
    startLoopB()
  }, TEMPO)
}

// Create a new scale by taking the specified number of random notes from the provided scale
const createRandomScale = scale => scale.sort(() => 0.5 - Math.random()).slice(0, NUMBER_OF_NOTES)
const setCurrentScales = () => {
  currentScale = createRandomScale(chromaticScale)
  shuffledCurrentScale = shuffle([...currentScale])
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

const init = () => {
  console.log('-----init-------')
  stop()
  Synth.setVolume(0.40)
  setCurrentScales()
  console.log('currentScale', currentScale)
  console.log('shuffledCurrentScale', shuffledCurrentScale)
  startLoop()
  timeoutClearC = setTimeout(() => startLoopB(), 250)
}

const stop = () => {
  clearTimeout(timeoutClearA)
  clearTimeout(timeoutClearB)
  clearTimeout(timeoutClearC)
  a = 0
  b = 0
  cycle = 1
}

const button = document.getElementById('start')
let on = false
const toggleMusic = () => {
  on = !on
  console.log('toggle', on)
  on ? init() : stop()
}
button.addEventListener('click', toggleMusic)
