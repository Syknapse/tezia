# Utils

## shuffleArray

shuffleArray takes an array as an argument then it shuffles its content randomly and returns it.  
// TODO Change it to return a new array instead of mutating the original.

## applyVisuals

**Add visual styles. Adds a color corresponding to each note to an element in the DOM**

applyVisuals is responsible for displaying the colors on screen. Each note is associated with a color defined in the files in `src/data/colors`. We pass it an object with the id of the DOM element we are targeting. The note that is currently playing. And the palette of colors it's going to apply from the data file.

## renderInfoPanel

**renderInfoPanel is responsible for showing and updating the info panel**

The info panel is activated by double clicking anywhere in the top control panel area. It shows info about the current selected mode. This info can be updated with every note. 

**showInfoPanel:** used to create the info panel. WE pass it an initial object of the parameters we want to show and their initial values.  
**hideInfoPanel:** used to destroy and hide the info panel.  
**updateInfoPanel:** used inside of the loop where we want to update the info. We pass it an object with the current values we want to show. This should have the same shape as the initial values. 

Warning: this can cause lag between the two loops