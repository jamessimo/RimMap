import GameUI from 'objects/GameUI';

class GameState extends Phaser.State {

  preload() {

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

    this.game.load.image('PlantTreePine', 'assets/TreePineA.png');
    this.game.load.image('PlantAstragalus', 'assets/AstragalusA.png');

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
    this.game.load.image('PlantMoss', 'assets/MossB.png');

    this.game.load.image('Granite', 'assets/tile.png');
    this.game.load.image('Sandstone', 'assets/tile.png');
    this.game.load.image('Marble', 'assets/tile.png');
    this.game.load.image('Limestone', 'assets/tile.png');
    this.game.load.image('Slate', 'assets/tile.png');

    this.game.load.image('RockRubble', 'assets/RubbleA.png');
    this.game.load.image('BuildingRubble', 'assets/RubbleA.png');
    this.game.load.image('Steel', 'assets/MetalA.png');


    this.game.load.image('ShipChunk', 'assets/ShipChunkA.png');
    this.game.load.image('Silver', 'assets/Silver.png');
    this.game.load.image('Component', 'assets/Component.png');
    this.game.load.image('Luciferium', 'assets/Component.png');

    this.game.load.image('MealSurvivalPack', "assets/SurvivalPack.png");
    this.game.load.image('WoodLog', "assets/WoodLog_b.png");


    this.game.load.image('ChunkGranite', 'assets/RockLowA.png');
    this.game.load.image('ChunkSandstone', 'assets/RockLowA.png');
    this.game.load.image('ChunkMarble', 'assets/RockLowA.png');
    this.game.load.image('ChunkLimestone', 'assets/RockLowA.png');
    this.game.load.image('ChunkSlate', 'assets/RockLowA.png');


    this.game.load.image('Wall', 'assets/Wall.png');
    this.game.load.image('Door', 'assets/Door.png');
    this.game.load.image('Cooler', 'assets/Cooler.png');
    this.game.load.image('Vent', 'assets/Vent.png');
    this.game.load.image('SolarGenerator', 'assets/SolarCollector.png');
    this.game.load.image('WindTurbine', 'assets/WindTurbineBody.png');

    this.game.load.image('HiTechResearchBench', 'assets/ResearchBenchHiTech_back.png');
    this.game.load.image('DrugLab', 'assets/TableDrugLab_back.png');
    this.game.load.image('ElectricStove', 'assets/TableStoveElectric_back.png');
    this.game.load.image('TableMachining', 'assets/TableMachining_back.png');
    this.game.load.image('ElectricSmelter', 'assets/ElectricSmelter_back.png');
    this.game.load.image('ElectricTailoringBench', 'assets/TableTailorHand_back.png');
    this.game.load.image('Brewery', 'assets/TableBrewery_back.png');
    this.game.load.image('TableSculpting', 'assets/TableSculpting_back.png');
    this.game.load.image('TableStonecutter', 'assets/TableStonecutter_back.png');
    this.game.load.image('TableButcher', 'assets/TableButcher_back.png');
    this.game.load.image('WoodFiredGenerator', 'assets/WoodFiredGenerator.png');
    this.game.load.image('DoubleBed', 'assets/DoubleBed_back.png');
    this.game.load.image('Table2x2c', 'assets/Table2x2_back.png');
    this.game.load.image('SteamGeyser', 'assets/SteamGeyser.png');
    this.game.load.image('Bedroll', 'assets/Bedroll.png');

    this.game.load.image('Grave', 'assets/GraveFull_back.png');
    this.game.load.image('Battery', 'assets/Battery_back.png');
    this.game.load.image('Bed', 'assets/Bed_back.png');
    this.game.load.image('Shelf', 'assets/Shelf_back.png');
    this.game.load.image('MarriageSpot', 'assets/tile.png');
    this.game.load.image('ToolCabinet', 'assets/ToolCabinet_back.png');
    this.game.load.image('SleepingSpot', 'assets/SleepSpot_back.png');
    this.game.load.image('AncientCryptosleepCasket', 'assets/ShipCryptosleepCasket_back.png');
    this.game.load.image('Heater', 'assets/Heater.png');
    this.game.load.image('PlantPot', 'assets/PlantPot.png');
    this.game.load.image('AnimalBed', 'assets/AnimalBed.png');
    this.game.load.image('StandingLamp', 'assets/LampStanding.png');
    this.game.load.image('DiningChair', 'assets/DiningChair_back.png');
    this.game.load.image('SculptureLarge', 'assets/SculptureSmallAbstractB.png');
    this.game.load.image('EndTable', 'assets/EndTable_front.png');


    this.game.load.script('pako', 'assets/pako.min.js');

    this.game.time.advancedTiming = true;
    this.game.antialias = false;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

  }

