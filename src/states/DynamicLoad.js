class DynamicLoad extends Phaser.State {

  create() {
    this.worldSize = {
      x: 0,
      y: 0,
      z: 0
    };
    this.toLoadJson = {
      "image": {}
    };
    this.loadingDelta = 0;
  }

  loadWorld(json) {

    //SETUP LOADING
    console.log('File In DynamicLoad');

    let rawSizes = null;
    //FETCH META DATA
    //IF MANY MAPS
    if (json.savegame.game.maps.li.length) {
      json.savegame.game.maps.li = json.savegame.game.maps.li[0];
    }

    //console.log(json.savegame.game.maps.li);

    rawSizes = json.savegame.game.maps.li.mapInfo.size;

    let sizes = this.getPosition(rawSizes);
    this.worldSize.x = sizes[0];
    this.worldSize.y = sizes[2];
    this.worldSize.z = sizes[1];

    const toLoadAssets = this.getUniqueStuff(json.savegame.game.maps.li.things.thing);

    let allAssets = this.game.cache.getJSON("assets");
    let regex = new RegExp('\_(.*)');

    for (let i = 0; i < toLoadAssets.length; i++) {

      //  toLoadJson.push(allAssets.image[toLoadAssets[i]])
      let filterName = null;
      if (regex.exec(toLoadAssets[i])) {
        filterName = regex.exec(toLoadAssets[i])[1];
      } else {
        filterName = toLoadAssets[i];
      }

      if (allAssets.image[filterName] !== undefined) {
        var assetString = '{"' + filterName + '": "' + allAssets.image[filterName] + '"}';

        // console.log(assetString);
        this.toLoadJson.image[filterName] = allAssets.image[filterName] //JSON.parse(assetString);

        //console.log(filterName + " " + allAssets.image[filterName]);
      }

    }


    //  console.log(this.game.cache.getJSON("assets"));
    //new AssetLoader(this.game, this.game.cache.getJSON("toLoadJson"));
    this.startMap(json);
  }

  getUniqueStuff(allStuff) {
    return [...new Set(allStuff.map(stuff => stuff.def))];
  }

  getPosition(raw) {
    //Remove the () + comma seperate the x y z
    let formattedSize = raw.replace(/[(-)]/g, '');
    //Split out into an array
    formattedSize = formattedSize.split(",");
    //Loop through the array to make it all ints
    for (let i = 0; i < formattedSize.length; i++) {
      formattedSize[i] = parseInt(formattedSize[i]);
    }
    return formattedSize;
  }

  showHD(){
    this.game.hd = true;
  }
  hideHD(){
    this.game.hd = false;
  }
  startMap(json) {
    this.game.state.start('PreloadAssets', true, false, this.toLoadJson, json);

  }

}
export default DynamicLoad;
