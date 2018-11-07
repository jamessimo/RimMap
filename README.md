![Rimmap banner](https://github.com/jamessimo/RimMap/blob/master/banner.png?raw=true)

Rimmap lets you view & share your Rimworld save in your web browser! Check it out on [itch.io here](http://jamessimo.itch.io/rimmap)

## Current Features

✔ Shows all terrain, items, plants & walls

✔ Upload and share your map via URL

✔ Shows resources, deep resources & mountains

✔ Example maps included

![Rimmap screenshot](https://github.com/jamessimo/RimMap/blob/master/screenshots/Screenshot1_v4-1.png?raw=true)

## Known Issues
* Ships don't render
* Missing new depleted uranium turret
* Unknown DeepResources IDs - Modconflict?
* Mods don't render

## WIP Features
* Map sharing **(in beta)**
* Mod support
* Full game save viewing (pawn & animal info)

## Future Planned Features
* Show inner thing (minified furniture)
* Show and edit zones
* Show heat map
* Better map sharing with auto thumbnail creation
* Show the the entire world map
* Integrate with steam to download your save straight from the cloud
* Allow users embed and annotate saves (suggested by [@TynanSylvester](http://twitter.com/TynanSylvester/status/970936653517701120) himself!)
* Make this into an electron app that would track and record your current sessions and make a time laps of your game

## How to build
Just run
```
npm install
npm start
```

This will start the build and watch process, should open a new browser window at http://localhost:3000 and will refresh with changes.

The entire /build folder will rebuild when anything inside /src and /static changes. If you have to add new assets (images, files) then you need to re-run npm start.

If you want to make a production build please run
```
npm run production
```

------

## Change log

### (5.3.0)
* Added more save info in top left corner (colony/tribe name & version number)
* **Technical**
* Updated Phaser CE, BrowserSync and Browserify
* Fixed Pre Regex to only get string before _
* Added "Install" to no-render list
* Cleaned up redundant code

### (5.2.0)
* Finalize for Rimworld v1.0
* Added Planning view
* Vastly improved zoom
* Added colors to deep resources
* No longer try to render blueprints or frames
* **Technical**
* Code cleanup
* Removed old tilemap code

### (5.1.0)
* Added all new B19 items
* Tweaks to colors
* Crisper graphics (anti-aliasing)
* **Technical**
* Refined resources code


### (5.0.0)
* You can now drag the map and use your mouse wheel to zoom (like the base game)
* Updated some of the old textures to use new Beta 0.19 items
* Added smoothed walls
* Added all deep resources names
* Fixed "mineable X" (resources that are damaged)
* Changed wording around "upload" and "load"
* **Technical**
* Now takes into account resources in stuff and places them in resources (also optimized resource loading)
* Partial Mod support (broke out texture load logic)
* Modularized code better

### (4.1.0)
* Added Sandbags
* Removed "Filth" or invisible items from tile click

### (4.0.0)
* Beta 19 initial support pass (bridges and new tile types)
* Added ability to share maps via URL
* Added deep resource tilemap
* Default to non HD textures to fix crashes on windows machines
* Show item hit points

### (3.0.0)
* More performance enhancements (resource tilemap made bitmap)
* Dynamic texture loading to drastically shorten the load times
* Modding support
* User can now use HD or non HD textures to help loading/performance
* Screen edge pan camera

### (2.0.0)
* Added real world tile graphics
* Added all game items (beta 18)
* Added wall direction code
* Added plants growth state
* Zooming in out (initial)
* Added example maps
* Improved loading times
* Huge performance improvements (7FPS to 60FPS)
* Loading progress bar

### (1.0.0)
* Initial commit
