# Grace mode

## How it works

Current scale is the scale we will be looping over. We get this by creating a random scale based on the scale we've imported from data. We pass `createRandomScale(scale)` the number of notes and it then picks a random selection from the scale.

Shuffled current scale is the scale loop B will use and it is the same as current scale but with the notes randomised.

Each cycle loop A repeats in the same order, while loop b randomises the notes again.

This continues until we have done as many cycles as the repetitions indicate.  

Repetitions is an arbitrary number of times we want to repeat the process before changing loop A to a new scale.

```js
const Grace = {
  currentScale: [],
  shuffledCurrentScale: [],
  NUMBER_OF_NOTES: 7, // Arbitrary number of notes in the scale we create
  a: 0, // position note a
  b: 0, // position note b
  repetitions: 7, // Arbitrary number of times the same A scale repeats
  info: {}, // Used to update the info panel
  initialInfo() // Used to create the info panel


  // Create a new scale by taking the specified number of random notes from the provided scale
  createRandomScale(scale) {
    return scale.sort(() => 0.5 - Math.random()).slice(0, this.NUMBER_OF_NOTES)
  },
}
```