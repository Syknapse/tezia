# Ada mode

## How it works

Current scale is the scale we will be looping over. We get this by selecting a random key from the scales we've imported from data, then randomising the notes of the scale using `getRandomScale()`.

a & b indicate the zero index position of the note to be played in the scale array. It increases by one until with every loop repetition we reach the end of the scale.

We start from interval 1. This is the equivalent of a 2nd interval in music.

Loop B only plays the notes beginning from the interval position. Interval 1 plays all the notes minus the first while interval 6 plays only the last note.

Cycle begins at 0 instead of 1 to give us one first cycle where A and B are in unison before the first cycle of shifting loops begins.

When the b note reaches the end of the scale we repeat starting from the interval and indicate a new cycle

The number of repetitions we want on each interval is in inverse relation to the length of the scale. (there are 7 notes, if interval is 3 the repetitions are 4 totaling 7)

When we have had the amount of cycles the repetitions indicate, we push one interval up (interval++) and reset the cycle

When we complete all repetitions we get a new randomised scale and start again

```js
const Ada = {
  sound: 0, // Synth sound (piano)
  octave: 3,
  duration: 1,
  currentScale: [], // The scale we are currently playing.
  a: 0, // The position of note A to play
  b: 0, // The position of note B to play
  interval: 1, // The position in the scale array where not B begins (zero index). Musical interval is interval +1. 
  cycle: 0, // Number of elapsed cycles (full repetitions of the scale)
  repetitions() {
    // The number of repetitions loop A does before loop B changes interval
    return this.currentScale.length - this.interval
  },
  scales: major, // The scales we import form data
  colors: hipsterPastel, // the colors associated with each note imported from data
  info: {}, // Used to update the info panel
  initialInfo() // Used to create the info panel

  getRandomScale() {
    const shuffledScales = shuffleArray(Object.keys(this.scales)) // Get shuffled scale names
    const scale = this.scales[shuffledScales[0]] // Take the first scale
    const shuffledScale = shuffleArray(scale) // Shuffle the notes of the scale
    return shuffledScale
  },
}
```