  create() {

    let worldScale = 0;
    this.center = {
      x: this.game.world.centerX,
      y: this.game.world.centerY
    }

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

    this.game.forceSingleUpdate = true;

    this.bmdContainer = null;
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
      if (this.plusKey.isDown && this.zoomLevel <= 1) {
        this.zoomLevel += 0.1;

        if (1 == 2) {
          this.bmdContainer.scale.set(this.zoomLevel, this.zoomLevel);

        }

        this.mainLayer.scale.set(this.zoomLevel, this.zoomLevel);


      }
      if (this.minusKey.isDown && this.zoomLevel >= 0.2) {
        this.zoomLevel -= 0.1;
        if (1 == 2) {
          this.bmdContainer.scale.set(this.zoomLevel, this.zoomLevel);

        }

        this.mainLayer.scale.set(this.zoomLevel, this.zoomLevel);
      }
      //console.log(this.game.camera.position);
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  }

  loadWorld(json) {

    console.log('File In Phaser');

    //CLEAR ANY EXUSUTUNG MAPS
    if (this.mainLayer !== null) {
      this.mainLayer.destroy(true, false);
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

    this.allThings = json.savegame.game.maps.li.things.thing;
    this.mainLayer = this.game.add.group();

    //RENDER TILEMAP
    this.renderTileMap();
    this.renderStuff();

    this.ui = new GameUI(this.game);

    //If picture
    this.mainLayer.pivot.x = (this.TILESIZE * this.worldSize.x) / 2;
    this.mainLayer.pivot.y = (this.TILESIZE * this.worldSize.y) / 2;
    this.mainLayer.position.x = 0;
    this.mainLayer.position.y = 0;
    this.mainLayer.angle = -90;
    this.mainLayer.scale.set(this.zoomLevel, this.zoomLevel);


    if (1 == 2) {
      //This is the BitmapData we're going to be drawing to
      var bmd = this.game.add.bitmapData((this.TILESIZE * this.worldSize.x), (this.TILESIZE * this.worldSize.y));
      this.bmdContainer = bmd.addToWorld(0, 0, 0, 0, 0.12, 0.12);
      this.game.stage.updateTransform();
      //  Draw the group to the BitmapData
      bmd.drawGroup(this.mainLayer);



      this.mainLayer.destroy(true, false);
    }


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


    this.game.stage.backgroundColor = '#000000';

    this.topTerrainGridLayer = this.game.add.group();
    this.roofGridLayer = this.game.add.group();
    this.resourceGridLayer = this.game.add.group();

    let masterIndex = 0;

    let tile = null;

    if (1 == 1) {
      for (var r = 0; r < this.worldSize.x; r++) {

        for (var c = 0; c < this.worldSize.y; c++) {
          //  tile = this.game.add.sprite(r * this.TILESIZE, c * this.TILESIZE, "tile"); // flip to fix


          tile = this.topTerrainGridLayer.create(r * this.TILESIZE, c * this.TILESIZE, "tile");

          //  tile.autoCull = true;
          //  tile.checkWorldBounds = true;


          if (this.mapInfo.resourceTerrainGrid[masterIndex] != 0) {
            //just to simulate darnkess for rocks and stuff. (need to add rocks)
            tile.alpha = 0.8;
            tile.data = {'rock':this.mapInfo.resourceTerrainGrid[masterIndex]};
          }


          //Fix For tiles Metal, Silver, Gold and Sterile tiles
          if (this.mapInfo.topTerrainGrid[masterIndex] == 101 || this.mapInfo.topTerrainGrid[masterIndex] == 246 || this.mapInfo.topTerrainGrid[masterIndex] == 37 || this.mapInfo.topTerrainGrid[masterIndex] == 199) {

            if (this.mapInfo.underTerrainGrid[masterIndex] != 0) {
              //Just shift the ID up one since we only care about tiles under dirt
              this.mapInfo.topTerrainGrid[masterIndex] += 1;
            }
          }

          //this.mapInfo.topTerrainGrid[masterIndex] = this.mapInfo.topTerrainGrid[masterIndex] + this.mapInfo.underTerrainGrid[masterIndex];
          //TINT THE TERRAIN TILE
          switch (this.mapInfo.topTerrainGrid[masterIndex]) {
            case 2: //Concrete
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],
                'tileName': "Concrete"
              };
              tile.tint = 0xcccccc;
              break;
            case 235: //Paved
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Paved"
              };
              tile.tint = 0xB6B6B6;
              break;
            case 70: //Wood
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Wood"
              };
              tile.tint = 0xE78F49;
              break;
            case 247: //metal //IF UNDER
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Metal"
              };
              tile.tint = 0x999999;
              break;
            case 38: //silver //IF UNDER
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Silver"
              };
              tile.tint = 0xffffff;
              break;
            case 200: //gold  //IF UNDER
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Gold"
              };
              tile.tint = 0xE4FF00;
              break;
            case 102: //sterile //If under
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Sterile"
              };
              tile.tint = 0xffffff;
              break;
            case 174: //red
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Red Carpet"
              };
              tile.tint = 0xFF0000;
              break;
            case 232: //green
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Green Carpet"
              };
              tile.tint = 0x00FF00;
              break;
            case 202: //blue
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Blue Carpet"
              };
              tile.tint = 0x0000ff;
              break;
            case 46: //cream
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Cream Carpet"
              };
              tile.tint = 0xffffcc;
              break;
            case 231: //dark
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Dark Carpet"
              };
              tile.tint = 0x555555;
              break;
            case 41: //burned wood
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Burned Wood"
              };
              tile.tint = 0x553E00;
              break;
            case 171: //burned carpet
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Burned Carpet"
              };
              tile.tint = 0x222222;
              break;
            case 88: //sandstone tile
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Sandstone Tile"
              };
              tile.tint = 0x6F6C64;
              break;
            case 224: //granite tile
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Granite Tile"
              };
              tile.tint = 0x666666;
              break;
            case 160: //limestone tile
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Limestone Tile"
              };
              tile.tint = 0xA7AD89;
              break;
            case 219: //slate tile
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Slate Tile"
              };
              tile.tint = 0x444444;
              break;
            case 126: //Marble tile
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Marble Tile"
              };
              tile.tint = 0xE9E9E9;
              break;
            case 173: //slate flag
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Slate Flagstone"
              };
              tile.tint = 0x444444;
              break;
            case 169: //sandstone flag
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Sandsotne Flagstone"
              };
              tile.tint = 0x6F6C64;
              break;
            case 245: //granite flag
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Granite Flagstone"
              };
              tile.tint = 0x666666;
              break;
            case 59: //limestone flag
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Limestone Flagstone"
              };
              tile.tint = 0x786800;
              break;
            case 1: //marble flagstone
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Marble Flagstone"
              };
              tile.tint = 0xE9E9E9;
              break;
            case 166: //sand
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Sand"
              };
              tile.tint = 0xFCDC85;
              break;
            case 161: //soil
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Soil"
              };
              tile.tint = 0x7A4307;
              break;
            case 239: //marshy soil
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Marshy Soil"
              };
              tile.tint = 0x694C2E;
              break;
            case 115: // rich soil
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rich Soil"
              };
              tile.tint = 0x52310E;
              break;
            case 48: //mud
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Mud"
              };
              tile.tint = 0x3D1F00;
              break;

            case 6: //marsh
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Marsh"
              };
              tile.tint = 0x2F3D00;
              break;
            case 73: //gravel
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Gravel"
              };
              tile.tint = 0x8B5100;
              break;
            case 158: //lichen covered
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Lichen Covered Soil"
              };
              tile.tint = 0x394707;
              break;
            case 255: //ice
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Ice"
              };
              tile.tint = 0xffffff;
              break;
            case 205: //broken asphalt
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Broken Asphalt"
              };
              tile.tint = 0x333333;
              break;
            case 78: // packed dirt
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Packed Dirt"
              };
              tile.tint = 0x693E00;
              break;
            case 37: //underwall
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Underwall"
              };
              tile.tint = 0x000000;
              break;
            case 140: //deep water
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Deep water"
              };
              tile.tint = 0x6892C3;
              break;
            case 58: //moving deep water
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Moving Deep Water"
              };
              tile.tint = 0x6892C3;
              break;
            case 181: //shallow water
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Shallow Water"
              };
              tile.tint = 0x8FC8D9;
              break;
            case 137: //shallow ocean
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Shallow Ocean"
              };
              tile.tint = 0x8FC8D9;
              break;
            case 212: //shallow moving water
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Shallow Moving Water"
              };
              tile.tint = 0x8FC8D9;
              break;
            case 56: //rough sandstone
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Sandstone"
              };
              tile.tint = 0x6F6C64;
              break;
            case 246: // rough hewn sandstone
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Hewn Sandstone"
              };
              tile.tint = 0x6F6C64;
              break;
            case 154: //smooth sandstone
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Smooth Sandstone"
              };
              tile.tint = 0x6F6C64;
              break;
            case 222: // rough granite
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Granite"
              };
              tile.tint = 0x797979;
              break;
            case 116: // rough hewn granite
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Hewn Granite"
              };
              tile.tint = 0x787878;
              break;
            case 199: //smooth granite
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Smooth Granite"
              };
              tile.tint = 0x777777;
              break;
            case 99: //rough limestone
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Limestone"
              };
              tile.tint = 0x94997A;
              break;
            case 82: // rought hewn limestone
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Hewn Limestone"
              };
              tile.tint = 0x888D70;
              break;
            case 238: //smooth limestone
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Smooth Limestone"
              };
              tile.tint = 0xA7AD89;
              break;
            case 148: //rough slate
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Slate"
              };
              tile.tint = 0x444444;
              break;
            case 101: //rough hewn slate
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Hewn Slate"
              };
              tile.tint = 0x444444;
              break;
            case 184: //smooth slate
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Smooth Slate"
              };
              tile.tint = 0x444444;
              break;
            case 57: //rough marble
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Marble"
              };
              tile.tint = 0xD2D2D2;
              break;
            case 135: //rough hewn marble
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Rough Hewn Marble"
              };
              tile.tint = 0xD2D2D2;
              break;
            case 208: //smooth marble
              tile.data = {
                'tileID': this.mapInfo.topTerrainGrid[masterIndex],
                'rockID': this.mapInfo.resourceTerrainGrid[masterIndex],

                'tileName': "Smooth Marble"
              };
              tile.tint = 0xE9E9E9;
              break;
            default:
              //console.log(this.mapInfo.topTerrainGrid[masterIndex]);
              tile.alpha = 0;
          }


          tile.inputEnabled = true;
          tile.events.onInputDown.add(this.tileCallback, this.mapInfo.topTerrainGrid[masterIndex]);
          masterIndex++;

        }


    }

      this.mainLayer.add(this.topTerrainGridLayer);

    }

    //ROOFS
    if (1 == 2) {
      masterIndex = 0;

      for (var r = 0; r < this.worldSize.x; r++) {
        let tileRow = [];
        for (var c = 0; c < this.worldSize.y; c++) {

          tile = this.game.add.sprite(r * this.TILESIZE, c * this.TILESIZE, "tile"); // flip to fix

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
    if (1 == 2) {
      masterIndex = 0;

      for (var r = 0; r < this.worldSize.x; r++) {
        let tileRow = [];
        for (var c = 0; c < this.worldSize.y; c++) {

          switch (this.mapInfo.resourceTerrainGrid[masterIndex]) {
            case 0:
              break;
            default:
              tile = this.resourceGridLayer.create(r * this.TILESIZE, c * this.TILESIZE, "tile"); // flip to fix
              tile.tint = 0x000000;
              tile.alpha = 0.3;
              tile.data = {
                'tileName': this.mapInfo.resourceTerrainGrid[masterIndex]
              };
              tile.inputEnabled = false;
              tile.events.onInputDown.add(this.tileCallback, this.mapInfo.resourceTerrainGrid[masterIndex]);
          }

          masterIndex++;
          //this.resourceGridLayer.add(tile);

        }
      }
      this.mainLayer.add(this.resourceGridLayer);
    }
    //this.currentBounds = new Phaser.Rectangle(-this.mapInfo.width, -this.mapInfo.height, this.mapInfo.width * 2, this.mapInfo.height * 2);
    //this.game.camera.bounds = this.currentBounds;
    //this.game.camera.focusOnXY(this.mapInfo.width/2, this.mapInfo.height/2);

    /*
        this.marker = this.game.add.graphics();
        this.marker.lineStyle(2, 0xFF1111, 1);
        this.marker.drawRect(this.center.x, this.center.y, this.TILESIZE, this.TILESIZE);
        this.marker.scale.setTo(this.zoomLevel);
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
      thingSprite.autoCull = true;


      //IF Plant, bring to frint



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
          thingSprite.tint = 0xe9e9e9;
          break;
        case "WoodLog":
          thingSprite.tint = 0xBF6C2A;
          break;
        default:
          thingSprite.tint = 0xffffff;
      }

      switch (this.allThings[i].def) {
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

      thingSprite.inputEnabled = true;

      thingSprite.data = {
        'def': this.allThings[i].def,
        'stuff': this.allThings[i].stuff,
        'growth': this.allThings[i].growth
      }

      thingSprite.events.onInputDown.add(this.thingCallback, thingSprite);
      thingSprite.anchor.setTo(0, 1);

      //If large thing (solor panels) NEED TO INVESTIGATE
      if (thingSprite.width > 64 && 1 == 2) {
        thingSprite.anchor.setTo(0.25, 0.75);
      }
      if (this.allThings[i].rot == 2) {
        thingSprite.anchor.setTo(0.6, 0.5);

        thingSprite.angle = 180;
      }

      if (this.allThings[i].growth) {

        thingSprite.scale.setTo(this.allThings[i].growth);
        if (this.allThings[i].growth <= 0.1) {
          thingSprite.destroy();

        }

      }


      thingSprite.angle += 90;
      this.stuffGridLayer.add(thingSprite);

    }
    this.mainLayer.add(this.stuffGridLayer);
  }


  destoryStuff() {
    this.stuffGridLayer.destroy();
  }

  delaceArray(iArray) {
    let masterIndex = 0;
    let outputArray = [];

    //Delace array
    for (var r = this.worldSize.x; r > 0; r--) {
      var row = [];
      for (var c = this.worldSize.y * 2; c > 0; c--) {
        if (c % 2 === 0) { //Have to skip every other byte due to weird decompression error

          // outputArray.push(iArray[masterIndex] ^ iArray[masterIndex + 1]);

          outputArray.push(iArray[masterIndex]);


          /*     var compair = iArray[masterIndex] ^ iArray[masterIndex + 1];
if(compair != 2){
  console.log(iArray[masterIndex] + '=' + (iArray[masterIndex] ^ iArray[masterIndex + 1]));

}*/


          //console.log(iArray[masterIndex].toString(16));
          //var bin = String.fromCharCode(iArray[masterIndex], 2);
          // var bin = iArray[masterIndex].charCodeAt(masterIndex).toString(2);
          //  var out = bin.toString(16);
          //  outputArray.push(out);
          //console.log(String.fromCharCode(iArray[masterIndex],iArray[masterIndex+1])); //Need to use this to gett accurate tile data
        }
        masterIndex++;
      }
    }
    //testArray = Float32Array.from(iArray);

    let bin = this.string2Bin(iArray);

    //console.log(outputArray);


    return outputArray;
  }

  string2Bin(array) {
    return String.fromCharCode.apply(null, array);
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
