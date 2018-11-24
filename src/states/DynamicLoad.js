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

    let allAssets = null;
    let thingList = json.savegame.game.maps.li.things.thing;
    let furnitureList = [];
    //MAKE FURNITURE LIST
    for(let i = 0 ; i < json.savegame.game.maps.li.things.thing.length ; i++){

      if(json.savegame.game.maps.li.things.thing[i].def == "MinifiedThing" ||
      json.savegame.game.maps.li.things.thing[i].def == "MinifiedFurniture" ||
      json.savegame.game.maps.li.things.thing[i].def == "MinifiedSculpture"){
      furnitureList.push(json.savegame.game.maps.li.things.thing[i].innerContainer.innerList.li);
      }
    }

    let totalAssets = thingList.concat(furnitureList);
    const toLoadAssets = this.getUniqueStuff(totalAssets);


    let vanillaAssets = this.game.cache.getJSON("vanillaAssets"); //Add more
    let modAssets = this.game.cache.getJSON("modAssets"); //Add more


    for (let i = 0; i < toLoadAssets.length; i++) {

      let filterName = this.utils.getStuffName(toLoadAssets[i]);
        //Loop through all the unique assets and add to array

        if (vanillaAssets.image[filterName] !== undefined) {
          this.toLoadJson.image[filterName] = vanillaAssets.path + vanillaAssets.image[filterName];
        } else if(modAssets.image[filterName] !== undefined){
          this.toLoadJson.image[filterName] = modAssets.path + modAssets.image[filterName];
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
