# Tezia

[Check it out now](https://syknapse.github.io/tezia/)

> Synaesthesia _/ˌsɪnɪsˈθiːzɪə/_
> The production of a sense impression relating to one sense or part of the body by stimulation of another sense or part of the body.

Tezia is a generative music project. It uses minimalist music and colour combinations. It creates melodies and shifting loops created by JavaScript.

Inspired by 60s minimalist music experiments like Steve Reich's. And by Cruz Novillo's [Opus 14](http://www.cruznovilloopus14.com/opus14.php) piece.

Each note is associated with a colour that shows on the screen while it plays. Two or more loops play creating interactions between them. It produces random combinations, some are repeating some are changing. Minimalist music theory tells us that repeating and shifting patterns create a very interesting effect in the listener's hearing where their own mind starts creating patterns that don't actually exist in the piece itself. This is caused by the psychoacoustics of hearing and the Gestalt effect where our brains complete fragmented patterns. It is more popularly familiar in optical illusions, but works in the same way in our hearing.

Then there is the latency between the loops created by your own system and network conditions which introduce a new factor of randomness that can produce another set of totally unplanned and delicious results.

## Ada mode

Ada mode selects a random major scale, it randomises the notes of the scale. Then it starts cycles of shifting loops. Each cycle drops one note of the scale in loop B and loops all the possible patterns with the original loop A. When all the patterns are complete, a new scale is randomised and the process starts again. All this is coupled with soothing pastel colors.  

Even though the order of the notes and the many combinations create a huge variety, the progression through the intervals is predictable and in itself creates a familiar pattern after a while. [Read more on how it works](src/modules/Ada/readme.md)

## Grace mode

Grace mode is a much harsher and more dissonant mode. This is mainly because it is based on a random chromatic scale. We start with all the chromatic notes, then take a specified number of them completely at random. Then our loop B takes this same scale and ramdomises the notes. The notes flow in a random melody, when loop B reaches the last note it randomises the scale again and repeats the process. This repeats for a specified number of times. Then a completly new and random set of notes are selected for a new scale and the process repeats. This is coupled with strong primary colors that match the dissonance. 

Having the entire chromatic scale to select from often results in sounds that are not very musical or pleasing. But the randomness means it is equally as probable to get a perfectly musical scale, and a loop b that just happens to have pleasing intervals. Making it possible in theory to generate nice melodies unexpectedly. [Read more on how it works](src/modules/Grace/readme.md)

## Acknowledgements

THis project is dedicated to my friends Mariajo and David and the lovely evening that inspired this project.