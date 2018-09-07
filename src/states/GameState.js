class GameState extends Phaser.State {
  create() {

    this.json = this.game.json;

    this.fastRender = true;

    this.center = {
      x: this.game.world.centerX,
      y: this.game.world.centerY
    }

    this.SCREENWIDTH = this.game.width;
    this.SCREENHEIGHT = this.game.height;

    this.MOUSEBOUNDS = 25;

    this.worldSize = {
      x: 0,
      y: 0,
      z: 0
    };

    this.GRANITE = 0x635e5b;
    this.LIMESTONE = 0x5f5c44;
    this.SANDSTONE = 0x756157;
    this.MARBLE = 0x777877;
    this.SLATE = 0x3a3a39;
    this.SAND = 0x998864;

    this.WOOD = 0xBF6C2A;
    this.STEEL = 0xb7b7b7;
    this.PLASTEEL = 0x7bafae;
    this.COMPONENTS = 0x392C18;
    this.GOLD = 0xD0B703;
    this.SILVER = 0xAEA290;
    this.URANIUM = 0x768451;
    this.JADE = 0x438347;

    this.ALPACA = 0xedd8ae;
    this.ALPHABEAVER = 0x735348;
    this.FOXARCTIC = 0xc8c8c8;
    this.WOLFARCTIC = 0xc8c8c8;
    this.BOOMALOPE = 0xb0966a;
    this.BOOMRAT = 0x73251c;
    this.CAPYBARA = 0xb97d4f;
    this.CARIBOU = 0xad634d;
    this.CASSOWARY = 0x505050;
    this.CAT = 0xbdab9f;
    this.CHICKEN = 0xc89655;
    this.CAMEL = 0xb7a23a;
    this.CHINCHILLA = 0xb2aa9e;
    this.COBRA = 0x716257;
    this.COUGAR = 0xb18870;
    this.COW = 0xc9c9c9;
    this.DEER = 0xa26a39;
    this.DROMEDARY = 0xccb496;
    this.ELEPHANT = 0x827e77;
    this.ELK = 0xa26a39;
    this.EMU = 0x7a6d63;
    this.FOXFENNEC = 0xc5a167;
    this.GAZELLE = 0xd6863b;
    this.GRIZZLYBEAR = 0x705241;
    this.HARE = 0x83806c;
    this.HUMAN = 0xd3c28f;
    this.HUSKY = 0x898585;
    this.IBEX = 0x998171;
    this.IGUANA = 0x65743a;
    this.LABRADORRETRIEVER = 0xdcc6a0;
    this.LYNX = 0xad9b8a;
    this.MEGASCARAB = 0x726b54;
    this.MEGASLOTH = 0xbda174;
    this.MEGASPIDER = 0x9a7d5e;
    this.MONKEY = 0x7c351d;
    this.MUFFALO = 0x98aaae;
    this.OSTRICH = 0x4c5363;
    this.PANTHER = 0x3c3c3c;
    this.PIG = 0xae967e;
    this.POLARBEAR = 0xb4b4b4;
    this.RACCOON = 0xaeacae;
    this.RAT = 0x6e5f52;
    this.FOXRED = 0xb26422;
    this.RHINOCEROS = 0x969696;
    this.SNOWHARE = 0xb4b4b4;
    this.SPELOPEDE = 0x9c947d;
    this.SQUIRREL = 0x8c5524;
    this.THRUMBO = 0xe9e9e9;
    this.WOLFTIMBER = 0x736e64;
    this.TORTOISE = 0x474f31;
    this.TURKEY = 0x505050;
    this.WARG = 0x7b6859;
    this.WILDBOAR = 0xae967e;
    this.YORKSHIRETERRIER = 0xd1a827;

    this.MEAT = 0xB03030;

    this.DEVILSTRAND = 0x8c1d10;
    this.CLOTH = 0xc3c0b0;

    if (this.game.hd == false) {
      this.TILESIZE = 16;
      this.SCALESIZE = 0.25;

      this.zoomLevel = 1;
      this.zoomRate = 0.5;
      this.minZoom = 0.5;
      this.maxZoom = 2.5;
    } else {
      this.TILESIZE = 32; //orginal 64, cut in half to save memory.
      this.SCALESIZE = 0.5;
      this.zoomLevel = 1;
      this.zoomRate = 0.5;
      this.minZoom = 1;
      this.maxZoom = 2.5;
    }

    this.mapInfo = { //RAW MAP DATA (arrays)
      "height": 0,
      "width": 0,
      "name": null,
      "topTerrainGrid": [],
      "underTerrainGrid": [],
      "resourceGrid": [],
      "resourceRefGrid": [],
      "deepResourceGrid": [],
      "deepResourceCount": [],
      "roofGrid": [],
      "stuffGrid": [],
      "stuffRefGrid": []
    };


    this.cursors =
      this.currentTile =
      this.topTerrainGridLayer = //TILEMAPS/BITMAP IMAGES
      this.underTerrainGridLayer =
      this.resourceGridLayer =
      this.deepResourceGridLayer =
      this.rocksGridLayer =
      this.rocksLayer =
      this.mountainsLayer =
      this.stuffLayer =
      this.resourceLayer =
      this.deepResourceLayer =
      this.roofGridLayer =
      this.centerMarker =
      this.currentBounds =
      this.marker = null;

    this.rockGrid = [];
    this.game.forceSingleUpdate = false;
    this.game.stage.backgroundColor = '#1f271d';

    this.game.multiTexture = true;

    this.loading = false;
    this.loadingFinished = false;
    this.LOADDELAY = 10; //A small tick to allow the UI to update the loading state
    this.loadingDeltaWait = this.LOADDELAY;
    this.loadingDelta = 0;

    this.clickDepth = 0;
    this.clickIndex = 0;
    this.oldStuffTile = null;

    this.worldScale = this.minZoom;
    this.distance = 0;
    this.olddistance = 0;
    this.groupScale = 0;
    this.distancedelta = 0;
    this.easing = 1; //0.1;
    this.mapSizeCurrent;
    this.mapSizeMax;
    this.prevScale = {};
    this.nextScale = {};
    this.zoompoint = {
      x: 0,
      y: 0
    };
    this.scrollZoomRate = 256;
    this.scrolling = true;
    this.padding = 2;

  }

  update() {

    if (this.loadingDelta == 0) {
      this.buildMapInfo(this.json);
    }
    if (this.loadingDelta > 0 && this.loadingDeltaWait > 0 && this.loadingFinished == false) {
      if (this.loadingSprite) {
        this.loadingSprite.scale.setTo(0.5 * this.loadingDelta);
      }
      this.loadingDeltaWait--;
    } else {
      this.loading = true;
    }

    if (this.loading && this.loadingFinished == false) {
      if (this.loadingDelta == 1) {

        console.log(this.loadingDelta);

        this.rocksGridLayer = this.game.add.group();
        this.mountainsLayer = this.game.add.group();
        this.stuffGridLayer = this.game.add.group();
        this.resourceGridLayer = this.game.add.group();
        this.deepResourceGridLayer = this.game.add.group();


        for (var i = 0; i < this.worldSize.x; i++) {
          if (!this.rockGrid[i]) {
            this.rockGrid[i] = [];
          }
          for (var j = 0; j < this.worldSize.y; j++) {
            this.rockGrid[i][j] = 0;
          }
        }

        //RENDER TILEMAP

        this.renderTerrainTileMap();

        this.renderStuff();

        this.renderWalls();

        this.renderMountain();

        this.markerInit();

        this.loadingDelta = 2;
        this.loadingDeltaWait = this.LOADDELAY;
        this.loading = false;

      } else if (this.loadingDelta == 2) {
        console.log(this.loadingDelta);

        this.stuffLayer = this.renderBitmap(this.stuffGridLayer);

        this.loadingDelta = 3;
        this.loadingDeltaWait = this.LOADDELAY;
        this.loading = false;

      } else if (this.loadingDelta == 3) {
        console.log(this.loadingDelta);

        //for scrolling
        this.groupScale = this.stuffLayer.scale.x;

        this.rocksGridLayer.add(this.mountainsLayer);

        this.rocksLayer = this.renderBitmap(this.rocksGridLayer);

        this.mountainsLayer.destroy();
        this.loadingDelta = 4;
        this.loadingDeltaWait = this.LOADDELAY;
        this.loading = false;

      } else if (this.loadingDelta == 4) {
        console.log(this.loadingDelta);

        this.mapSizeMax = this.mapInfo.width;
        this.mapSizeCurrent = this.mapSizeMax;
        this.worldScale = 1;

        this.game.input.mouseWheel.callback = (event) => {
          let wheelDelt = this.game.input.mouseWheel.delta;
          let oldSize = this.mapSizeCurrent;
          if (wheelDelt < 0) {
            this.mapSizeCurrent -= this.scrollZoomRate;
            this.mapSizeCurrent = Phaser.Math.clamp(this.mapSizeCurrent, this.SCREENWIDTH, this.mapSizeMax);
          } else {
            this.mapSizeCurrent += this.scrollZoomRate;
            this.mapSizeCurrent = Phaser.Math.clamp(this.mapSizeCurrent, this.SCREENWIDTH, this.mapSizeMax);
          }
          this.scrolling = true;
          this.worldScale = (this.mapSizeCurrent / this.mapSizeMax);
        };


        this.currentBounds = new Phaser.Rectangle(-this.mapInfo.width * 2, -this.mapInfo.height * 2, this.mapInfo.width * 4, this.mapInfo.height * 4);
        //  this.game.camera.bounds =  this.currentBounds;

        //this.game.world.setBounds(0, 0, this.mapInfo.width, this.mapInfo.height);
        this.game.camera.bounds = null;

        this.game.camera.focusOnXY(this.mapInfo.width / 2, this.mapInfo.height / 2);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.plusKey = this.game.input.keyboard.addKey(Phaser.Keyboard.EQUALS).onDown.add(function() {
          if ((this.zoomLevel - this.zoomRate) >= this.minZoom) {
            this.zoomMap(this.zoomLevel - this.zoomRate);
          }
        }, this);
        this.minusKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE).onDown.add(function() {
          if ((this.zoomLevel + this.zoomRate) < this.maxZoom) {
            this.zoomMap(this.zoomLevel + this.zoomRate);
          }
        }, this);

        this.game.input.onDown.add(this.getTileProperties, this);

        this.loadingDelta = 5;
        this.loading = false;
        this.loadingDeltaWait = this.LOADDELAY;
        this.loadingFinished = true;
      }
    }
    if (this.loadingFinished == true && this.loadingDelta == 5) {


      // wheelzoom

      if (this.isMouseOut()) {
        if (this.game.input.mousePointer.x > this.SCREENWIDTH - this.MOUSEBOUNDS) {
          this.game.camera.x += (this.TILESIZE / this.zoomLevel);
        }
        if (this.game.input.mousePointer.x < 0 + this.MOUSEBOUNDS) {
          this.game.camera.x -= (this.TILESIZE / this.zoomLevel);
        }
        if (this.game.input.mousePointer.y > this.SCREENHEIGHT - this.MOUSEBOUNDS) {
          this.game.camera.y += (this.TILESIZE / this.zoomLevel);
        }
        if (this.game.input.mousePointer.y < 0 + this.MOUSEBOUNDS) {
          this.game.camera.y -= (this.TILESIZE / this.zoomLevel);
        }

        if (this.cursors.up.isDown) {
          this.game.camera.y -= (this.TILESIZE / this.zoomLevel);
        } else if (this.cursors.down.isDown) {
          this.game.camera.y += (this.TILESIZE / this.zoomLevel);
        }
        if (this.cursors.left.isDown) {
          this.game.camera.x -= (this.TILESIZE / this.zoomLevel);
        } else if (this.cursors.right.isDown) {
          this.game.camera.x += (this.TILESIZE / this.zoomLevel);
        }

      }
      // move camera / pan
      if (this.game.input.activePointer.isDown && !this.game.input.pointer2.isDown) {
        if (this.oldcamera) { // if moving the world always continue from the last position
          if (this.isMouseOut()) {
            this.game.camera.x += this.oldcamera.x - this.game.input.activePointer.position.x;
            this.game.camera.y += this.oldcamera.y - this.game.input.activePointer.position.y;
          }
        }
        this.oldcamera = this.game.input.activePointer.position.clone();

      } else {

        // adjust camera center and zoom here

        if (this.isMouseOut()) {

          //this.zoompoint.x = this.game.input.mousePointer.worldX;
          //this.zoompoint.y = this.game.input.mousePointer.worldY;

          this.marker.x = this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) * this.TILESIZE / this.zoomLevel;
          this.marker.y = this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) * this.TILESIZE / this.zoomLevel;

          this.zoompoint.x = this.marker.x;
          this.zoompoint.y = this.marker.y;
        }

        this.oldcamera = null;

        this.rescalefactorx = this.mapInfo.width / (this.mapInfo.width * this.groupScale); // multiply by rescalefactor to get original world value
        this.rescalefactory = this.mapInfo.height / (this.mapInfo.height * this.groupScale);

        this.prevScale.x = this.groupScale;
        this.prevScale.y = this.groupScale;

        this.nextScale.x = this.prevScale.x + (this.worldScale - this.groupScale) * this.easing;
        this.nextScale.y = this.prevScale.y + (this.worldScale - this.groupScale) * this.easing;

        var xAdjust = (this.zoompoint.x - this.game.camera.x) * (this.nextScale.x - this.prevScale.x);
        var yAdjust = (this.zoompoint.y - this.game.camera.y) * (this.nextScale.y - this.prevScale.y);

        //Only move screen if we're not the same scale
        if (this.prevScale.x != this.nextScale.x || this.prevScale.y != this.nextScale.y) {

          var scaleAdjustX = this.nextScale.x / this.prevScale.x;
          var scaleAdjustY = this.nextScale.y / this.prevScale.y;

          var focusX = (this.game.camera.x * scaleAdjustX) + xAdjust * (this.rescalefactorx);
          var focusY = (this.game.camera.y * scaleAdjustY) + yAdjust * (this.rescalefactory);

          //  var focus   var focusX = (game.camera.position.x * scaleAdjustX) + xAdjust*(rescalefactorx);
          //  var focusY = ((this.zoompoint.y / scaleAdjustY) / this.rescalefactory);

          this.game.camera.x = focusX;
          this.game.camera.y = focusY;
          //this.game.camera.focusOnXY(focusX, focusY);
        }
        if (this.scrolling == true) {

          //if (this.rescalefactorx >= this.minZoom || this.rescalefactorx <= this.maxZoom) {
          this.zoomMap(parseFloat(this.rescalefactorx).toPrecision(4));
          //this.zoomMap(this.zoomLevel - this.zoomRate);
          //}
        }
        //now actually scale the stage
        this.groupScale += (this.worldScale - this.groupScale) * this.easing; //easing
      }
      this.scrolling = false;
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 20, 44, "#ffca42");
    //this.game.debug.text(this.loadingDelta || '--', 2, 44, "#ff0000");
  }

  buildMapInfo(json) {

    //SETUP LOADING
    let rawSizes = null;
    if (json.savegame.game.maps.li.length) {
      json.savegame.game.maps.li = json.savegame.game.maps.li[0];
    }
    rawSizes = json.savegame.game.maps.li.mapInfo.size;

    let sizes = this.getPosition(rawSizes);

    this.worldSize.x = sizes[0];
    this.worldSize.y = sizes[2];
    this.worldSize.z = sizes[1];

    this.loadingDelta = 1;

    this.mapInfo.width = this.TILESIZE * this.worldSize.x;
    this.mapInfo.height = this.TILESIZE * this.worldSize.y;

    this.mapInfo.topTerrainGrid = this.decompress(json.savegame.game.maps.li.terrainGrid.topGridDeflate);
    this.mapInfo.underTerrainGrid = this.decompress(json.savegame.game.maps.li.terrainGrid.underGridDeflate);
    //this.mapInfo.roofTerrainGrid = this.decompress(json.savegame.game.maps.li.roofGrid);
    this.mapInfo.resourceRefGrid = this.decompress(json.savegame.game.maps.li.compressedThingMapDeflate);

    this.mapInfo.deepResourceGrid = this.decompress(json.savegame.game.maps.li.deepResourceGrid.defGridDeflate);
    this.mapInfo.deepResourceCount = this.decompress(json.savegame.game.maps.li.deepResourceGrid.countGridDeflate);

    this.mapInfo.topTerrainGrid = this.mapTextures(this.mapInfo.topTerrainGrid, "terrain");
    this.mapInfo.stuffGrid = json.savegame.game.maps.li.things.thing;

  }

  renderBitmap(group, center) {

    const BMPCHUNKS = 1;
    const CHUNK_WIDTH = this.mapInfo.width / BMPCHUNKS;
    const CHUNK_HEIGHT = this.mapInfo.height / BMPCHUNKS;

    let outputGroup = this.game.add.group();

    let groupPosX = 0;
    let groupPosY = 0;

    let renderdChunks = [];
    let renderOutput = null;

    let bmd = null;

    if (center) {
      groupPosX = -this.mapInfo.width / 2;
      groupPosY = this.mapInfo.height / 2;
      group.pivot.x = -this.mapInfo.width / 2;
      group.pivot.y = -this.mapInfo.height / 2;
    } else {
      groupPosX = 0;
      groupPosY = this.mapInfo.height;
      group.pivot.x = 0;
      group.pivot.y = 0;
    }

    for (let i = 0; i < BMPCHUNKS; i++) {
      group.position.x = groupPosX;
      for (let j = 0; j < BMPCHUNKS; j++) {

        group.position.y = groupPosY;

        //This is the BitmapData we're going to be drawing to
        bmd = this.game.add.bitmapData(CHUNK_WIDTH, CHUNK_HEIGHT, false);
        renderOutput = bmd.addToWorld(CHUNK_HEIGHT * i, CHUNK_HEIGHT * j, 0, 0, 0.5, 0.5);

        this.game.stage.updateTransform();
        //  Draw the group to the BitmapData

        //bmd.drawFull(this.game.world);
        bmd.baseTexture.resolution = 0.5;

        //bmd.scale.set(1.5,1.5);
        //bmd.baseTexture.skipRender = true;
        //bmd.baseTexture.unloadFromGPU();
        bmd.disableTextureUpload = true;

        bmd.drawGroup(group);

        renderdChunks.push(renderOutput);

        outputGroup.add(renderOutput);
        groupPosY = CHUNK_HEIGHT;

      }
      groupPosY = this.mapInfo.height;
      groupPosX = -CHUNK_WIDTH;

    }

    bmd = null;

    group.destroy(true, false);

    return outputGroup;
  }

  renderTerrainTileMap() {

    this.game.cache.addTilemap('dynamicMap', null, this.makeCSV(this.mapInfo.topTerrainGrid), Phaser.Tilemap.CSV);
    let tileMap = this.game.add.tilemap('dynamicMap', this.TILESIZE, this.TILESIZE);
    tileMap.addTilesetImage('tiles', 'tiles', this.TILESIZE, this.TILESIZE);
    //  0 is important
    this.topTerrainGridLayer = tileMap.createLayer(0);
    this.topTerrainGridLayer.renderSettings.enableScrollDelta = false;

    this.topTerrainGridLayer.resizeWorld();
  }

  renderResourceTileMap() {

    let masterIndex = 0;
    let resourceSprite = null;

    for (let i = 0; i < this.worldSize.x; i++) {
      for (let j = 0; j < this.worldSize.y; j++) {
        if (this.mapInfo.resourceRefGrid[masterIndex] > 0) {

          switch (this.mapInfo.resourceRefGrid[masterIndex]) {

            case 78: //Marble chunk
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.MARBLE;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 119: //Limestone chunk
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.LIMESTONE;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 252: //Granite chunk
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.GRANITE;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 102: //Slate chunk
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.SLATE;
              this.resourceGridLayer.add(resourceSprite);
            case 47: //Sandstone chunk
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.SANDSTONE;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 241: //Metal Chunk
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'slag');
              resourceSprite.scale.setTo(this.SCALESIZE);
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 17: //Plasteel
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.PLASTEEL;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 56: //compactmach
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.COMPONENTS;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 156: //Steel
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.STEEL;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 103: //Uruianum
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.URANIUM;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 229: //GOLD
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.GOLD;
              this.resourceGridLayer.add(resourceSprite);
              break;

            case 194: // Sliver
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.SILVER;
              this.resourceGridLayer.add(resourceSprite);
              break;

            case 127: // Jade
              resourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.SCALESIZE);
              resourceSprite.tint = this.JADE;
              this.resourceGridLayer.add(resourceSprite);
              break;
          }
        }
        masterIndex++;
      }
    }
  }

  renderDeepResourceTileMap() {

    let masterIndex = 0;
    let deepResourceSprite = null;
    for (let i = 0; i < this.worldSize.x; i++) {
      for (let j = 0; j < this.worldSize.y; j++) {
        if (this.mapInfo.deepResourceGrid[masterIndex] > 0) {
          //TODO
          deepResourceSprite = this.game.add.sprite((j * this.TILESIZE), -((i + 1) * this.TILESIZE), 'resourceTint');
          deepResourceSprite.scale.setTo(this.SCALESIZE);
          deepResourceSprite.tint = 0x00ff00;
          this.deepResourceGridLayer.add(deepResourceSprite);
        }
        masterIndex++;
      }
    }
  }

  renderWalls() {
    let walls = [];
    let sandbags = [];

    let wallSprite = null;
    let sandbagSprite = null;

    let thingPos = null;
    //BUILD EMPTY WALL ARRAY
    for (var i = 0; i < this.worldSize.x; i++) {
      if (!this.mapInfo.stuffRefGrid[i]) {
        this.mapInfo.stuffRefGrid[i] = [];
        walls[i] = [];
        sandbags[i] = [];
      }
      for (var j = 0; j < this.worldSize.y; j++) {
        this.mapInfo.stuffRefGrid[i][j] = [];
        walls[i][j] = 0;
        sandbags[i][j] = 0;
      }
    }

    for (let i = 0; i < this.mapInfo.stuffGrid.length; i++) {
      thingPos = this.getPosition(this.mapInfo.stuffGrid[i].pos);
      this.mapInfo.stuffRefGrid[thingPos[0]][thingPos[2]].push(this.mapInfo.stuffGrid[i]);
      if (this.mapInfo.stuffGrid[i].def == "Wall") {
        walls[thingPos[0]][thingPos[2]] = 1;
      } else if (this.mapInfo.stuffGrid[i].def == "Sandbags") {
        sandbags[thingPos[0]][thingPos[2]] = 1;
      }
    }

    for (let i = this.mapInfo.stuffGrid.length - 1; i > 0; i--) {
      thingPos = this.getPosition(this.mapInfo.stuffGrid[i].pos);

      if (this.mapInfo.stuffGrid[i].def == "Wall") {
        let chunk = [];
        let direction = null;
        let wallStuff = null;

        if (walls[thingPos[0] + 1]) {
          chunk = [
            [0, walls[thingPos[0]][thingPos[2] + 1], 0],
            [walls[thingPos[0] - 1][thingPos[2]], 1, walls[thingPos[0] + 1][thingPos[2]]],
            [0, walls[thingPos[0]][thingPos[2] - 1], 0]
          ];
        }

        switch (this.mapInfo.stuffGrid[i].stuff) {
          case "BlocksGranite":
          case "BlocksSlate":
          case "BlocksMarble":
          case "BlocksLimestone":
          case "BlocksSandstone":
            wallStuff = "brickWallTiles"
            break;
          case "WoodLog":
            wallStuff = "woodWallTiles"
            break;
            //TODO ADD SMOOTH
          default:
            wallStuff = "wallTiles";
        }
        direction = this.matchWall(chunk);
        wallSprite = this.game.add.sprite(
          (thingPos[0] * this.TILESIZE), -(thingPos[2] * this.TILESIZE),
          wallStuff, direction
        );
        switch (this.mapInfo.stuffGrid[i].stuff) {
          case "BlocksSandstone":
            wallSprite.tint = this.SANDSTONE;
            break;
          case "BlocksGranite":
            wallSprite.tint = this.GRANITE;
            break;
          case "BlocksSlate":
            wallSprite.tint = this.SLATE;
            break;
          case "BlocksLimestone":
            wallSprite.tint = this.LIMESTONE;
            break;
          case "BlocksMarble":
            wallSprite.tint = this.MARBLE;
            break;
          case "WoodLog":
            wallSprite.tint = this.WOOD;
            break;
          default:
            wallSprite.tint = 0xffffff;
        }

        wallSprite.scale.setTo(this.SCALESIZE);
        wallSprite.anchor.setTo(0.1, 0.9);
        this.stuffGridLayer.add(wallSprite);

      } else if (this.mapInfo.stuffGrid[i].def == "Sandbags") {
        let chunk = [];
        let direction = null;

        if (sandbags[thingPos[0] + 1]) {
          chunk = [
            [0, sandbags[thingPos[0]][thingPos[2] + 1], 0],
            [sandbags[thingPos[0] - 1][thingPos[2]], 1, sandbags[thingPos[0] + 1][thingPos[2]]],
            [0, sandbags[thingPos[0]][thingPos[2] - 1], 0]
          ];
        }
        direction = this.matchWall(chunk);
        sandbagSprite = this.game.add.sprite(
          (thingPos[0] * this.TILESIZE), -(thingPos[2] * this.TILESIZE),
          'sandbagTiles', direction
        );
        sandbagSprite.tint = this.SAND;
        sandbagSprite.scale.setTo(this.SCALESIZE);
        sandbagSprite.anchor.setTo(0.1, 0.9);
        this.stuffGridLayer.add(sandbagSprite);
      } //End Wall Sandbag elseif
    } //End For
  }

  renderStuff() {

    let thingPos = null;
    let thingSprite = null;
    let rockUnderSprite = null;

    let filterName = null;

    for (let i = this.mapInfo.stuffGrid.length - 1; i > 0; i--) {

      filterName = this.getStuffName(this.mapInfo.stuffGrid[i].def);
      thingPos = this.getPosition(this.mapInfo.stuffGrid[i].pos);

      //First check if the stuff is a damged rock if so add it to rocks and discard
      //Second check if its not a wall, sandbag, animal or anything undesiraable
      if (this.mapInfo.stuffGrid[i].def == "Granite" ||
        this.mapInfo.stuffGrid[i].def == "Limestone" ||
        this.mapInfo.stuffGrid[i].def == "Sandstone" ||
        this.mapInfo.stuffGrid[i].def == "Marble" ||
        this.mapInfo.stuffGrid[i].def == "Slate" ||
        this.mapInfo.stuffGrid[i].def == "MineableSteel") {

        this.rockGrid[thingPos[2]][thingPos[0]] = 1;

      } else if (
        this.mapInfo.stuffGrid[i].def != "Wall" &&
        this.mapInfo.stuffGrid[i].def != "Sandbags" &&
        this.isAllowedStuff(filterName) &&
        this.isAnimal(filterName)) {

        thingSprite = this.game.add.sprite(
          (thingPos[0] * this.TILESIZE), -(thingPos[2] * this.TILESIZE),
          filterName
        );

        if (this.mapInfo.stuffGrid[i].def != "WoodLog" && //Dont color sprites that are pre-colored
          this.mapInfo.stuffGrid[i].def != "Steel" &&
          this.mapInfo.stuffGrid[i].def != "Plasteel" &&
          this.mapInfo.stuffGrid[i].def != "Jade" &&
          this.mapInfo.stuffGrid[i].def != "Silver" &&
          this.mapInfo.stuffGrid[i].def != "Gold") {

          thingSprite = this.colorSprite(thingSprite, this.mapInfo.stuffGrid[i]);
          //x_Meat does not change color depending on animal so just color it all
          if (filterName == "Meat") {
            thingSprite.tint = this.MEAT;
          }
        }

        //Rotate the thing correctly
        thingSprite.scale.setTo(this.SCALESIZE);
        thingSprite = this.thingAlign(thingSprite, this.mapInfo.stuffGrid[i]);
        if (this.mapInfo.stuffGrid[i].growth) {
          if (this.mapInfo.stuffGrid[i].growth <= 0.1) {
            thingSprite.destroy();
          } else {
            thingSprite.scale.setTo(this.mapInfo.stuffGrid[i].growth * (this.SCALESIZE));
          }
        }

        if (thingSprite) {
          this.stuffGridLayer.add(thingSprite);
        }

        if (thingSprite && this.mapInfo.stuffGrid[i].def == "SteamGeyser" ||
          thingSprite && this.mapInfo.stuffGrid[i].def == "Shelf" ||
          thingSprite && this.mapInfo.stuffGrid[i].def == "PlantPot") {
          this.stuffGridLayer.sendToBack(thingSprite);
        }
      } //printsprite

    } //End for Loop
  }

  renderMountain() {

    //IF WALL CHOOSE WALL SPRITE
    let chunk = [];
    let masterIndex = 0;
    let rockSprite;
    let rockTint;

    for (let i = 0; i < this.worldSize.x; i++) {
      for (let j = 0; j < this.worldSize.y; j++) {
        if (this.mapInfo.resourceRefGrid[masterIndex] > 0) {

          switch (this.mapInfo.resourceRefGrid[masterIndex]) {

            case 120: //?!?!?!?!? TODO
            case 78: //Marble chunk
            case 119: //Limestone chunk
            case 252: //Granite chunk
            case 102: //Slate chunk
            case 47: //Sandstone chunk
            case 241: //Metal Chunk

              this.rockGrid[i][j] = 0; //Ignore Rock chunks
              break;
            default:
              this.rockGrid[i][j] = 1;
          }
        }
        masterIndex++;
      }
    }
    masterIndex = 0;
    let direction = null;
    let rockTintSprite = null;

    for (let i = 0; i < this.worldSize.x; i++) {
      for (let j = 0; j < this.worldSize.y; j++) {
        if (this.rockGrid[i][j] == 1) {
          if (this.rockGrid[i - 1] && this.rockGrid[j - 1] && this.rockGrid[i + 1] && this.rockGrid[j + 1]) {
            chunk = [
              [0, this.rockGrid[i + 1][j], 0],
              [this.rockGrid[i][j - 1], 1, this.rockGrid[i][j + 1]],
              [0, this.rockGrid[i - 1][j], 0]
            ];
            direction = this.matchWall(chunk);
          } else {
            direction = null;
          }

          //Decide color here
          if (direction != null) {
            rockSprite = this.game.add.sprite(
              (j * this.TILESIZE), -(i * this.TILESIZE),
              'rockTiles', direction
            );

            rockSprite.anchor.setTo(0.1, 0.9);

            switch (this.mapInfo.topTerrainGrid[masterIndex] + 1) {
              case 41:
                rockSprite.tint = this.SANDSTONE;
                break;
              case 50:
                rockSprite.tint = this.SLATE;
                break;
              case 44:
                rockSprite.tint = this.GRANITE;
                break;
              case 52:
                rockSprite.tint = this.MARBLE;
                break;
              case 47:
                rockSprite.tint = this.LIMESTONE;
                break;
            }
            rockSprite.scale.setTo(this.SCALESIZE);
            this.rocksGridLayer.add(rockSprite);
          }

          //Tint all rock tiles and add to mountain group
          rockTint = null;

          rockTint = this.game.add.sprite(
            (j * this.TILESIZE), -((i + 1) * this.TILESIZE),
            'rockTint'
          );
          //this has a weird problem
          rockTint.scale.setTo(this.SCALESIZE);
          this.mountainsLayer.add(rockTint);
        }
        masterIndex++;
      }
    }
    //this.mapInfo.resourceRefGrid = this.formatArray(this.mapInfo.resourceRefGrid);
  }
  hideStuff() {
    this.stuffLayer.alpha = 0;
  }

  showStuff() {
    this.stuffLayer.alpha = 1;
  }

  hideResources() {
    this.resourceLayer.alpha = 0;
    this.loadingFinished = true;
  }

  showResources() {
    this.loadingFinished = false;
    if (!this.resourceLayer) {
      let oldCam = {
        x: this.game.camera.x,
        y: this.game.camera.y
      }
      this.game.camera.x = 0;
      this.game.camera.y = 0;
      setTimeout(() => {
        this.renderResourceTileMap();
        this.resourceLayer = this.renderBitmap(this.resourceGridLayer, true);
        this.resourceLayer.scale.set(1 / this.zoomLevel);
        setTimeout(() => {
          this.game.camera.x = oldCam.x;
          this.game.camera.y = oldCam.y;
          this.loadingFinished = true;
        }, 500);
      }, 500);
    } else {
      this.resourceLayer.alpha = 1;
      this.loadingFinished = true;
    }
  }
  hideDeepResources() {
    this.deepResourceLayer.alpha = 0;
    this.loadingFinished = true;
  }

  showDeepResources() {
    this.loadingFinished = false;
    if (!this.deepResourceLayer) {
      let oldCam = {
        x: this.game.camera.x,
        y: this.game.camera.y
      }
      this.game.camera.x = 0;
      this.game.camera.y = 0;
      setTimeout(() => {
        this.renderDeepResourceTileMap();
        this.deepResourceLayer = this.renderBitmap(this.deepResourceGridLayer, true);
        this.deepResourceLayer.scale.set(1 / this.zoomLevel);
        setTimeout(() => {
          this.game.camera.x = oldCam.x;
          this.game.camera.y = oldCam.y;
          this.loadingFinished = true;
        }, 500);
      }, 500);
    } else {
      this.deepResourceLayer.alpha = 1;
      this.loadingFinished = true;
    }
  }

  hideMountains() {
    this.rocksLayer.alpha = 0;
  }

  showMountains() {
    this.rocksLayer.alpha = 1;
  }

  zoomMap(iZoom) {

    this.zoomLevel = iZoom;

    this.stuffLayer.scale.set(1 / this.zoomLevel);

    if (this.rocksLayer) {
      this.rocksLayer.scale.set(1 / this.zoomLevel);
    }
    if (this.resourceLayer) {
      this.resourceLayer.scale.set(1 / this.zoomLevel);
    }
    if (this.deepResourceLayer) {
      this.deepResourceLayer.scale.set(1 / this.zoomLevel);
    }
    this.marker.scale.setTo(1 / this.zoomLevel)

    this.topTerrainGridLayer.position.x = this.topTerrainGridLayer.width - this.game.camera.position.x;
    this.topTerrainGridLayer.position.y = this.topTerrainGridLayer.height - this.game.camera.position.y;

    this.topTerrainGridLayer.setScale(1 / this.zoomLevel, 1 / this.zoomLevel);
    this.topTerrainGridLayer.resize(this.game.width * this.zoomLevel, this.game.height * this.zoomLevel);
    this.topTerrainGridLayer.resizeWorld();

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
  colorSprite(sprite, thingRef) {
    //If thing has stuff do stuff case, if not do based on names
    let currentSprite = null;

    if (thingRef.color) {
      let rawColor = this.getColor(thingRef.color);
      let hexColor = Phaser.Color.getColor(rawColor[0], rawColor[1], rawColor[2]);
      sprite.tint = hexColor
    } else {
      if (thingRef.stuff) {
        currentSprite = thingRef.stuff;
      } else {
        currentSprite = thingRef.def;
      }
      switch (currentSprite) {
        case "ChunkSandstone":
          sprite.tint = this.SANDSTONE;
          break;
        case "ChunkGranite":
          sprite.tint = this.GRANITE;
          break;
        case "ChunkSlate":
          sprite.tint = this.SLATE;
          break;
        case "ChunkLimestone":
          sprite.tint = this.LIMESTONE;
          break;
        case "ChunkMarble":
          sprite.tint = this.MARBLE;
          break;
        case "BlocksSandstone":
          sprite.tint = this.SANDSTONE;
          break;
        case "BlocksGranite":
          sprite.tint = this.GRANITE;
          break;
        case "BlocksSlate":
          sprite.tint = this.SLATE;
          break;
        case "BlocksLimestone":
          sprite.tint = this.LIMESTONE;
          break;
        case "BlocksMarble":
          sprite.tint = this.MARBLE;
          break;
        case "WoodLog":
          sprite.tint = 0xBF6C2A;
          break;
        case "Cloth":
          sprite.tint = this.CLOTH;
          break;
        case "WoolMuffalo":
        case "Muffalo_Leather":
          sprite.tint = this.MUFFALO;
          break;
        case "WoolAlpaca":
        case "Alpaca_Leather":
          sprite.tint = this.ALPACA;
          break;

        case "DevilstrandCloth":
          sprite.tint = this.DEVILSTRAND;
          break;
        case "Alphabeaver_Leather":
          sprite.tint = this.ALPHABEAVER;
          break;
        case "FoxArctic_Leather":
          sprite.tint = this.FOXARCTIC;
          break;
        case "WolfArctic_Leather":
          sprite.tint = this.WOLFARCTIC;
          break;
        case "Boomalope_Leather":
          sprite.tint = this.BOOMALOPE;
          break;
        case "Boomrat_Leather":
          sprite.tint = this.BOOMRAT;
          break;
        case "Capybara_Leather":
          sprite.tint = this.CAPYBARA;
          break;
        case "Caribou_Leather":
          sprite.tint = this.CARIBOU;
          break;
        case "WoolCamel":
        case "Camel_Leather":
          sprite.tint = this.CAMEL;
          break;
        case "Cassowary_Leather":
          sprite.tint = this.CASSOWARY;
          break;
        case "Cat_Leather":
          sprite.tint = this.CAT;
          break;
        case "Chicken_Leather":
          sprite.tint = this.CHICKEN;
          break;
        case "Chinchilla_Leather":
          sprite.tint = this.CHINCHILLA;
          break;
        case "Cobra_Leather":
          sprite.tint = this.ALPACA;
          break;
        case "Cougar_Leather":
          sprite.tint = this.COUGAR;
          break;
        case "Cow_Leather":
          sprite.tint = this.COW;
          break;
        case "Deer_Leather":
          sprite.tint = this.DEER;
          break;
        case "Dromedary_Leather":
          sprite.tint = this.DROMEDARY;
          break;
        case "Elephant_Leather":
          sprite.tint = this.ELEPHANT;
          break;
        case "Elk_Leather":
          sprite.tint = this.ELK;
          break;
        case "Emu_Leather":
          sprite.tint = this.EMU;
          break;
        case "FoxFennec_Leather":
          sprite.tint = this.FOXFENNEC;
          break;
        case "Gazelle_Leather":
          sprite.tint = this.GAZELLE;
          break;
        case "GrizzlyBear_Leather":
          sprite.tint = this.GRIZZLYBEAR;
          break;
        case "Hare_Leather":
          sprite.tint = this.HARE;
          break;
        case "Husky_Leather":
          sprite.tint = this.HUSKY;
          break;
        case "Ibex_Leather":
          sprite.tint = this.IBEX;
          break;
        case "Iguana_Leather":
          sprite.tint = this.IGUANA;
          break;
        case "LabradorRetriever_Leather":
          sprite.tint = this.LABRADORRETRIEVER;
          break;
        case "Lynx_Leather":
          sprite.tint = this.LYNX;
          break;
        case "WoolMegasloth":
        case "Megasloth_Leather":
          sprite.tint = this.MEGASLOTH;
          break;
        case "Monkey_Leather":
          sprite.tint = this.MONKEY;
          break;
        case "Ostrich_Leather":
          sprite.tint = this.OSTRICH;
          break;
        case "Panther_Leather":
          sprite.tint = this.PANTHER;
          break;
        case "Pig_Leather":
          sprite.tint = this.PIG;
          break;
        case "PolarBear_Leather":
          sprite.tint = this.POLARBEAR;
          break;
        case "Raccoon_Leather":
          sprite.tint = this.RACCOON;
          break;
        case "Rat_Leather":
          sprite.tint = this.RAT;
          break;
        case "FoxRed_Leather":
          sprite.tint = this.FOXRED;
          break;
        case "Rhinoceros_Leather":
          sprite.tint = this.RHINOCEROS;
          break;
        case "Snowhare_Leather":
          sprite.tint = this.SNOWHARE;
          break;
        case "Squirrel_Leather":
          sprite.tint = this.SQUIRREL;
          break;
        case "WolfTimber_Leather":
          sprite.tint = this.WOLFTIMBER;
          break;
        case "Tortoise_Leather":
          sprite.tint = this.TORTOISE;
          break;
        case "Turkey_Leather":
          sprite.tint = this.TURKEY;
          break;
        case "Warg_Leather":
          sprite.tint = this.WARG;
          break;
        case "WildBoar_Leather":
          sprite.tint = this.WILDBOAR;
          break;
        case "YorkshireTerrier_Leather":
          sprite.tint = this.YORKSHIRETERRIER;
          break;
        case "Human_Leather":
          sprite.tint = this.HUMAN;
          break;
        case "Steel":
          sprite.tint = this.STEEL;
          break;
        case "Plasteel":
          sprite.tint = this.PLASTEEL;
          break;
        case "Jade":
          sprite.tint = this.JADE;
          break;
        case "Gold":
          sprite.tint = this.GOLD;
          break;
        case "Silver":
          sprite.tint = this.SILVER;
          break;
        case "Uruianum":
          sprite.tint = this.URANIUM;
          break;
        case "StandingLamp_Red":
          sprite.tint = 0xFF0000;
          break;
        case "StandingLamp_Blue":
          sprite.tint = 0x0000FF;
          break;
        case "StandingLamp_Green":
          sprite.tint = 0x00FF00;
          break;
        default:
          //thingSprite.tint = 0xffffff;
      }
    }

    return sprite;
  }

  getStuffName(stuff) {
    let regex = new RegExp('\_(.*)');
    let preRegex = new RegExp('(.*)\_');
    let filterName = null;
    if (regex.exec(stuff)) {
      if (preRegex.exec(stuff)[1] == "Shell" ||
        preRegex.exec(stuff)[1] == "TrapIED") {
        filterName = stuff;
      } else if (preRegex.exec(stuff)[1] == "Plant") { //VERSION 0.19
        filterName = preRegex.exec(stuff)[1] + regex.exec(stuff)[1];
      } else {
        filterName = regex.exec(stuff)[1];
      }
    } else {
      filterName = stuff;
    }
    return filterName;

  }
  matchWall(chunk) {

    let direction = 0;

    let single = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ];
    let straightN = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0]
    ];
    let straightE = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 0]
    ];
    let straightS = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 0]
    ];
    let straightW = [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0]
    ];
    let cross = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ];
    let straightV = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ];
    let straightH = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
    let teeN = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
    let teeE = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ];
    let teeS = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ];
    let teeW = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ];
    let lN = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ];
    let lE = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 0]
    ];
    let lS = [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ];
    let lW = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 0]
    ];

    if (this.matchArrays(straightH, chunk)) {
      direction = 6;
    } else if (this.matchArrays(straightV, chunk)) {
      direction = 9;
    } else if (this.matchArrays(straightN, chunk)) {
      direction = 13;
    } else if (this.matchArrays(straightE, chunk)) {
      direction = 14;
    } else if (this.matchArrays(straightS, chunk)) {
      direction = 8;
    } else if (this.matchArrays(straightW, chunk)) {
      direction = 4;
    } else if (this.matchArrays(cross, chunk)) {
      direction = 3;
      //direction = null;
    } else if (this.matchArrays(teeN, chunk)) {
      direction = 7;
    } else if (this.matchArrays(teeE, chunk)) {
      direction = 11;
    } else if (this.matchArrays(teeS, chunk)) {
      direction = 2;
    } else if (this.matchArrays(teeW, chunk)) {
      direction = 1;
    } else if (this.matchArrays(lN, chunk)) {
      direction = 15;
    } else if (this.matchArrays(lE, chunk)) {
      direction = 10;
    } else if (this.matchArrays(lS, chunk)) {
      direction = 0;
    } else if (this.matchArrays(lW, chunk)) {
      direction = 5;
    } else if (this.matchArrays(single, chunk)) {
      direction = 12;
    } else {
      //  console.log(chunk);
    }
    return direction;
  }
  thingAlign(sprite, data) {

    let outputSprite = sprite;
    //TODO 4x1 megaScreen

    //1X1
    if (outputSprite.height == this.TILESIZE && outputSprite.width == this.TILESIZE) {
      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.angle = 90;
          outputSprite.anchor.setTo(1, 1);
        }
        if (data.rot == 2) {
          outputSprite.angle = 180;
          outputSprite.anchor.setTo(1, 0);
        }
        if (data.rot == 3) {
          outputSprite.angle = -90;
          outputSprite.anchor.setTo(0, 0);
        }
      }
    //2X1
    } else if (outputSprite.height == (this.TILESIZE * 2) &&
      outputSprite.width == this.TILESIZE) { //

      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.angle = 90;
          outputSprite.anchor.setTo(1, 1);
        }
        if (data.rot == 2) {
          outputSprite.angle = 180; //ok
          outputSprite.anchor.setTo(1, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.angle = -90;
          outputSprite.anchor.setTo(0, 0.5);
        }
      }
    //1X4
    } else if (outputSprite.height == (this.TILESIZE * 4) &&
      outputSprite.width == this.TILESIZE) { //

      outputSprite.anchor.setTo(0, 0.75);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.angle = 90;
          outputSprite.anchor.setTo(1, 0.75);
        }
        if (data.rot == 2) {
          outputSprite.angle = 180; //ok
          outputSprite.anchor.setTo(1, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.angle = -90;
          outputSprite.anchor.setTo(0, 0.5);
        }
      }
    //1x2
    } else if (outputSprite.height == this.TILESIZE &&
      outputSprite.width == (this.TILESIZE * 2)) {
      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.angle = 90;
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.angle = 180;
          outputSprite.anchor.setTo(0.5, 0);
        }
        if (data.rot == 3) {
          outputSprite.angle = -90; //good
          outputSprite.anchor.setTo(0, 0);
        }
      }
    //2x4
    } else if (outputSprite.height == (this.TILESIZE * 2) &&
      outputSprite.width == (this.TILESIZE * 4)) {
      outputSprite.anchor.setTo(0.4, 0.75);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.angle = 90;
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.angle = 180;
          outputSprite.anchor.setTo(0.6, 0.6);
        }
        if (data.rot == 3) {
          outputSprite.angle = -90; //good
          outputSprite.anchor.setTo(1, 0.5);
        }
      }
    //2x2
    } else if (outputSprite.height == (this.TILESIZE * 2) &&
      outputSprite.width == (this.TILESIZE * 2)) {

      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.angle = 90;
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.angle = 180;
          outputSprite.anchor.setTo(0.5, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.angle = -90; //good
          outputSprite.anchor.setTo(0, 0.5);
        }
      }
    //3x3
    } else if (outputSprite.height == (this.TILESIZE * 3) &&
      outputSprite.width == (this.TILESIZE * 3)) {
      outputSprite.anchor.setTo(0.35, 0.65);

      if (data.rot == 1) {
        outputSprite.anchor.setTo(0.5, 0.5);
        outputSprite.angle = 90;
      }
      if (data.rot == 2) {
        outputSprite.anchor.setTo(0.65, 0.35);
        outputSprite.angle = 180;
      }
      if (data.rot == 3) {
        outputSprite.anchor.setTo(0.5, 0.5);
        outputSprite.angle = -90; //good
      }
    //1x3
    } else if (outputSprite.height == this.TILESIZE &&
      outputSprite.width == (this.TILESIZE * 3)) {
      outputSprite.anchor.setTo(0.4, 1);
      if (data.rot == 1) {
        outputSprite.angle = 90;
        outputSprite.anchor.setTo(0.6, 1);
      }
      if (data.rot == 2) {
        outputSprite.angle = 180;
        outputSprite.anchor.setTo(0.6, 0);
      }
      if (data.rot == 3) {
        outputSprite.angle = -90; //good
        outputSprite.anchor.setTo(0.3, 0);
      }
    //4x4
    } else if (outputSprite.height == (this.TILESIZE * 4) &&
      outputSprite.width == (this.TILESIZE * 4)) {
      if (!data.rot) {
        outputSprite.anchor.setTo(0.25, 0.75);
      }
      if (data.rot == 1) {
        outputSprite.anchor.setTo(0.5, 0.75);
        outputSprite.angle = 90;
      }
      if (data.rot == 2) {
        outputSprite.anchor.setTo(0.5, 0.5);
        outputSprite.angle = 180;
      }
      if (data.rot == 3) {
        outputSprite.anchor.setTo(0.75, 0.25);
        outputSprite.angle = -90; //good
      }
    //8x8
    } else if (outputSprite.height == (this.TILESIZE * 8) &&
      outputSprite.width == (this.TILESIZE * 8)) {
      outputSprite.anchor.setTo(0.4, 0.65);
      //2x5
    } else if (outputSprite.height == (this.TILESIZE * 2) &&
      outputSprite.width == (this.TILESIZE * 5)) {
      outputSprite.anchor.setTo(0.4, 0);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.angle = 90;
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.angle = 180;
          outputSprite.anchor.setTo(0.6, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.angle = -90; //good
          outputSprite.anchor.setTo(1, 0.5);
        }
      }
    //1x4
    }else if (outputSprite.height == this.TILESIZE &&
      outputSprite.width == (this.TILESIZE * 4)) {
      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.angle = 90;
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.angle = 180;
          outputSprite.anchor.setTo(0.5, 0);
        }
        if (data.rot == 3) {
          outputSprite.angle = -90; //good
          outputSprite.anchor.setTo(0, 0);
        }
      }
    } else {
      outputSprite.anchor.setTo(0, 1);
    }
    return outputSprite;
  }
  matchArrays(a, b) {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (a[i][j] != b[i][j]) {
          return false
        }
      }
    }
    return true;
  }

  //Is this stuff allowed? Return true
  //Used so we dont render stuff like dirt and pawns
  isAllowedStuff(stuff) {

    let preRegex = new RegExp('(.*)\_')

    if (preRegex.exec(stuff)) { //0.19 Change everyhing to Filth_xxx
      if (preRegex.exec(stuff)[1] == "Filth")
        return false;
    }

    switch (stuff) {
      case "Filth":
      case "FilthDirt":
      case "FilthBlood":
      case "FilthAnimalFilth":
      case "FilthAsh":
      case "FilthCorpseBile":
      case "FilthVomit":
      case "FilthAmnioticFluid":
      case "FilthSlime":
      case "FilthBloodInsect":
      case "FilthFireFoam":
      case "FilthSand":
      case "Blight":
      case "Human":
      case "PowerConduit":
      case "SandbagRubble":
      case "Corpse_Leather":
      case "Centipede_Corpse":
      case "Scyther_Corpse":
      case "Corpse":
      case "Frame":
      case "Letter":
      case "Short":
      case "Blueprint":
      case "Blueprint_Install":
      case "RectTrigger":
      case "RockRubble":
      case "RubbleRock":
      case "BuildingRubble":
      case "SlagRubble":
      case "Centipede":
      case "Scyther":
      case "ActiveDropPod":
      case "Fire":
      case "Spark":
        return false;
        break;
      default:
        return true
    }
  }

  isAnimal(stuff) {
    switch (stuff) {
      case "Alpaca":
      case "Alphabeaver":
      case "FoxArctic":
      case "WolfArctic":
      case "Boomalope":
      case "Boomrat":
      case "Capybara":
      case "Caribou":
      case "Cassowary":
      case "Cat":
      case "Chicken":
      case "Chinchilla":
      case "Cobra":
      case "Cougar":
      case "Cow":
      case "Deer":
      case "Dromedary":
      case "Elephant":
      case "Elk":
      case "Emu":
      case "FoxFennec":
      case "Gazelle":
      case "GrizzlyBear":
      case "Hare":
      case "Husky":
      case "Ibex":
      case "Iguana":
      case "LabradorRetriever":
      case "Lynx":
      case "Megascarab":
      case "Megasloth":
      case "Megaspider":
      case "Monkey":
      case "Muffalo":
      case "Ostrich":
      case "Panther":
      case "Pig":
      case "PolarBear":
      case "Raccoon":
      case "Rat":
      case "FoxRed":
      case "Rhinoceros":
      case "Snowhare":
      case "Spelopede":
      case "Squirrel":
      case "Thrumbo":
      case "WolfTimber":
      case "Tortoise":
      case "Turkey":
      case "Warg":
      case "WildBoar":
      case "YorkshireTerrier":
      case "Grizzly":
      case "Timber":

        return false;
        break;
      default:
        return true;
    }
  }

  makeCSV(iArray) {

    let outputCSV = '';
    let dataArray = this.formatArray(iArray);

    for (let y = 0; y < this.worldSize.y; y++) {
      for (let x = 0; x < this.worldSize.x; x++) {
        //this.game.rnd.between(0, 64).toString();
        if (dataArray[y][x] == undefined) {
          console.log('No data @ ' + ' ' + y + ' ' + x);
        }
        if (dataArray[y][x] != undefined) {
          outputCSV += dataArray[y][x];
        }
        if (x < (this.worldSize.x) - 1) {
          outputCSV += ',';
        }
      }
      if (y < this.worldSize.y - 1) {
        outputCSV += "\n";
      }
    }
    return outputCSV;

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
          case 140: //deep water //DEEPOCEANWATER MISSING!!!!
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
            iArray[i] = 40;
            break;
          case 56: //rough sandstone
            iArray[i] = 41;
            break;
          case 246: // rough hewn sandstone
            iArray[i] = 42;
            break;
          case 154: //smooth sandstone
            iArray[i] = 43;
            break;
          case 222: // rough granite
            iArray[i] = 44;
            break;
          case 116: // rough hewn granite
            iArray[i] = 45;
            break;
          case 199: //smooth granite
            iArray[i] = 46;
            break;
          case 99: //rough limestone
            iArray[i] = 47;
            break;
          case 82: // rought hewn limestone
            iArray[i] = 48;
            break;
          case 238: //smooth limestone
            iArray[i] = 49;
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
          case 21: //Moving river water?
            iArray[i] = 38;
            break;
          case 71: //Bridge
            iArray[i] = 3;
            break;
            //TODO SOFTSAND
          default:
            console.log(iArray[i]);
            iArray[i] = 1000;
        }
        iArray[i] = iArray[i] -= 1; //fix for index offset
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

    this.currentTile = {
      "terrainTile": null,
      "resourceTile": null,
      "deepResourceTile": null,
      "stuffTile": null, //count manage
      "totalHealth": 0,
      "currentHealth": 0
    };

    let x = this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel); // 4 * ZOOM
    let y = this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel);
    let flippedY = Math.abs(y - this.worldSize.y);

    let terrainTile = this.topTerrainGridLayer.map.getTile(x, y, this.topTerrainGridLayer);
    let stuffTile = null;
    let resourceTile = null;
    let deepResourceTile = null;

    if (x >= 0 && x <= this.worldSize.x &&
      y >= 0 && y <= this.worldSize.y) {
      stuffTile = this.mapInfo.stuffRefGrid[x][flippedY - 1];
      resourceTile = this.mapInfo.resourceRefGrid[(flippedY - 1) * this.worldSize.y + x];
      deepResourceTile = this.mapInfo.deepResourceGrid[(flippedY - 1) * this.worldSize.y + x];
    }

    if (terrainTile) {
      this.currentTile.terrainTile = this.getTerrainName(terrainTile.index + 1) + " - " + (terrainTile.index + 1);
    }
    if (stuffTile) {
      this.oldStuffTile = stuffTile;

      if (stuffTile[0]) {
        console.log(stuffTile);

        //Sanitze stuffTile to removed notAllowed Items
        for (let i = 0; i < stuffTile.length; i++) {
          if (this.isAllowedStuff(this.getStuffName(stuffTile[i].def)) == false) {
            let index = stuffTile.indexOf(i);
            stuffTile.splice(index, 1);
            this.clickIndex++;
          }
        }
        this.clickDepth = stuffTile.length;

        if (stuffTile != this.oldStuffTile) {
          this.clickIndex = 0;
        } else if (this.clickIndex < this.clickDepth - 1) {
          this.clickIndex++;
        } else {
          this.clickIndex = 0;
        }
        if (stuffTile[this.clickIndex]) {
          let stuffMaterial = stuffTile[this.clickIndex].stuff;
          let stuffName = stuffTile[this.clickIndex].def;
          let stuffHealth = stuffTile[this.clickIndex].health;
          let stuffStack = stuffTile[this.clickIndex].stackCount;
          this.currentTile.stuffTile = ((stuffMaterial) ? stuffMaterial + " " : "") + stuffName + ((stuffStack) ? " x" + stuffStack : "") + ((stuffHealth) ? " (" + stuffHealth + " HP)" : "");
        }

      }
    }
    if (resourceTile) {
      this.currentTile.resourceTile = this.getResourceName(resourceTile) + " - " + resourceTile;
    }
    if (deepResourceTile) {
      this.currentTile.deepResourceTile = this.getDeepResourceName(deepResourceTile) + " x" + this.mapInfo.deepResourceCount[(flippedY - 1) * this.worldSize.y + x] + " - " + deepResourceTile;
    }

  }

  getTerrainName(id) {
    let output = null;
    switch (id) {
      case 1: //Concrete
        output = "Concrete";
        break;
      case 2: //Paved
        output = "Paved";
        break;
      case 3: //Wood
        output = "Wood Floor";
        break;
      case 4: //metal //IF UNDER
        output = "Metal";
        break;
      case 5: //silver //IF UNDER
        output = "Silver";
        break;
      case 6: //gold  //IF UNDER
        output = "Gold";
        break;
      case 7: //sterile //If under
        output = "Sterile";
        break;
      case 8: //red
        output = "Red Carpet";
        break;
      case 9: //green
        output = "Green Carpet";
        break;
      case 10: //blue
        output = "Blue Carpet";
        break;
      case 11: //cream
        output = "Cream Carpet";
        break;
      case 12: //dark
        output = "Dark Carpet";
        break;
      case 13: //burned wood
        output = "Burned Wood Floor";
        break;
      case 14: //burned carpet
        output = "Burned Carpet";
        break;
      case 15: //sandstone tile
        output = "Sandstone Tile";
        break;
      case 16: //granite tile
        output = "Granite Tile";
        break;
      case 17: //limestone tile
        output = "Limestone Tile";
        break;
      case 18: //slate tile
        output = "Slate Tile";
        break;
      case 19: //Marble tile
        output = "Marble Tile";
        break;
      case 20: //slate flag
        output = "Slate Flagstone";
        break;
      case 21: //sandstone flag
        output = "Sandstone Flagstone";
        break;
      case 22: //granite flag
        output = "Granite Flagstone";
        break;
      case 23: //limestone flag
        output = "Limestone Flagstone";
        break;
      case 24: //marble flagstone
        output = "Marble Flagstone";
        break;
      case 25: //sand
        output = "Sand";
        break;
      case 26: //soil
        output = "Soil";
        break;
      case 27: //marshy soil
        output = "Marshy Soil";
        break;
      case 28: // rich soil
        output = "Rich Soil";
        break;
      case 29: //mud
        output = "Mud";
        break;
      case 30: //marsh
        output = "Marsh";
        break;
      case 31: //gravel
        output = "Gravel";
        break;
      case 32: //lichen covered
        output = "Lichen Covered Dirt";
        break;
      case 33: //ice
        output = "Ice";
        break;
      case 34: //broken asphalt
        output = "Broken Asphalt";
        break;
      case 35: // packed dirt
        output = "Packed Dirt";
        break;
      case 36: //underwall
        output = "Underwall";
        break;
      case 37: //deep water
        output = "Deep Water";
        break;
      case 38: //moving deep water
        output = "Moving Deep Water";
        break;
      case 39: //shallow water
        output = "Shallow Water";
        break;
      case 40: //shallow ocean
        output = "Shallow Ocean";
        break;
      case 40: //shallow moving water
        output = "Shallow Moving Water";
        break;
      case 41: //rough sandstone
        output = "Rough Sandstone";
        break;
      case 42: // rough hewn sandstone
        output = "Rough Hewn Sandstone";
        break;
      case 43: //smooth sandstone
        output = "Smooth Sandstone";
        break;
      case 44: // rough granite
        output = "Rough Granite";
        break;
      case 45: // rough hewn granite
        output = "Rough Hewn Granite";
        break;
      case 46: //smooth granite
        output = "Smooth Granite";
        break;
      case 47: //rough limestone
        output = "Rough Limestone";
        break;
      case 48: // rought hewn limestone
        output = "Rough Hewn Limestone";
        break;
      case 49: //smooth limestone
        output = "Smooth Limestone";
        break;
      case 50: //rough slate
        output = "Rough Slate";
        break;
      case 51: //rough hewn slate
        output = "Rough Hewn Slate";
        break;
      case 52: //smooth slate
        output = "Smooth Slate";
        break;
      case 53: //rough marble
        output = "Rough Marble";
        break;
      case 54: //rough hewn marble
        output = "Rough Hewn Marble";
        break;
      case 55: //smooth marble
        output = "Smooth Marble";
        break;
      default:
        output = id + " - no tile found";
    }
    return output;
  }

  getResourceName(id) {
    let output = null;
    switch (id) {

      case 138: //Limestone
        output = "Limestone";
        break;
      case 84: //Granite
        output = "Granite";
        break;
      case 212: //Marble
        output = "Marble";
        break;
      case 67: //Sandstonerock
        output = "Sandstone";
        break;
      case 197: //Slate
        output = "Slate";
        break;

      case 17: //Plasteel
        output = "Plasteel";
        break;

      case 56: //compactsteel
        output = "Compacted Machinery";
        break;

      case 156: //Steel
        output = "Steel";
        break;

      case 103: //Uranium
        output = "Uranium";
        break;

      case 194: // Sliver
        output = "Sliver";
        break;

      case 229: //Gold
        output = "Gold";
        break;

      case 127: // Jade
        output = "Jade";
        break;

      case 102: //Slate
        output = "Slate Chunk";
        break;
      case 78: // Marble
        output = "Marble Chunk";
        break;
      case 119: // Limestone
        output = "Limestone Chunk";
        break;
      case 252: // Granite
        output = "Granite Chunk";
        break;
      case 47: // Sandstone
        output = "Sandstone Chunk";
        break;
      case 241: // Metal Chunk
        output = "Metal Chunk";
        break;

      default:
        output = null;
    }
    return output;
  }

  getDeepResourceName(id) {
    let output = null;
    switch (id) {

      case 251: //Steel
        output = "Steel";
        break;
      case 97: // Fuel
        output = "Chemfuel";
        break;
      case 160: //Uruianum
        output = "Uruianum";
        break;
      case 243: //plasteel
        output = "Plasteel";
        break;
      case 125: //Gold
        output = "Gold";
        break;
      case 22: //Jade
        output = "Jade";
        break;
      case 80: //Silver
        output = "Silver";
        break;
      default:
        output = null;
    }
    return output;
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
    //Split out into an array
    formattedSize = formattedSize.split(",");
    //Loop through the array to make it all ints
    for (let i = 0; i < formattedSize.length; i++) {
      formattedSize[i] = parseInt(formattedSize[i]);
    }
    return formattedSize;
  }
  getColor(raw) {
    //Remove the () + comma seperate the x y z
    let formattedSize = raw.replace(/[RGBA(-)]/g, '');
    //Split out into an array
    formattedSize = formattedSize.split(",");
    //Loop through the array to make it all ints
    for (let i = 0; i < formattedSize.length; i++) {
      let byte = Math.floor(formattedSize[i] >= 1.0 ? 255 : formattedSize[i] * 256.0)
      formattedSize[i] = byte;
    }
    return formattedSize;
  }
  isMouseOut(){
    if(this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) >= 0 &&
      this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) < this.worldSize.x &&
      this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) >= 0 &&
      this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) < this.worldSize.y){
        return true;
      }else{
        return false;
      }
  }
}
export default GameState;
