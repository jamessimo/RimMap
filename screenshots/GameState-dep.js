import GameUI from 'objects/GameUI';

class GameState extends Phaser.State {

  create() {

    let worldScale = 0;

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
    this.cursors = null;

    this.TILESIZE = 64;

    this.mapInfo = {
      "height": 0,
      "width": 0,
      "topTerrainGrid": [],
      "underTerrainGrid": [],
      "roofGrid": [],
      "stuffGrid": []
    };
    this.topTerrainGridLayer =
      this.underTerrainGridLayer =
      this.stuffLayer =
      this.roofGridLayer = null;
    this.mainLayer = null;
    this.currentBounds = null;
    this.zoompoint = {
      x: 0,
      y: 0
    };
    this.marker = null;
    this.zoomLevel = 1;
    this.map = null;

    this.game.forceSingleUpdate = false;

    this.stuffLayer = null;
  }

  update() {
    //http://jsfiddle.net/valueerror/pdx0px0w/
    if (this.marker && this.topTerrainGridLayer) { ///4
      this.marker.x = this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) * this.TILESIZE / this.zoomLevel;
      this.marker.y = this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) * this.TILESIZE / this.zoomLevel;

      //console.log(this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX*4));
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
        //this.topTerrainGridLayer.position.x -= this.TILESIZE/2;
      } else if (this.cursors.right.isDown) {
        this.game.camera.x += this.TILESIZE;
        //this.topTerrainGridLayer.position.x += this.TILESIZE/2;
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

    this.mapInfo.topTerrainGrid = this.mapTextures(this.mapInfo.topTerrainGrid , "terrain");
    this.mapInfo.resourceTerrainGrid = this.mapTextures(this.mapInfo.resourceTerrainGrid, "resource");


    this.allThings = json.savegame.game.maps.li.things.thing;
    this.mainLayer = this.game.add.group();

    //RENDER TILEMAP
    //this.renderTileMap();
    this.testTileMap();

    this.resourcesTileMap();

    this.renderStuff();

    this.markerInit();

    this.ui = new GameUI(this.game);

    //If picture

    if (!this.fastRender) {
      this.mainLayer.pivot.x = this.mapInfo.width / 2;
      this.mainLayer.pivot.y = this.mapInfo.height / 2;
      this.mainLayer.angle = -180;
      this.mainLayer.position.x = this.mapInfo.width / 2;
      this.mainLayer.position.y = this.mapInfo.width / 2;
    }

    //this.mainLayer.scale.set(this.zoomLevel, this.zoomLevel);
    //this.game.camera.position = this.mainLayer.position;

    this.game.stage.backgroundColor = '#576B76';

    if (this.fastRender) {
      this.mainLayer.pivot.x = 0; //this.mapInfo.width;//this.mapInfo.width/2;
      this.mainLayer.pivot.y = 0; //this.mapInfo.height;//this.mapInfo.height/2;
      this.mainLayer.position.x = 0; //this.mapInfo.width;
      this.mainLayer.position.y = this.mapInfo.height;
      this.renderBitmap();
    }

    this.game.world.setBounds(-this.mapInfo.width / 2, -this.mapInfo.height / 2, this.mapInfo.width , this.mapInfo.height );
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
      if (this.zoomLevel < 4) {

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

  renderBitmap() {
    console.log('rendering...');
    //This is the BitmapData we're going to be drawing to
    var bmd = this.game.add.bitmapData(this.mapInfo.width, this.mapInfo.height);
    this.stuffLayer = bmd.addToWorld(0, 0, 0, 0, 1, 1);
    this.game.stage.updateTransform();
    //  Draw the group to the BitmapData
    bmd.drawGroup(this.mainLayer);
    console.log('Rendered.');
    //bmd.drawFull(this.game.world);
    this.mainLayer.destroy(true, false);
  }

  renderTileMap() {

    this.topTerrainGridLayer = this.game.add.group();
    this.roofGridLayer = this.game.add.group();
    this.resourceGridLayer = this.game.add.group();

    let masterIndex = 0;

    let tile = null;

    let bmd = this.game.add.bitmapData(this.TILESIZE, this.TILESIZE);

    bmd.rect(0, 0, this.TILESIZE, this.TILESIZE, 'rgba(255,255,255,1)');

    this.game.cache.addBitmapData('bmpTile', bmd);


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
            tile.data = {
              'rock': this.mapInfo.resourceTerrainGrid[masterIndex]
            };
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
              console.log(this.mapInfo.topTerrainGrid[masterIndex]);
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

  testTileMap() {

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
    this.map = this.game.add.tilemap('dynamicMap', this.TILESIZE, this.TILESIZE);

    //  'tiles' = cache image key, 64x64 = tile size
    this.map.addTilesetImage('tiles', 'tiles', this.TILESIZE, this.TILESIZE);

    //  0 is important
    this.topTerrainGridLayer = this.map.createLayer(0);

    this.topTerrainGridLayer.resizeWorld();

  }

  resourcesTileMap(){

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
    this.resourceMap = this.game.add.tilemap('dynamicMap2', this.TILESIZE, this.TILESIZE);

    //  'tiles' = cache image key, 64x64 = tile size
    this.resourceMap.addTilesetImage('testtiles', 'testtiles', this.TILESIZE, this.TILESIZE);

    //  0 is important
    this.resourceGridLayer = this.resourceMap.createLayer(0);

    this.resourceGridLayer.resizeWorld();
  }

  renderStuff() {
    let thingSprite = null;
    //this.allThings =  this.allThings.reverse();
    //this.allThings = this.allThings.reverse();
    //this.mapInfo.stuffGrid = [this.worldSize.x][this.worldSize.y];

    for (let i = this.allThings.length - 1; i > 0; i--) {
      let thingPos = this.getPosition(this.allThings[i].pos);

      //this.mapInfo.stuffGrid[thingPos[0]][thingPos[2]] = this.allThings[i];

    }
    console.log(this.mapInfo.stuffGrid);

    for (let i = this.allThings.length - 1; i > 0; i--) {
      let thingPos = this.getPosition(this.allThings[i].pos);

      thingSprite = this.game.add.sprite(
        (thingPos[0] * this.TILESIZE), -(thingPos[2] * this.TILESIZE),
        this.allThings[i].def
      );
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
        'growth': this.allThings[i].growth,
        'health': this.allThings[i].health,
        'quality': this.allThings[i].quality
      }

      thingSprite.events.onInputDown.add(this.thingCallback, thingSprite);
      thingSprite.anchor.setTo(0, 1);

      //If large thing (solor panels) NEED TO INVESTIGATE
      if (thingSprite.width > this.TILESIZE && 1 == 2) {
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
      if (!this.fastRender) {
        thingSprite.angle += 180;
      }
      //this.stuffGridLayer.add(thingSprite);
      this.mainLayer.add(thingSprite);
    }
  }

  destoryStuff() {
    this.stuffGridLayer.destroy();
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
  mapTextures(iArray,param) {


if(param == "terrain"){
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
}else if(param = "resource"){
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

    let terrainTile = this.map.getTile(x, y, this.topTerrainGridLayer);

    // Note: JSON.stringify will convert the object tile properties to a string
    x = this.resourceGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel); // 4 * ZOOM
    y = this.resourceGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel);


    let resourceTile =  this.map.getTile(x, y, this.resourceGridLayer);
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

  getPosition(raw) {
    //Remove the () + comma seperate the x y z
    let formattedSize = raw.replace(/[(-)]/g, '');
    formattedSize = formattedSize.split(",");
    return formattedSize;
  }
}
export default GameState;
