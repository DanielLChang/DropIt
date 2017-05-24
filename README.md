# DropIt

[Drop It!][dropit] is an interactive soundboard app created with vanilla Javascript, jQuery, and styled using HTML5/CSS3.

[dropit]: http://www.dropit.audio

![DropIt home page: www.dropit.audio][splash page]

[splash page]: ./docs/images/splashpage.png "Drop It splash page"

## Major Features
- [x] An about modal appears when page first loads.
- [x] Users are able to play audio samples using the letters on their keyboard.
- [x] Firework animations are synced with audio samples.
- [x] Users are able to switch between sound and color sets with the space bar.


![DropIt sounds: www.dropit.audio][sounds]

[sounds]: ./docs/images/sounds.png "Drop It sounds"

![DropIt changeset: www.dropit.audio][changeset]

[changeset]: ./docs/images/changeset.png "Drop It change set"

## Project Design
Drop It! was designed and built within a week.
A [proposal][proposal] and [wireframes][wireframes] were prepared in order to provide a timeline for the development stage.

[proposal]: ./docs/README.md
[wireframes]: ./docs/wireframe

## Technology
* The [Howler.js][howler] audio library is used to play audio samples when a letter or spacebar is pressed.

[howler]: https://github.com/goldfire/howler.js#documentation

* The [Canvas][canvas] HTML element is used to draw fireworks using scripting.

[canvas]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial

* The [Anime.js][anime] animation library is used to animate the Canvas firework drawings.

[anime]: https://github.com/juliangarnier/anime

* The [Animate.css][animate] cross-browser animations are used to animate the text upon page load and key presses.

[animate]: https://github.com/daneden/animate.css

## Future Plans
- [ ] Each soundset will have different animations to help better distinguish the difference.
- [ ] Implement a rails backend to save tunes.
- [ ] Link to specific tunes in order to share with friends.
