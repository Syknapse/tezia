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

export default shuffle