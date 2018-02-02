import GameUI from 'objects/GameUI';

class GameState extends Phaser.State {

  create() {
    this.fastRender = true;

    this.center = {
      x: this.game.world.centerX,
      y: this.game.world.centerY
    }

    this.worldSize = {
      x: 0,
      y: 0,
      z: 0
    };

    this.TILESIZE = 64;

    this.mapInfo = { //RAW MAP DATA (arrays)
      "height": 0,
      "width": 0,
      "topTerrainGrid": [],
      "underTerrainGrid": [],
      "resourceGrid": [],
      "roofGrid": [],
      "stuffGrid": []
    };

    this.cursors =
      this.topTerrainGridLayer = //TILEMAPS/BITMAP IMAGES
      this.underTerrainGridLayer =
      this.resourceGridLayer =
      this.stuffLayer =
      this.roofGridLayer =
      this.currentBounds =
      this.marker = null;
    this.zoomLevel = 1;

    this.game.forceSingleUpdate = false;

  }

  update() {
    //http://jsfiddle.net/valueerror/pdx0px0w/
    if (this.marker && this.topTerrainGridLayer) { ///4
      this.marker.x = this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) * this.TILESIZE / this.zoomLevel;
      this.marker.y = this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) * this.TILESIZE / this.zoomLevel;
    }
    //ZOOM
    if (this.cursors !== null) {
      if (this.cursors.up.isDown) {
        this.game.camera.y -= this.TILESIZE;
      } else if (this.cursors.down.isDown) {
        this.game.camera.y += this.TILESIZE;
      }
      if (this.cursors.left.isDown) {
        this.game.camera.x -= this.TILESIZE;
      } else if (this.cursors.right.isDown) {
        this.game.camera.x += this.TILESIZE;
      }
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  }

  loadWorld(json) {
    console.log('File In Phaser');
    //FETCH META DATA
    let rawSizes = json.savegame.game.maps.li.mapInfo.size;
    let sizes = this.getPosition(rawSizes);

    this.worldSize.x = sizes[0];
    this.worldSize.y = sizes[2];
    this.worldSize.z = sizes[1];

    this.mapInfo.width = this.TILESIZE * this.worldSize.x;
    this.mapInfo.height = this.TILESIZE * this.worldSize.y;
    this.mapInfo.topTerrainGrid = this.decompress(json.savegame.game.maps.li.terrainGrid.topGridDeflate);
    this.mapInfo.underTerrainGrid = this.decompress(json.savegame.game.maps.li.terrainGrid.underGridDeflate);
    //this.mapInfo.roofTerrainGrid = this.decompress(json.savegame.game.maps.li.roofGrid);
    this.mapInfo.resourceTerrainGrid = this.decompress(json.savegame.game.maps.li.compressedThingMapDeflate);

    this.mapInfo.topTerrainGrid = this.mapTextures(this.mapInfo.topTerrainGrid, "terrain");
    this.mapInfo.resourceTerrainGrid = this.mapTextures(this.mapInfo.resourceTerrainGrid, "resource");

    this.mapInfo.stuffGrid = json.savegame.game.maps.li.things.thing;

    //RENDER TILEMAP

    this.game.stage.backgroundColor = '#576B76';

    //this.renderTileMap();
    this.renderTerrainTileMap();

    this.renderResourceTileMap();

    this.renderStuff();

    this.markerInit();

    this.renderBitmap();


    this.game.world.setBounds(-this.mapInfo.width / 2, -this.mapInfo.height / 2, this.mapInfo.width * 2, this.mapInfo.height * 2);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.plusKey = this.game.input.keyboard.addKey(Phaser.Keyboard.EQUALS).onDown.add(function() {
      if (this.zoomLevel > 1) {
        this.zoomLevel -= 1;
        this.stuffLayer.scale.set(1 / this.zoomLevel)
        this.topTerrainGridLayer.setScale(1 / this.zoomLevel, 1 / this.zoomLevel);
        this.marker.scale.setTo(1 / this.zoomLevel)
        this.topTerrainGridLayer.resize(this.game.width * this.zoomLevel, this.game.height * this.zoomLevel);
        this.topTerrainGridLayer.resizeWorld();

        this.resourceGridLayer.setScale(1 / this.zoomLevel, 1 / this.zoomLevel);
        this.resourceGridLayer.resize(this.game.width * this.zoomLevel, this.game.height * this.zoomLevel);
        this.resourceGridLayer.resizeWorld();
      }


    }, this);
    this.minusKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE).onDown.add(function() {
      if (this.zoomLevel < 6) {

        this.zoomLevel += 1;
        this.stuffLayer.scale.set(1 / this.zoomLevel)
        this.marker.scale.setTo(1 / this.zoomLevel)
        this.topTerrainGridLayer.setScale(1 / this.zoomLevel, 1 / this.zoomLevel);
        this.topTerrainGridLayer.resize(this.game.width * this.zoomLevel, this.game.height * this.zoomLevel);
        this.topTerrainGridLayer.resizeWorld();

        this.resourceGridLayer.setScale(1 / this.zoomLevel, 1 / this.zoomLevel);
        this.resourceGridLayer.resize(this.game.width * this.zoomLevel, this.game.height * this.zoomLevel);
        this.resourceGridLayer.resizeWorld();


      }
    }, this);
    this.game.input.onDown.add(this.getTileProperties, this);
  };

  renderBitmap() {
    console.log('rendering...');
    this.stuffGridLayer.pivot.x = 0;
    this.stuffGridLayer.pivot.y = 0;
    this.stuffGridLayer.position.x = 0;
    this.stuffGridLayer.position.y = this.mapInfo.height;

    //This is the BitmapData we're going to be drawing to
    var bmd = this.game.add.bitmapData(this.mapInfo.width, this.mapInfo.height);
    this.stuffLayer = bmd.addToWorld(0, 0, 0, 0, 1, 1);
    this.game.stage.updateTransform();
    //  Draw the group to the BitmapData
    bmd.drawGroup(this.stuffGridLayer);
    console.log('Rendered.');
    //bmd.drawFull(this.game.world);
    this.stuffGridLayer.destroy(true, false);
  }

  renderTerrainTileMap() {
    let masterIndex = 0;
    let data = '';
    let dataArray = [];
    dataArray = this.formatArray(this.mapInfo.topTerrainGrid);

    for (let y = 0; y < this.worldSize.y; y++) {
      for (let x = 0; x < this.worldSize.x; x++) {
        //this.game.rnd.between(0, 64).toString();
        if (dataArray[y][x] == undefined) {
          console.log('PANIC @ ' + ' ' + y + ' ' + x);
        }
        if (dataArray[y][x] != undefined) {
          data += dataArray[y][x];
        }
        if (x < (this.worldSize.x) - 1) {
          data += ',';
        }
      }
      if (y < this.worldSize.y - 1) {
        data += "\n";
      }
    }

    //  Add data to the cache
    this.game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);

    //  Create our map (the 64x64 is the tile size) //SIZE
    let tileMap = this.game.add.tilemap('dynamicMap', this.TILESIZE, this.TILESIZE);

    //  'tiles' = cache image key, 64x64 = tile size
    tileMap.addTilesetImage('tiles', 'tiles', this.TILESIZE, this.TILESIZE);

    //  0 is important
    this.topTerrainGridLayer = tileMap.createLayer(0);

    this.topTerrainGridLayer.resizeWorld();

  }

  renderResourceTileMap() {

    let masterIndex = 0;
    let data = '';

    let dataArray = [];
    dataArray = this.formatArray(this.mapInfo.resourceTerrainGrid);

    for (let y = 0; y < this.worldSize.y; y++) {
      for (let x = 0; x < this.worldSize.x; x++) {
        //this.game.rnd.between(0, 64).toString();
        if (dataArray[y][x] == undefined) {
          console.log('PANIC @ ' + ' ' + y + ' ' + x);
        }
        if (dataArray[y][x] != undefined) {
          data += dataArray[y][x];
        }
        if (x < (this.worldSize.x) - 1) {
          data += ',';
        }
      }
      if (y < this.worldSize.y - 1) {
        data += "\n";
      }
    }

    //  Add data to the cache
    this.game.cache.addTilemap('dynamicMap2', null, data, Phaser.Tilemap.CSV);

    //  Create our map (the 64x64 is the tile size) //SIZE
    let tileMap = this.game.add.tilemap('dynamicMap2', this.TILESIZE, this.TILESIZE);

    //  'tiles' = cache image key, 64x64 = tile size
    tileMap.addTilesetImage('testtiles', 'testtiles', this.TILESIZE, this.TILESIZE);

    //  0 is important
    this.resourceGridLayer = tileMap.createLayer(0);

    this.resourceGridLayer.resizeWorld();
  }

  renderMineralTileMap(){

  }

  renderStuff() {

    this.stuffGridLayer = this.game.add.group();
    let thingSprite = null;

    for (let i = this.mapInfo.stuffGrid.length - 1; i > 0; i--) {
      let thingPos = this.getPosition(this.mapInfo.stuffGrid[i].pos);
      //this.mapInfo.stuffGrid[thingPos[0]][thingPos[2]] = this.mapInfo.stuffGrid[i];
    }

    for (let i = this.mapInfo.stuffGrid.length - 1; i > 0; i--) {
      let thingPos = this.getPosition(this.mapInfo.stuffGrid[i].pos);

      thingSprite = this.game.add.sprite(
        (thingPos[0] * this.TILESIZE), -(thingPos[2] * this.TILESIZE),
        this.mapInfo.stuffGrid[i].def
      );
      //IF Plant, bring to frint
      //TINT THE THING IF IT HAS STUFF
      switch (this.mapInfo.stuffGrid[i].stuff) {
        case "BlocksSandstone":
          thingSprite.tint = 0x8D897B;
          break;
        case "BlocksGranite":
          thingSprite.tint = 0x4A4A4A;
          break;
        case "BlocksSlate":
          thingSprite.tint = 0x333333;
          break;
        case "BlocksLimestone":
          thingSprite.tint = 0xA7AD89;
          break;
        case "BlocksMarble":
          thingSprite.tint = 0xe9e9e9;
          break;
        case "WoodLog":
          thingSprite.tint = 0xBF6C2A;
          break;
        default:
          thingSprite.tint = 0xffffff;
      }

      switch (this.mapInfo.stuffGrid[i].def) {
        case "Sandstone":
        case "ChunkSandstone":
          thingSprite.tint = 0x8D897B;
          break;
        case "Granite":
        case "ChunkGranite":
          thingSprite.tint = 0x4A4A4A;
          break;
        case "Slate":
        case "ChunkSlate":
          thingSprite.tint = 0x333333;
          break;
        case "Limestone":
        case "ChunkLimestone":
          thingSprite.tint = 0xA7AD89;
          break;
        case "Marble":
        case "ChunkMarble":
          thingSprite.tint = 0xe9e9e9;
          break;
      }

      thingSprite.data = {
        'def': this.mapInfo.stuffGrid[i].def,
        'stuff': this.mapInfo.stuffGrid[i].stuff,
        'growth': this.mapInfo.stuffGrid[i].growth,
        'health': this.mapInfo.stuffGrid[i].health,
        'quality': this.mapInfo.stuffGrid[i].quality
      }

      thingSprite.anchor.setTo(0, 1);

      //If large thing (solor panels) NEED TO INVESTIGATE
      if (thingSprite.width > this.TILESIZE && 1 == 2) {
        thingSprite.anchor.setTo(0.25, 0.75);
      }

      if (this.mapInfo.stuffGrid[i].growth) {

        thingSprite.scale.setTo(this.mapInfo.stuffGrid[i].growth);
        if (this.mapInfo.stuffGrid[i].growth <= 0.1) {
          thingSprite.destroy();
        }
      }
      this.stuffGridLayer.add(thingSprite);
    }
  }

  destoryStuff() {
    this.stuffLayer.destroy();
  }

  delaceArray(iArray) {
    let masterIndex = 0;
    let outputArray = [];

    //Delace array
    for (var r = this.worldSize.x; r > 0; r--) {
      for (var c = this.worldSize.y * 2; c > 0; c--) {
        if (c % 2 === 0) { //Have to skip every other byte due to weird decompression error
          // outputArray.push(iArray[masterIndex] ^ iArray[masterIndex + 1]);
          outputArray.push(iArray[masterIndex]);
        }
        masterIndex++;
      }
    }
    return outputArray;
  }

  //Make array 2D
  formatArray(iArray) {
    let masterIndex = 0;
    let outputArray = [];
    let row = [];
    for (let y = 0; y < this.worldSize.y; y++) {
      row = [];
      for (let x = 0; x < this.worldSize.x; x++) {
        row.push(iArray[masterIndex]);
        masterIndex++;
      }
      outputArray.push(row);
    }
    outputArray = outputArray.reverse()
    return outputArray;
  }

  //maps raw rimworld IDs to Tilemap IDs
  mapTextures(iArray, param) {


    if (param == "terrain") {
      //Fix For tiles Metal, Silver, Gold and Sterile tiles
      for (let j = 0; j < iArray.length; j++) {
        if (iArray[j] == 101 || iArray[j] == 246 || iArray[j] == 37 || iArray[j] == 199) {
          if (this.mapInfo.underTerrainGrid[j] != 0) {
            //Just shift the ID up one since we only care about tiles under dirt
            iArray[j] += 1;
          }
        }
      }

      for (let i = 0; i < iArray.length; i++) {
        //TINT THE TERRAIN TILE
        switch (iArray[i]) {
          case 2: //Concrete
            iArray[i] = 1;
            break;
          case 235: //Paved
            iArray[i] = 2;
            break;
          case 70: //Wood
            iArray[i] = 3;
            break;
          case 247: //metal //IF UNDER
            iArray[i] = 4;
            break;
          case 38: //silver //IF UNDER
            iArray[i] = 5;
            break;
          case 200: //gold  //IF UNDER
            iArray[i] = 6;
            break;
          case 102: //sterile //If under
            iArray[i] = 7;
            break;
          case 174: //red
            iArray[i] = 8;
            break;
          case 232: //green
            iArray[i] = 9;
            break;
          case 202: //blue
            iArray[i] = 10;
            break;
          case 46: //cream
            iArray[i] = 11;
            break;
          case 231: //dark
            iArray[i] = 12;
            break;
          case 41: //burned wood
            iArray[i] = 13;
            break;
          case 171: //burned carpet
            iArray[i] = 14;
            break;
          case 88: //sandstone tile
            iArray[i] = 15;
            break;
          case 224: //granite tile
            iArray[i] = 16;
            break;
          case 160: //limestone tile
            iArray[i] = 17;
            break;
          case 219: //slate tile
            iArray[i] = 18;
            break;
          case 126: //Marble tile
            iArray[i] = 19;
            break;
          case 173: //slate flag
            iArray[i] = 20;
            break;
          case 169: //sandstone flag
            iArray[i] = 21;
            break;
          case 245: //granite flag
            iArray[i] = 22;
            break;
          case 59: //limestone flag
            iArray[i] = 23;
            break;
          case 1: //marble flagstone
            iArray[i] = 24;
            break;
          case 166: //sand
            iArray[i] = 25;
            break;
          case 161: //soil
            iArray[i] = 26;
            break;
          case 239: //marshy soil
            iArray[i] = 27;
            break;
          case 115: // rich soil
            iArray[i] = 28;
            break;
          case 48: //mud
            iArray[i] = 29;
            break;
          case 6: //marsh
            iArray[i] = 30;
            break;
          case 73: //gravel
            iArray[i] = 31;
            break;
          case 158: //lichen covered
            iArray[i] = 32;
            break;
          case 255: //ice
            iArray[i] = 33;
            break;
          case 205: //broken asphalt
            iArray[i] = 34;
            break;
          case 78: // packed dirt
            iArray[i] = 35;
            break;
          case 37: //underwall
            iArray[i] = 36;
            break;
          case 140: //deep water
            iArray[i] = 37;
            break;
          case 58: //moving deep water
            iArray[i] = 38;
            break;
          case 181: //shallow water
            iArray[i] = 39;
            break;
          case 137: //shallow ocean
            iArray[i] = 40;
            break;
          case 212: //shallow moving water
            iArray[i] = 41;
            break;
          case 56: //rough sandstone
            iArray[i] = 42;
            break;
          case 246: // rough hewn sandstone
            iArray[i] = 43;
            break;
          case 154: //smooth sandstone
            iArray[i] = 44;
            break;
          case 222: // rough granite
            iArray[i] = 45;
            break;
          case 116: // rough hewn granite
            iArray[i] = 46;
            break;
          case 199: //smooth granite
            iArray[i] = 47;
            break;
          case 99: //rough limestone
            iArray[i] = 48;
            break;
          case 82: // rought hewn limestone
            iArray[i] = 49;
            break;
          case 238: //smooth limestone
            iArray[i] = 50;
            break;
          case 148: //rough slate
            iArray[i] = 50;
            break;
          case 101: //rough hewn slate
            iArray[i] = 51;
            break;
          case 184: //smooth slate
            iArray[i] = 52;
            break;
          case 57: //rough marble
            iArray[i] = 53;
            break;
          case 135: //rough hewn marble
            iArray[i] = 54;
            break;
          case 208: //smooth marble
            iArray[i] = 55;
            break;
          default:
            console.log(iArray[i]);
            iArray[i] = 1000;

        }
        iArray[i] = iArray[i] -= 1; //fix for index offset
      }
    } else if (param = "resource") {
      for (let i = 0; i < iArray.length; i++) {
        //console.log( iArray[])
      }
    }

    return iArray;
  }

  markerInit() {
    this.marker = this.game.add.graphics();
    this.marker.lineStyle(2, 0xFF4444, 1);
    this.marker.drawRect(0, 0, this.TILESIZE, this.TILESIZE);
  }

  getTileProperties() {

    let x = this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel); // 4 * ZOOM
    let y = this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel);

    let terrainTile = this.topTerrainGridLayer.map.getTile(x, y, this.topTerrainGridLayer);

    // Note: JSON.stringify will convert the object tile properties to a string
    x = this.resourceGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel); // 4 * ZOOM
    y = this.resourceGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel);


    let resourceTile = this.resourceGridLayer.map.getTile(x, y, this.resourceGridLayer);
    //console.log(resourceTile);

    //tile.alpha = 0.5;

    //tile.tint = 0xff0000;
    console.log(resourceTile.index);
  }

  tileCallback(tile) {
    console.log(tile.data);
  }

  thingCallback(stuff) {
    console.log(stuff.data);
  }
  decompress(rawGrid) {
    //TOPGRID
    //DECODE BASE 64 TO BINARY
    let binary = atob(rawGrid);
    let output = [];
    //INFLATE/DECOMPRESS TOPGRID
    try {
      output = pako.inflate(binary, {
        raw: true
      });
    } catch (err) {
      console.log(err);
    }
    return (this.delaceArray(output));
  }

  getPosition(raw) {
    //Remove the () + comma seperate the x y z
    let formattedSize = raw.replace(/[(-)]/g, '');
    formattedSize = formattedSize.split(",");
    return formattedSize;
  }
}
export default GameState;
