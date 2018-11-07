import Utils from 'utils/Utils';

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
    this.game.hd = false;
    this.utils = new Utils(this.game);
  }

  loadWorld(json) {
    //SETUP LOADING
    let rawSizes = null;

    //IF MANY MAPS
    if (json.savegame.game.maps.li.length) {
      json.savegame.game.maps.li = json.savegame.game.maps.li[0];
    }

    rawSizes = json.savegame.game.maps.li.mapInfo.size;

    let sizes = this.utils.getPosition(rawSizes);
    
    this.worldSize.x = sizes[0];
    this.worldSize.y = sizes[2];
    this.worldSize.z = sizes[1];

    const toLoadAssets = this.getUniqueStuff(json.savegame.game.maps.li.things.thing);

    let allAssets = this.game.cache.getJSON("vanillaAssets"); //Add more

    for (let i = 0; i < toLoadAssets.length; i++) {

      let filterName = this.utils.getStuffName(toLoadAssets[i]);

      //Loop through all the unique assets and add to array
      if (allAssets.image[filterName] !== undefined) {
        this.toLoadJson.image[filterName] = allAssets.path + allAssets.image[filterName];
      }
    }
    this.startMap(json);
  }

  getUniqueStuff(allStuff) {
    return [...new Set(allStuff.map(stuff => stuff.def))];
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
