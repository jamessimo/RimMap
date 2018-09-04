//import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

  preload() {

    this.game.load.image('tiles', 'assets/tilemap16.png');
    this.game.load.image('tile', 'assets/tile.png');

    this.game.load.image('PlantGrass', 'assets/GrassA.png');
    this.game.load.image('PlantTallGrass', 'assets/GrassA.png');
    this.game.load.image('PlantShrubLow', 'assets/ShrubLowA.png');
    this.game.load.image('PlantBush', 'assets/Bush.png');


    this.game.load.image('PlantTreeCecropia', 'assets/TreeCecropiaA.png');
    this.game.load.image('PlantTreeTeak', 'assets/TreeTeakA.png');
    this.game.load.image('PlantTreeBirch', 'assets/TreeBirchA.png');

    this.game.load.image('PlantTreePoplar', 'assets/TreePoplarA.png');
    this.game.load.image('PlantTreeOak', 'assets/TreeOakA.png');

    this.game.load.image('PlantTreePalm', 'assets/TreePalmA.png');
    this.game.load.image('PlantTreeBamboo', 'assets/TreeBambooA.png');
    this.game.load.image('PlantRice', 'assets/RicePlantA.png');
    this.game.load.image('PlantPotato', 'assets/PotatoPlant.png');
    this.game.load.image('PlantStrawberry', 'assets/StrawberryPlant_2.png');
    this.game.load.image('PlantCorn', 'assets/CornPlantA_2.png');
    this.game.load.image('PlantDaylily', 'assets/Daylily.png');

    this.game.load.image('PlantHaygrass', 'assets/HaygrassA.png');
    this.game.load.image('PlantHealroot', 'assets/Healroot.png');
    this.game.load.image('PlantHops', 'assets/HopsPlantA.png');
    this.game.load.image('PlantWildHealroot', 'assets/Healroot.png');
    this.game.load.image('PlantDandelion', 'assets/Dandelion.png');
    this.game.load.image('PlantRaspberry', 'assets/RaspberryBushA_2.png');
    this.game.load.image('PlantBrambles', 'assets/BramblesA.png');

    this.game.load.image('PlantAlocasia', 'assets/AlocasiaA.png');

    this.game.load.image('PlantClivia', 'assets/CliviaA.png');

    this.game.load.image('RawBerries', 'assets/Berries.png');

    this.game.load.image('RawPotatoes', 'assets/Potatoes.png');
    this.game.load.image('Pemmican', 'assets/Pemmican.png');

    this.game.load.image('Granite', 'assets/RockLowA.png');
    this.game.load.image('Sandstone', 'assets/RockLowA.png');
    this.game.load.image('Marble', 'assets/RockLowA.png');
    this.game.load.image('Limestone', 'assets/RockLowA.png');
    this.game.load.image('Slate', 'assets/RockLowA.png');

    this.game.load.image('RockRubble', 'assets/RubbleA.png');
    this.game.load.image('BuildingRubble', 'assets/RubbleA.png');
    this.game.load.image('Wall', 'assets/Wall.png');
    this.game.load.image('Door', 'assets/Door.png');
    this.game.load.image('Cooler', 'assets/Cooler.png');
    this.game.load.image('Vent', 'assets/Vent.png');

    this.game.load.image('SolarGenerator', 'assets/SolarCollector.png');
    this.game.load.image('WindTurbine', 'assets/WindTurbineBody.png');
    this.game.load.script('pako', 'assets/pako.min.js');

    this.game.time.advancedTiming = true;
    this.game.antialias = false;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

  }

  create() {
    //this.origin = this.game.add.sprite(100, 100 ,"tile");


    let worldScale = 0;
    this.center = {
      x: this.game.world.centerX,
      y: this.game.world.centerY
    }
    //let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
    //text.anchor.set(0.5);
    this.worldSize = {
      x: 0,
      y: 0,
      z: 0
    };
    this.cursors = null;

    this.TILESIZE = 64;

    this.mapInfo = {
      "height": 0,
      "width": 0,
      "topTerrainGrid": [],
      "underTerrainGrid": [],
      "roofGrid": []
    };
    this.topTerrainGridLayer =
      this.underTerrainGridLayer =
      this.roofGridLayer = null;

    this.mainLayer = null;

    this.currentBounds = null;
    this.zoompoint = {
      x: 0,
      y: 0
    };
    this.marker = null;


    this.zoomLevel = 0.20;
    //this.game.input.mouse.mouseWheelCallback = scroll();



  }

  update() {
    //http://jsfiddle.net/valueerror/pdx0px0w/

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

      if (this.plusKey.isDown && this.zoomLevel <= 2) {
        this.zoomLevel += 0.1;
        this.mainLayer.scale.set(this.zoomLevel, this.zoomLevel);
      }
      if (this.minusKey.isDown && this.zoomLevel >= 0.2) {
        this.zoomLevel -= 0.1;
        this.mainLayer.scale.set(this.zoomLevel, this.zoomLevel);
      }
    }

  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");

  }
  loadWorld(json) {

    console.log('File In Phaser');


    //CLEAR ANY EXUSUTUNG MAPS
    if(this.mainLayer !== null){
      this.mainLayer.destroy(true,false);
    }


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

    console.log(this.mapInfo.resourceTerrainGrid);


    this.allThings = json.savegame.game.maps.li.things.thing;

    this.mainLayer = this.game.add.group();

    //RENDER TILEMAP
    this.renderTileMap();
    this.renderStuff();

    this.mainLayer.pivot.x = (this.TILESIZE * this.worldSize.x) / 2;
    this.mainLayer.pivot.y = (this.TILESIZE * this.worldSize.y) / 2;
    this.mainLayer.position.x = this.game.world.centerX;
    this.mainLayer.position.y = this.game.world.centerY;
    this.mainLayer.angle = -90;
    this.mainLayer.scale.set(this.zoomLevel, this.zoomLevel);



/*
    //  This is the BitmapData we're going to be drawing to

       var bmd = this.game.add.bitmapData(this.mapInfo.width, this.mapInfo.height);
      var bmdContainer = bmd.addToWorld(0, 0, 0, 0, 1, 1);
       this.game.stage.updateTransform();
       //  Draw the group to the BitmapData
       bmd.drawGroup(this.mainLayer);

       this.mainLayer.destroy(true,false);

*/

    this.game.world.setBounds(-this.mapInfo.width / 2, -this.mapInfo.height / 2, this.mapInfo.width * 2, this.mapInfo.height * 2);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.plusKey = this.game.input.keyboard.addKey(Phaser.Keyboard.EQUALS);
    this.minusKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE);

  };
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

  renderTileMap() {

    this.game.stage.backgroundColor = '#2d2d2d';

    this.topTerrainGridLayer = this.game.add.group();
    this.roofGridLayer = this.game.add.group();
    this.resourceGridLayer = this.game.add.group();


    let masterIndex = 0;

    let tile = null;
    if (1 == 1) {
      for (var r = 0; r < this.worldSize.x; r++) {
        let tileRow = [];
        let rowIndex = 0;
        for (var c = 0; c < this.worldSize.y; c++) {

          rowIndex = this.worldSize.x - r;
          tile = this.game.add.sprite(r * this.TILESIZE, c * this.TILESIZE, "tile"); // flip to fix

          //tile.height = this.TILESIZE;
          //tile.width = this.TILESIZE;

          //TINT THE TERRAIN TILE
          switch (this.mapInfo.topTerrainGrid[masterIndex]) {
            case 2: //Concrete
              tile.tint = 0xcccccc;
              break;
            case 235: //Paved
              tile.tint = 0xB6B6B6;
              break;
            case 70: //Wood
              tile.tint = 0xE78F49;
              break;
            case 246: //metal //IF UNDER
              tile.tint = 0x999999;
              break;
            case 37: //silver
              tile.tint = 0xffffff;
              break;
            case 199: //gold  //IF UNDER
              tile.tint = 0xE4FF00;
              break;
            case 101: //sterile
              tile.tint = 0xffffff;
              break;
            case 174: //red
              tile.tint = 0xFF0000;
              break;
            case 232: //green
              tile.tint = 0xFFFF00;
              break;
            case 202: //blue
              tile.tint = 0x0000ff;
              break;
            case 46: //cream
              tile.tint = 0xffffcc;
              break;
            case 231: //dark
              tile.tint = 0x555555;
              break;
            case 41: //burned wood
              tile.tint = 0x553E00;
              break;
            case 171: //burned carpet
              tile.tint = 0x222222;
              break;
            case 88: //sandstone tile
              tile.tint = 0x6F6C64;
              break;
            case 224: //granite tile
              tile.tint = 0x666666;
              break;
            case 160: //limestone tile
              tile.tint = 0xA7AD89;
              break;
            case 219: //slate tile
              tile.tint = 0x444444;
              break;
            case 126: //marbel tile
              tile.tint = 0x666666;
              break;
            case 173: //sandstone flag
              tile.tint = 0x6F6C64;
              break;
            case 169: //granite flag
              tile.tint = 0x666666;
              break;
            case 245: //limestone flag
              tile.tint = 0x786800;
              break;
            case 1: //marble flagstone
              tile.tint = 0xf5f5f5;
              break;
            case 166: //sand
              tile.tint = 0xFCDC85;
              break;
            case 161: //soil
              tile.tint = 0x7A4307;
              break;
            case 239: //marshy soil
              tile.tint = 0x694C2E;
              break;
            case 115: // rich soil
              tile.tint = 0x52310E;
              break;
            case 48: //mud
              tile.tint = 0x3D1F00;
              break;
            case 6: //marsh
              tile.tint = 0x2F3D00;
              break;
            case 73: //gravel
              tile.tint = 0x8B5100;
              break;
            case 158: //lichen covered
              tile.tint = 0x394707;
              break;
            case 255: //ice
              tile.tint = 0xffffff;
              break;
            case 205: //broken asphalt
              tile.tint = 0x333333;
              break;
            case 78: // packed dirt
              tile.tint = 0x693E00;
              break;
            case 37: //underwall
              tile.tint = 0x000000;
              break;
            case 140: //deep water
              tile.tint = 0x6892C3;
              break;
            case 58: //moving deep water
              tile.tint = 0x6892C3;
              break;
            case 181: //shallow water
              tile.tint = 0x8FC8D9;
              break;
            case 137: //shallow ocean
              tile.tint = 0x8FC8D9;
              break;
            case 212: //shallow moving water
              tile.tint = 0x8FC8D9;
              break;
            case 56: //rough sandstone
              tile.tint = 0x6F6C64;
              break;
            case 246: // rough hewn sandstone
              tile.tint = 0x6F6C64;
              break;
            case 154: //smooth sandstone
              tile.tint = 0x6F6C64;
              break;
            case 222: // rough granite
              tile.tint = 0x797979;
              break;
            case 116: // rough hewn granite
              tile.tint = 0x787878;
              break;
            case 199: //smooth granite
              tile.tint = 0x777777;
              break;
            case 99: //rough limestone
              tile.tint = 0x94997A;
              break;
            case 82: // rought hewn limestone
              tile.tint = 0x888D70;
              break;
            case 238: //smooth limestone
              tile.tint = 0xA7AD89;
              break;
            case 148: //rough slate
              tile.tint = 0x444444;
              break;
            case 101: //rough hewn slate
              tile.tint = 0x444444;
              break;
            case 184: //smooth slate
              tile.tint = 0x444444;
              break;
            case 57: //rough marble
              tile.tint = 0xf5f5f5;
              break;
            case 135: //rough hewn marble
              tile.tint = 0xf5f5f5;
              break;
              case 208: //smooth marble
                tile.tint = 0xf5f5f5;
                break;


            default:
              tile.alpha = 0;
          }

          tile.data = {
            'tileName': this.mapInfo.topTerrainGrid[masterIndex]
          };

          masterIndex++;


          tile.inputEnabled = true;
          tile.events.onInputDown.add(this.tileCallback, this.mapInfo.topTerrainGrid[masterIndex]);
          this.topTerrainGridLayer.add(tile);
        }
      }

      this.mainLayer.add(this.topTerrainGridLayer);

    }
    if (1 == 2) {
      masterIndex = 0;

      for (var r = 0; r < this.worldSize.x; r++) {
        let tileRow = [];
        let rowIndex = 0;
        for (var c = 0; c < this.worldSize.y; c++) {

          rowIndex = this.worldSize.x - r;
          tile = this.game.add.sprite(r * this.TILESIZE, c * this.TILESIZE, "tile"); // flip to fix

          //tile.height = this.TILESIZE;
          //tile.width = this.TILESIZE;


          //TINT THE ROOF TILE
          switch (this.mapInfo.roofTerrainGrid[masterIndex]) {

            //ROOF TILES
            case 68: //Mountain
              tile.tint = 0x222222;
              tile.alpha = 0.2;
              break;
            case 43: // Mountain cliff
              tile.tint = 0x222222;
              tile.alpha = 0.2;
              break;
            case 13: //House
              tile.tint = 0x000000;
              tile.alpha = 0;
              break;

            default: //dont render
              tile.alpha = 0;
          }

          tile.data = {
            'tileName': this.mapInfo.roofTerrainGrid[masterIndex]
          };

          masterIndex++;


          //tile.inputEnabled = true;
          //tile.events.onInputDown.add(this.tileCallback, this.mapInfo.roofTerrainGrid[masterIndex]);
          this.roofGridLayer.add(tile);
        }
      }

      this.mainLayer.add(this.roofGridLayer);
    }

    masterIndex = 0;

    for (var r = 0; r < this.worldSize.x; r++) {
      let tileRow = [];
      let rowIndex = 0;
      for (var c = 0; c < this.worldSize.y; c++) {

        rowIndex = this.worldSize.x - r;

        switch (this.mapInfo.resourceTerrainGrid[masterIndex]) {
          case 0:
            break;
          default:
            tile = this.game.add.sprite(r * this.TILESIZE, c * this.TILESIZE, "tile"); // flip to fix
            tile.tint = 0x000000;
            tile.alpha = 0.3;
            tile.data = {
              'tileName': this.mapInfo.resourceTerrainGrid[masterIndex]
            };
            tile.inputEnabled = false;
            tile.events.onInputDown.add(this.tileCallback, this.mapInfo.resourceTerrainGrid[masterIndex]);
        }

        masterIndex++;
        this.resourceGridLayer.add(tile);

      }
    }
    this.mainLayer.add(this.resourceGridLayer);

    //this.currentBounds = new Phaser.Rectangle(-this.mapInfo.width, -this.mapInfo.height, this.mapInfo.width * 2, this.mapInfo.height * 2);
    //this.game.camera.bounds = this.currentBounds;


    //this.game.camera.focusOnXY(this.mapInfo.width/2, this.mapInfo.height/2);

/*
    this.marker = this.game.add.graphics();
    this.marker.lineStyle(2, 0xFF1111, 1);
    this.marker.drawRect(this.center.x, this.center.y, this.TILESIZE, this.TILESIZE);
    //this.marker.scale.setTo(this.zoomLevel);
      this.game.input.mouse.onMouseMove = (evt) => {
    };
    */
  }

  renderStuff() {


    let thingSprite = null;
    this.stuffGridLayer = this.game.add.group();

    for (let i = 0; i < this.allThings.length; i++) {

      let thingPos = this.getPosition(this.allThings[i].pos);

      thingSprite = this.game.add.sprite(
        thingPos[2] * this.TILESIZE,
        thingPos[0] * this.TILESIZE,
        this.allThings[i].def
      );

      //TINT THE THING IF IT HAS STUFF
      switch (this.allThings[i].stuff) {
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
          thingSprite.tint = 0xf7f7f7;
          break;
        case "WoodLog":
          thingSprite.tint = 0xBF6C2A;
          break;
        default:
          thingSprite.tint = 0xffffff;
      }

      thingSprite.inputEnabled = true;

      thingSprite.data = {
        'def': this.allThings[i].def,
        'stuff': this.allThings[i].stuff
      }

      thingSprite.events.onInputDown.add(this.thingCallback, thingSprite);
      thingSprite.anchor.setTo(0, 1);

      //If large thing (solor panels) NEED TO INVESTIGATE
      if(thingSprite.width > 64){
        thingSprite.anchor.setTo(0.25, 0.75);
      }

      thingSprite.angle = 90;

      this.stuffGridLayer.add(thingSprite);

    }
    this.mainLayer.add(this.stuffGridLayer);
  }

  delaceArray(iArray) {
    let masterIndex = 0;
    let outputArray = [];
    //Delace array
    for (var r = this.worldSize.x; r > 0; r--) {
      var row = [];
      for (var c = this.worldSize.y * 2; c > 0; c--) {
        if (c % 2 === 0) { //Have to skip every other byte due to weird decompression error
          outputArray.push(iArray[masterIndex]);

          //console.log(iArray[masterIndex].toString(16));
          //  var bin = String.fromCharCode(iArray[masterIndex],iArray[masterIndex+1]);

          //  var out = bin.toString(2);
          //  console.log(out);
          //console.log(String.fromCharCode(iArray[masterIndex],iArray[masterIndex+1])); //Need to use this to gett accurate tile data
        }
        masterIndex++;
      }
    }
    return outputArray;
  }
  tileCallback(tile) {
    console.log(tile.data);
  }

  thingCallback(stuff) {
    console.log(stuff.data);
  }

  getPosition(raw) {
    //Remove the () + comma seperate the x y z
    let formattedSize = raw.replace(/[(-)]/g, '');
    formattedSize = formattedSize.split(",");
    return formattedSize;
  }

}


export default GameState;
