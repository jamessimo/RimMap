import Utils from 'utils/Utils';

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

    this.utils = new Utils(this.game);

    if (this.game.hd == false) {
      this.zoomLevel = 0.5;
      this.zoomRate = 0.5;
      this.minZoom = 0.5;
      this.maxZoom = 2;
    } else {
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
      this.snowGridLayer =
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
    this.scrollZoomRate = 1024 * this.utils.SCALESIZE;
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

        for (let i = 0; i < this.worldSize.x; i++) {
          if (!this.rockGrid[i]) {
            this.rockGrid[i] = [];
          }
          for (let j = 0; j < this.worldSize.y; j++) {
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

        this.worldScale = 1;

        //for scrolling
        this.groupScale = this.stuffLayer.scale.x;

        this.scaleMap(this.groupScale);

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

        this.game.input.mouseWheel.callback = (event) => {
          let wheelDelt = this.game.input.mouseWheel.delta;

          if (wheelDelt < 0) {

            if(this.mapSizeCurrent > this.mapSizeMax){
              this.mapSizeCurrent -= this.scrollZoomRate;
            }else{
              this.mapSizeCurrent -= this.scrollZoomRate;
              this.mapSizeCurrent = Phaser.Math.clamp(this.mapSizeCurrent, this.SCREENWIDTH*2, this.mapSizeMax);
            }
          } else {
            if(this.mapSizeCurrent < this.mapSizeMax){
              this.mapSizeCurrent += this.scrollZoomRate;
              this.mapSizeCurrent = Phaser.Math.clamp(this.mapSizeCurrent, this.SCREENWIDTH*2, this.mapSizeMax);
            }else if(this.mapSizeCurrent < this.mapSizeMax*2){
              this.mapSizeCurrent += this.scrollZoomRate;
            }
          }

          this.worldScale = (this.mapSizeCurrent / this.mapSizeMax);

          this.rescalefactorx = this.mapInfo.width / (this.mapInfo.width * this.groupScale); // multiply by rescalefactor to get original world value
          this.rescalefactory = this.mapInfo.height / (this.mapInfo.height * this.groupScale);

          this.prevScale.x = this.groupScale;
          this.prevScale.y = this.groupScale;

          this.nextScale.x = this.prevScale.x + (this.worldScale - this.groupScale);
          this.nextScale.y = this.prevScale.y + (this.worldScale - this.groupScale);

          let xAdjust = (this.zoompoint.x - this.game.camera.x) * (this.nextScale.x - this.prevScale.x);
          let yAdjust = (this.zoompoint.y - this.game.camera.y) * (this.nextScale.y - this.prevScale.y);

          //Only move screen if we're not the same scale
          if (this.prevScale.x != this.nextScale.x || this.prevScale.y != this.nextScale.y) {

            let scaleAdjustX = this.nextScale.x / this.prevScale.x;
            let scaleAdjustY = this.nextScale.y / this.prevScale.y;
            let focusX = (this.game.camera.x * scaleAdjustX) + xAdjust * (this.rescalefactorx);
            let focusY = (this.game.camera.y * scaleAdjustY) + yAdjust * (this.rescalefactory);

            this.game.camera.x = focusX;
            this.game.camera.y = focusY;

          }

          //now actually scale the stage
          this.groupScale += (this.worldScale - this.groupScale); //easing
          this.scaleMap(this.groupScale);
        };


        this.currentBounds = new Phaser.Rectangle(-this.mapInfo.width * 2, -this.mapInfo.height * 2, this.mapInfo.width * 4, this.mapInfo.height * 4);

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
          this.game.camera.x += (this.utils.TILESIZE / this.zoomLevel);
        }
        if (this.game.input.mousePointer.x < 0 + this.MOUSEBOUNDS) {
          this.game.camera.x -= (this.utils.TILESIZE / this.zoomLevel);
        }
        if (this.game.input.mousePointer.y > this.SCREENHEIGHT - this.MOUSEBOUNDS) {
          this.game.camera.y += (this.utils.TILESIZE / this.zoomLevel);
        }
        if (this.game.input.mousePointer.y < 0 + this.MOUSEBOUNDS) {
          this.game.camera.y -= (this.utils.TILESIZE / this.zoomLevel);
        }
        if (this.cursors.up.isDown) {
          this.game.camera.y -= (this.utils.TILESIZE / this.zoomLevel);
        } else if (this.cursors.down.isDown) {
          this.game.camera.y += (this.utils.TILESIZE / this.zoomLevel);
        }
        if (this.cursors.left.isDown) {
          this.game.camera.x -= (this.utils.TILESIZE / this.zoomLevel);
        } else if (this.cursors.right.isDown) {
          this.game.camera.x += (this.utils.TILESIZE / this.zoomLevel);
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

          this.zoompoint.x = this.game.input.mousePointer.worldX;
          this.zoompoint.y = this.game.input.mousePointer.worldY;

          this.marker.x = this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) * this.utils.TILESIZE / this.zoomLevel;
          this.marker.y = this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) * this.utils.TILESIZE / this.zoomLevel;
        }
        this.oldcamera = null;
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

    let sizes = this.utils.getPosition(rawSizes);

    this.worldSize.x = sizes[0];
    this.worldSize.y = sizes[2];
    this.worldSize.z = sizes[1];

    this.utils.worldSize = this.worldSize;

    this.loadingDelta = 1;

    this.mapInfo.width = this.utils.TILESIZE * this.worldSize.x;
    this.mapInfo.height = this.utils.TILESIZE * this.worldSize.y;

    this.mapInfo.topTerrainGrid = this.utils.decompress(json.savegame.game.maps.li.terrainGrid.topGridDeflate);
    this.mapInfo.underTerrainGrid = this.utils.decompress(json.savegame.game.maps.li.terrainGrid.underGridDeflate);
    //this.mapInfo.roofTerrainGrid = this.utils.decompress(json.savegame.game.maps.li.roofGrid);
    this.mapInfo.resourceRefGrid = this.utils.decompress(json.savegame.game.maps.li.compressedThingMapDeflate);

    this.mapInfo.deepResourceGrid = this.utils.decompress(json.savegame.game.maps.li.deepResourceGrid.defGridDeflate);
    this.mapInfo.deepResourceCount = this.utils.decompress(json.savegame.game.maps.li.deepResourceGrid.countGridDeflate);

    this.mapInfo.topTerrainGrid = this.utils.mapTextures(this.mapInfo.topTerrainGrid, "terrain", this.mapInfo.underTerrainGrid);
    this.mapInfo.stuffGrid = json.savegame.game.maps.li.things.thing;

    //this.mapInfo.snowGridLayer = this.utils.decompress(json.savegame.game.maps.li.snowGrid.depthGridDeflate);
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

        bmd.baseTexture.resolution = 0.5;
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

    this.game.cache.addTilemap('dynamicMap', null, this.utils.makeCSV(this.mapInfo.topTerrainGrid), Phaser.Tilemap.CSV);
    let tileMap = this.game.add.tilemap('dynamicMap', this.utils.TILESIZE, this.utils.TILESIZE);
    tileMap.addTilesetImage('tiles', 'tiles', this.utils.TILESIZE, this.utils.TILESIZE);
    //  0 is important
    this.topTerrainGridLayer = tileMap.createLayer(0);
    this.topTerrainGridLayer.smoothed = false;
    this.topTerrainGridLayer.resizeWorld();
  }
  renderStuff() {

    let thingPos = null;
    let thingSprite = null;
    let rockUnderSprite = null;
    let filterName = null;

    for (let i = this.mapInfo.stuffGrid.length - 1; i > 0; i--) {

      filterName = this.utils.getStuffName(this.mapInfo.stuffGrid[i].def);
      thingPos = this.utils.getPosition(this.mapInfo.stuffGrid[i].pos);

      //First check if the stuff is a damged rock if so add it to rocks and discard
      //Second check if its not a wall, sandbag, animal or anything undesiraable
      if (this.utils.isResource(this.mapInfo.stuffGrid[i].def)) {
        this.rockGrid[thingPos[2]][thingPos[0]] = 1;
        let mappedResource = 0;
        switch (this.mapInfo.stuffGrid[i].def) {
          case "Limestone":
            mappedResource = 138;
            break;
          case "Granite":
            mappedResource = 84;
            break;
          case "Marble":
            mappedResource = 212;
            break;
          case "Sandstone":
            mappedResource = 67;
            break;
          case "Slate":
            mappedResource = 197;
            break;
          case "MineableComponents":
          case "MineableComponentsIndustrial":
            mappedResource = 56;
            break;
          case "MineableGold":
            mappedResource = 229;
            break;
          case "MineableUranium":
            mappedResource = 103;
            break;
          case "MineableSteel":
            mappedResource = 156;
            break;
          case "MineableJade":
            mappedResource = 127;
            break;
          case "MineableSilver":
            mappedResource = 194;
            break;
        }

        this.mapInfo.resourceRefGrid[(thingPos[2] * this.worldSize.y) + thingPos[0]] = mappedResource

      } else if (
        this.mapInfo.stuffGrid[i].def != "Sandbags" &&
        !this.utils.isWall(this.mapInfo.stuffGrid[i].def) &&
        this.utils.isAllowedStuff(filterName) &&
        this.utils.isAnimal(filterName)) {

        thingSprite = this.game.add.sprite(
          (thingPos[0] * this.utils.TILESIZE), -(thingPos[2] * this.utils.TILESIZE),
          filterName
        );

        if (this.mapInfo.stuffGrid[i].def != "WoodLog" && //Dont color sprites that are pre-colored
          this.mapInfo.stuffGrid[i].def != "Steel" &&
          this.mapInfo.stuffGrid[i].def != "Plasteel" &&
          this.mapInfo.stuffGrid[i].def != "Jade" &&
          this.mapInfo.stuffGrid[i].def != "Silver" &&
          this.mapInfo.stuffGrid[i].def != "Gold") {

          thingSprite = this.utils.colorSprite(thingSprite, this.mapInfo.stuffGrid[i]);
          //x_Meat does not change color depending on animal so just color it all
          if (filterName == "Meat") {
            thingSprite.tint = this.utils.MEAT;
          }
        }

        //Rotate the thing correctly
        thingSprite.scale.setTo(this.utils.SCALESIZE);
        thingSprite = this.utils.thingAlign(thingSprite, this.mapInfo.stuffGrid[i]);
        if (this.mapInfo.stuffGrid[i].growth) {
          if (this.mapInfo.stuffGrid[i].growth <= 0.1) {
            thingSprite.destroy();
          } else {
            thingSprite.scale.setTo(this.mapInfo.stuffGrid[i].growth * (this.utils.SCALESIZE));
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

  renderResourceTileMap() {

    let masterIndex = 0;
    let resourceSprite = null;

    for (let i = 0; i < this.worldSize.x; i++) {
      for (let j = 0; j < this.worldSize.y; j++) {
        if (this.mapInfo.resourceRefGrid[masterIndex] > 0) {

          switch (this.mapInfo.resourceRefGrid[masterIndex]) {

            case 78: //Marble chunk
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.MARBLE;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 119: //Limestone chunk
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.LIMESTONE;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 252: //Granite chunk
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.GRANITE;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 102: //Slate chunk
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.SLATE;
              this.resourceGridLayer.add(resourceSprite);
            case 47: //Sandstone chunk
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'chunk');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.SANDSTONE;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 241: //Metal Chunk
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'slag');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 17: //Plasteel
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.PLASTEEL;
              this.resourceGridLayer.add(resourceSprite);
              break;
              case 93:
            case 56: //compactmach
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.COMPONENTS;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 157:
            case 156: //Steel
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.STEEL;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 103: //Uruianum
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.URANIUM;
              this.resourceGridLayer.add(resourceSprite);
              break;
            case 229: //GOLD
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.GOLD;
              this.resourceGridLayer.add(resourceSprite);
              break;

            case 194: // Sliver
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.SILVER;
              this.resourceGridLayer.add(resourceSprite);
              break;

            case 127: // Jade
              resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
              resourceSprite.scale.setTo(this.utils.SCALESIZE);
              resourceSprite.tint = this.utils.JADE;
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
          deepResourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
          deepResourceSprite.scale.setTo(this.utils.SCALESIZE);
          deepResourceSprite.tint = 0x00ff00;
          this.deepResourceGridLayer.add(deepResourceSprite);
        }
        masterIndex++;
      }
    }
  }
  renderSnowTileMap() {

    let masterIndex = 0;
    let snowSprite = null;
    for (let i = 0; i < this.worldSize.x; i++) {
      for (let j = 0; j < this.worldSize.y; j++) {
        if (this.mapInfo.snowGridLayer[masterIndex] > 0) {

          snowSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
          snowSprite.scale.setTo(this.utils.SCALESIZE);
          snowSprite.tint = 0xffffff;
          this.deepResourceGridLayer.add(snowSprite);
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
      thingPos = this.utils.getPosition(this.mapInfo.stuffGrid[i].pos);
      this.mapInfo.stuffRefGrid[thingPos[0]][thingPos[2]].push(this.mapInfo.stuffGrid[i]);
      if (this.utils.isWall(this.mapInfo.stuffGrid[i].def)) {
        walls[thingPos[0]][thingPos[2]] = 1;
      } else if (this.mapInfo.stuffGrid[i].def == "Sandbags") {
        sandbags[thingPos[0]][thingPos[2]] = 1;
      }
    }

    for (let i = this.mapInfo.stuffGrid.length - 1; i > 0; i--) {
      thingPos = this.utils.getPosition(this.mapInfo.stuffGrid[i].pos);

      if (this.utils.isWall(this.mapInfo.stuffGrid[i].def)) {
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
          default:
            wallStuff = "wallTiles";
        }

        direction = this.utils.matchWall(chunk);
        wallSprite = this.game.add.sprite(
          (thingPos[0] * this.utils.TILESIZE), -(thingPos[2] * this.utils.TILESIZE),
          wallStuff, direction
        );
        if(this.mapInfo.stuffGrid[i].stuff){ //if non-smooth wall (has stuff)
          switch (this.mapInfo.stuffGrid[i].stuff) {
            case "BlocksSandstone":
              wallSprite.tint = this.utils.SANDSTONE;
              break;
            case "BlocksGranite":
              wallSprite.tint = this.utils.GRANITE;
              break;
            case "BlocksSlate":
              wallSprite.tint = this.utils.SLATE;
              break;
            case "BlocksLimestone":
              wallSprite.tint = this.utils.LIMESTONE;
              break;
            case "BlocksMarble":
              wallSprite.tint = this.utils.MARBLE;
              break;
            case "WoodLog":
              wallSprite.tint = this.utils.WOOD;
              break;
            default:
              wallSprite.tint = 0xffffff;
          }
        }else{
          switch (this.mapInfo.stuffGrid[i].def) {
            case "SmoothedSandstone":
              wallSprite.tint = this.utils.SANDSTONE;
              break;
            case "SmoothedGranite":
              wallSprite.tint = this.utils.GRANITE;
              break;
            case "SmoothedSlate":
              wallSprite.tint = this.utils.SLATE;
              break;
            case "SmoothedLimestone":
              wallSprite.tint = this.utils.LIMESTONE;
              break;
            case "SmoothedMarble":
              wallSprite.tint = this.utils.MARBLE;
              break;
            case "Steel":
              wallSprite.tint = this.utils.STEEL;
              break;
            default:
              wallSprite.tint = 0xffffff;
          }
        }

        wallSprite.scale.setTo(this.utils.SCALESIZE);
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
        direction = this.utils.matchWall(chunk);
        sandbagSprite = this.game.add.sprite(
          (thingPos[0] * this.utils.TILESIZE), -(thingPos[2] * this.utils.TILESIZE),
          'sandbagTiles', direction
        );
        sandbagSprite.tint = this.utils.SAND;
        sandbagSprite.scale.setTo(this.utils.SCALESIZE);
        sandbagSprite.anchor.setTo(0.1, 0.9);
        this.stuffGridLayer.add(sandbagSprite);
      } //End Wall Sandbag elseif
    } //End For
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
            //case 120: //?!?!?!?!? TODO
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
            direction = this.utils.matchWall(chunk);
          } else {
            direction = null;
          }

          //Decide color here
          if (direction != null) {
            rockSprite = this.game.add.sprite(
              (j * this.utils.TILESIZE), -(i * this.utils.TILESIZE),
              'rockTiles', direction
            );

            rockSprite.anchor.setTo(0.1, 0.9);

            switch (this.mapInfo.resourceRefGrid[masterIndex]) { //USE TERRAIN
              case 67:
                rockSprite.tint = this.utils.SANDSTONE;
                break;
              case 197:
                rockSprite.tint = this.utils.SLATE;
                break;
              case 84:
                rockSprite.tint = this.utils.GRANITE;
                break;
              case 212:
                rockSprite.tint = this.utils.MARBLE;
                break;
              case 139:
              case 138:
                rockSprite.tint = this.utils.LIMESTONE;
                break;
                case 93:
                case 56:
                  rockSprite.tint = this.utils.COMPONENTS;
                  break;
                case 229:
                rockSprite.tint = this.utils.GOLD;
                  break;
                case 103:
                  rockSprite.tint = this.utils.URANIUM;
                  break;
                case 157:
                case 156:
                  rockSprite.tint = this.utils.STEEL;
                  break;
                case 127:
                  rockSprite.tint = this.utils.JADE;
                  break;
                case 194:
                  rockSprite.tint = this.utils.SILVER;
                  break;
            }
            rockSprite.scale.setTo(this.utils.SCALESIZE);
            this.rocksGridLayer.add(rockSprite);
          }

          //Tint all rock tiles and add to mountain group
          rockTint = null;

          rockTint = this.game.add.sprite(
            (j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE),
            'rockTint'
          );
          //this has a weird problem
          rockTint.scale.setTo(this.utils.SCALESIZE);
          this.mountainsLayer.add(rockTint);
        }
        masterIndex++;
      }
    }
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
        //this.renderSnowTileMap();
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

  scaleMap(scale){

    this.marker.scale.setTo(scale);

    this.topTerrainGridLayer.setScale(scale, scale);
    this.topTerrainGridLayer.resize(this.game.width / scale, this.game.height / scale);

  //  this.topTerrainGridLayer.resizeWorld();

    this.stuffLayer.scale.set(scale);

    this.zoomLevel = 1/scale;

    if (this.rocksLayer) {
      this.rocksLayer.scale.set(scale);
    }
    if (this.resourceLayer) {
      this.resourceLayer.scale.set(scale);
    }
    if (this.deepResourceLayer) {
      this.deepResourceLayer.scale.set(scale);
    }

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
    this.marker.scale.setTo(1 / this.zoomLevel);

    //this.centerMarker.scale.setTo(1 / this.zoomLevel);

    this.topTerrainGridLayer.setScale(1 / this.zoomLevel, 1 / this.zoomLevel);
    this.topTerrainGridLayer.resize(this.game.width * this.zoomLevel, this.game.height * this.zoomLevel);
    this.topTerrainGridLayer.resizeWorld();
  }

  markerInit() {
    this.marker = this.game.add.graphics();
    this.marker.lineStyle(2, 0xFF4444, 1);
    this.marker.drawRect(0, 0, this.utils.TILESIZE, this.utils.TILESIZE);
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
      this.currentTile.terrainTile = this.utils.getTerrainName(terrainTile.index + 1) + " - " + (terrainTile.index + 1);
    }
    if (stuffTile) {
      this.oldStuffTile = stuffTile;

      if (stuffTile[0]) {
        console.log(stuffTile);

        //Sanitze stuffTile to removed notAllowed Items
        /*
        for (let i = 0; i < stuffTile.length; i++) {
          if (this.utils.isAllowedStuff(this.utils.getStuffName(stuffTile[i].def)) == false) {
            let index = stuffTile.indexOf(i);
            stuffTile.splice(index, 1);
            this.clickIndex++;
          }
        }
        */
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
      this.currentTile.resourceTile = this.utils.getResourceName(resourceTile) + " - " + resourceTile;
    }
    if (deepResourceTile) {
      this.currentTile.deepResourceTile = this.utils.getDeepResourceName(deepResourceTile) + " x" + this.mapInfo.deepResourceCount[(flippedY - 1) * this.worldSize.y + x] + " - " + deepResourceTile;
    }
  }

  isMouseOut() {
    if (this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) >= 0 &&
      this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) < this.worldSize.x &&
      this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) >= 0 &&
      this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) < this.worldSize.y) {
      return true;
    } else {
      return false;
    }
  }
}
export default GameState;
