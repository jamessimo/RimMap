![Rimmap banner](https://github.com/jamessimo/RimMap/blob/master/banner.png?raw=true)

RimMap lets you view & share your Rimworld save in your web browser! Check it out on [itch.io here](http://jamessimo.itch.io/rimmap) 

## Current Features

✔ Shows all terrain, items, plants

✔ Can upload and share your gave save via URL

✔ Shows resouces, deep resouces & mountains

✔ Pan & zoom map with mouse & with arrow keys

✔ Include example maps

![Rimmap screenshot](https://github.com/jamessimo/RimMap/blob/master/screenshots/Screenshot1_v4-1.png?raw=true)

## Known Issues
* 0.19 save files have lots of missing items (also some graphics not updates 0.19
* Tilemap gitters when zooming in (Tilemap issue, investigate)

## WIP Features
* Map sharing **(in beta)**
* Mod support
* Full game save viewing (pawn info, animal info)
* ~~Refined Zooming and scrolling~~

## Future Planned Features
* Allow users to share their saves with other users using a short URL **(in beta)**
* Show the the entire world map
* Integrate with steam to download your save straight from the cloud
* Allow users embed and annotate saves (suggested by [@TynanSylvester](http://twitter.com/TynanSylvester/status/970936653517701120) himself!)
* Make this into an electron app that would track and record your current sessions and make a time laps of your game

## How to build
Just run
```npm install ``` then ```npm start ``` 
to start the build and watch process, will rebuild the entire /build folder when anything inside /src and /static changes. If you have to add new assets (images, files) then you need to re-run npm start.

## Changelog 

### (5.1.0)
* Added all new B19 items
* Tweaks to colors
* Added "Plan" view
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
* Modulized code better 

### (4.1.0)
* Added Sandbags
* Removed "Filth" or invisible items from tile click 

### (4.0.0)
* Beta 19 inital support pass (bridges and new tile types)
* Added ability to share maps via URL
* Added deep resource tilemap
* Default to non HD textures to fix crashes on windows machines
* Show item hit points 

### (3.0.0)
* More performance inhancements (resource tilemap made bitmap)
* Dynamic texture loading to drastically shorten the load times
* Modding support
* User can now use HD or non HD textures to help loading/performance 
* Screen edge pan camera

### (2.0.0)
* Added real world tile graphics
* Added all game items (beta 18)
* Added wall direcition code
* Added plants growth state
* Zooming in out (inital)
* Added example maps
* Improved loading times
* Huge performance improvements (7FPS to 60FPS)
* Loading progress bar

### (1.0.0)
* Initial commit
