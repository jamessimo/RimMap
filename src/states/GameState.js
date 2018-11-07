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
    this.exp = false;
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
      "colonyName" : "",
      "gameVersion" : "",
      "topTerrainGrid": [],
      "underTerrainGrid": [],
      "resourceRefGrid": [],
      "deepResourceGrid": [],
      "deepResourceCount": [],
      "planningGrid" : [],
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
      this.planningLayer =
      this.roofLayer =
      this.centerMarker =
      this.currentBounds =
      this.marker = null;

    this.rockGrid = [];
    this.game.forceSingleUpdate = false;
    this.game.stage.backgroundColor = '#1f271d';

    this.game.stage.smoothed = false

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

      this.terrainGridLayer = this.game.add.group();

      console.log(this.loadingDelta);
      this.buildMapInfo(this.json);

      let url = null;
      if (window.document.referrer) {
        url = new URL(window.document.referrer);
      } else {
        url = new URL(document.location);
      }
      if (url != null) {
        params = new URLSearchParams(url.search.substring(1))
        let urlMapId = params.get("test")
        if (urlMapId !== null) {
          this.exp = true;
        }
      }

      if (this.exp) {
        this.renderTerrainTileMap();
      } else {
        this.renderTerrain();
      }

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
        this.planningLayer = this.game.add.group();

        for (let i = 0; i < this.worldSize.x; i++) {
          if (!this.rockGrid[i]) {
            this.rockGrid[i] = [];
          }
          for (let j = 0; j < this.worldSize.y; j++) {
            this.rockGrid[i][j] = 0;
          }
        }

        //RENDER TILEMAP
        this.renderStuff();
        this.renderWalls();
        this.renderMountain();

        //this.renderPlanTileMap();
        if (!this.exp) {
          this.terrainLayer = this.renderBitmap(this.terrainGridLayer);
        }
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

        this.scaleMap(this.groupScale);

      } else if (this.loadingDelta == 4) {
        console.log(this.loadingDelta);

        this.mapSizeMax = this.mapInfo.width;
        this.mapSizeCurrent = this.mapSizeMax;
        this.worldScale = 1;

        this.game.input.mouseWheel.callback = (event) => {
          let wheelDelt = this.game.input.mouseWheel.delta;

          if (wheelDelt < 0) {

            if (this.mapSizeCurrent > this.mapSizeMax) {
              this.mapSizeCurrent -= this.scrollZoomRate;
            } else {
              this.mapSizeCurrent -= this.scrollZoomRate;
              this.mapSizeCurrent = Phaser.Math.clamp(this.mapSizeCurrent, this.SCREENWIDTH * 2, this.mapSizeMax);
            }
          } else {
            if (this.mapSizeCurrent < this.mapSizeMax) {
              this.mapSizeCurrent += this.scrollZoomRate;
              this.mapSizeCurrent = Phaser.Math.clamp(this.mapSizeCurrent, this.SCREENWIDTH * 2, this.mapSizeMax);
            } else if (this.mapSizeCurrent < this.mapSizeMax * 2) {
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

        let scrollRate = this.utils.TILESIZE / this.zoomLevel;

        if (this.game.input.mousePointer.x > this.SCREENWIDTH - this.MOUSEBOUNDS) {
          this.game.camera.x += scrollRate;
        }
        if (this.game.input.mousePointer.x < 0 + this.MOUSEBOUNDS) {
          this.game.camera.x -= scrollRate;
        }
        if (this.game.input.mousePointer.y > this.SCREENHEIGHT - this.MOUSEBOUNDS) {
          this.game.camera.y += scrollRate;
        }
        if (this.game.input.mousePointer.y < 0 + this.MOUSEBOUNDS) {
          this.game.camera.y -= scrollRate;
        }
        if (this.cursors.up.isDown) {
          this.game.camera.y -= scrollRate;
        } else if (this.cursors.down.isDown) {
          this.game.camera.y += scrollRate;
        }
        if (this.cursors.left.isDown) {
          this.game.camera.x -= scrollRate;
        } else if (this.cursors.right.isDown) {
          this.game.camera.x += scrollRate;
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
        if (this.isMouseOut()) {

          this.zoompoint.x = this.game.input.mousePointer.worldX;
          this.zoompoint.y = this.game.input.mousePointer.worldY;

          if (this.topTerrainGridLayer) {
            this.marker.x = this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) * this.utils.TILESIZE / this.zoomLevel;
            this.marker.y = this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) * this.utils.TILESIZE / this.zoomLevel;
          } else {

            let x = Phaser.Math.snapTo(this.game.input.activePointer.worldX-((this.utils.TILESIZE/2)/ this.zoomLevel),this.utils.TILESIZE / this.zoomLevel);
            let y = Phaser.Math.snapTo(this.game.input.activePointer.worldY-((this.utils.TILESIZE/2)/ this.zoomLevel),this.utils.TILESIZE / this.zoomLevel);

            this.marker.x  = x;
            this.marker.y  = y;
          }
        }
        this.oldcamera = null;
      }
      this.scrolling = false;
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 20, 50, "#ffffff");
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

    this.mapInfo.gameVersion = json.savegame.meta.gameVersion;

    //GET COLONY NAME
    for(let i = 0; i < json.savegame.game.world.factionManager.allFactions.li.length ; i++){
      if(json.savegame.game.world.factionManager.allFactions.li[i].def == "PlayerColony" ||
         json.savegame.game.world.factionManager.allFactions.li[i].def == "PlayerTribe"){
        this.mapInfo.colonyName = json.savegame.game.world.factionManager.allFactions.li[i].name;
      }
    }

    this.mapInfo.topTerrainGrid = this.utils.decompress(json.savegame.game.maps.li.terrainGrid.topGridDeflate);
    this.mapInfo.underTerrainGrid = this.utils.decompress(json.savegame.game.maps.li.terrainGrid.underGridDeflate);
    //this.mapInfo.roofTerrainGrid = this.utils.decompress(json.savegame.game.maps.li.roofGrid);
    this.mapInfo.resourceRefGrid = this.utils.decompress(json.savegame.game.maps.li.compressedThingMapDeflate);

    this.mapInfo.deepResourceGrid = this.utils.decompress(json.savegame.game.maps.li.deepResourceGrid.defGridDeflate);
    this.mapInfo.deepResourceCount = this.utils.decompress(json.savegame.game.maps.li.deepResourceGrid.countGridDeflate);

    this.mapInfo.planningGrid = json.savegame.game.maps.li.designationManager.allDesignations.li;

    this.mapInfo.topTerrainGrid = this.utils.mapTextures(this.mapInfo.topTerrainGrid, "terrain", this.mapInfo.underTerrainGrid);
    this.mapInfo.stuffGrid = json.savegame.game.maps.li.things.thing;

    console.log(json.savegame);

    //this.temperatureCache.temperaturesDeflate
    //this.mapInfo.snowGridLayer = this.utils.decompress(json.savegame.game.maps.li.snowGrid.depthGridDeflate);
  }

  renderBitmap(group, center) {

    let outputGroup = this.game.add.group();
    let groupPosX = 0;
    let groupPosY = 0;
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

    group.position.x = groupPosX;
    group.position.y = groupPosY;

    //This is the BitmapData we're going to be drawing to
    bmd = this.game.add.bitmapData(this.mapInfo.width, this.mapInfo.height, false);
    renderOutput = bmd.addToWorld(0,0, 0, 0, 0.5, 0.5);

    this.game.stage.updateTransform();
    bmd.baseTexture.resolution = 0.5;
    bmd.disableTextureUpload = true;
    bmd.drawGroup(group);
    outputGroup.add(renderOutput);
    groupPosY = this.mapInfo.height;
    groupPosX = -this.mapInfo.width;
    bmd = null;
    group.destroy(true, false);

    return outputGroup;
  }

  renderTerrain() {
    let masterIndex = 0;
    let terrainSprite = null;
    for (let i = 0; i < this.worldSize.x; i++) {
      for (let j = 0; j < this.worldSize.y; j++) {
        terrainSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'tileMap', this.mapInfo.topTerrainGrid[masterIndex]);
        this.terrainGridLayer.add(terrainSprite);
        masterIndex++;
      }
    }
  }

  renderTerrainTileMap() {
    //Deprecated due to zoom in out being choppy
    this.game.cache.addTilemap('dynamicMap', null, this.utils.makeCSV(this.mapInfo.topTerrainGrid), Phaser.Tilemap.CSV);
    let tileMap = this.game.add.tilemap('dynamicMap', this.utils.TILESIZE, this.utils.TILESIZE);
    tileMap.addTilesetImage('tiles', 'tiles', this.utils.TILESIZE, this.utils.TILESIZE);
    //  0 is important
    this.topTerrainGridLayer = tileMap.createLayer(0);
    this.topTerrainGridLayer.renderSettings.enableScrollDelta = false;

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
          case "MineablePlasteel":
            mappedResource = 17;
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
          this.mapInfo.stuffGrid[i].def != "Gold" &&
          this.mapInfo.stuffGrid[i].def != "Uranium") {

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

        if(this.mapInfo.stuffGrid[i].def == "Human"){
          console.log(this.mapInfo.stuffGrid[i].faction);
        }

        if (thingSprite) {
          this.stuffGridLayer.add(thingSprite);
          if (this.mapInfo.stuffGrid[i].def == "SteamGeyser" ||
            this.mapInfo.stuffGrid[i].def == "Shelf" ||
            this.mapInfo.stuffGrid[i].def == "PlantPot" ||
            this.mapInfo.stuffGrid[i].def == "HydroponicsBasin") {
            this.stuffGridLayer.sendToBack(thingSprite);
          }
        }
      } //printsprite
    } //End for Loop
  }

  renderResourceTileMap() {

    let masterIndex = 0;
    let resourceSprite = null;
    let resourceTint = null;
    let resourceGraphic = null;

    for (let i = 0; i < this.worldSize.x; i++) {
      for (let j = 0; j < this.worldSize.y; j++) {
        if (this.mapInfo.resourceRefGrid[masterIndex] > 0) {
          resourceSprite = null;
          resourceTint = null;
          resourceGraphic = null;

          switch (this.mapInfo.resourceRefGrid[masterIndex]) {
            case 78: //Marble chunk
              resourceGraphic = "chunk";
              resourceTint = this.utils.MARBLE;
              break;
            case 119: //Limestone chunk
              resourceGraphic = "chunk";
              resourceTint = this.utils.LIMESTONE;
              break;
            case 252: //Granite chunk
              resourceGraphic = "chunk";
              resourceTint = this.utils.GRANITE;
              break;
            case 102: //Slate chunk
              resourceGraphic = "chunk";
              resourceTint = this.utils.SLATE;
              break;
            case 47: //Sandstone chunk
              resourceGraphic = "chunk";
              resourceTint = this.utils.SANDSTONE;
              break;
            case 241: //Metal Chunk
              resourceGraphic = "slag";
              break;
            case 17: //Plasteel
              resourceGraphic = 'resourceTint';
              resourceTint = this.utils.PLASTEEL;
              break;
            case 93:
            case 56: //compactmach
              resourceGraphic = 'resourceTint';
              resourceTint = this.utils.COMPONENTS;
              break;
            case 157:
            case 156: //Steel
              resourceGraphic = 'resourceTint';
              resourceTint = this.utils.STEEL;
              break;
            case 103: //Uruianum
              resourceGraphic = 'resourceTint';
              resourceTint = this.utils.URANIUM;
              break;
            case 229: //GOLD
              resourceGraphic = 'resourceTint';
              resourceTint = this.utils.GOLD;
              break;
            case 194: // Sliver
              resourceGraphic = 'resourceTint';
              resourceTint = this.utils.SILVER;
              break;
            case 127: // Jade
              resourceGraphic = 'resourceTint';
              resourceTint = this.utils.JADE;
              break;
          }

          if (resourceGraphic) {
            resourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), resourceGraphic);
            resourceSprite.scale.setTo(this.utils.SCALESIZE);
            if (resourceTint) {
              resourceSprite.tint = resourceTint;
            }
            this.resourceGridLayer.add(resourceSprite);
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
          deepResourceSprite = this.game.add.sprite((j * this.utils.TILESIZE), -((i + 1) * this.utils.TILESIZE), 'resourceTint');
          deepResourceSprite.scale.setTo(this.utils.SCALESIZE);

          switch (this.mapInfo.deepResourceGrid[masterIndex]) {
            case 243: //Plasteel
              deepResourceSprite.tint = this.utils.PLASTEEL;
              break;
            case 97: //Chemfuel
              deepResourceSprite.tint = 0x00ff00;
              break;
            case 251: //Steel
              deepResourceSprite.tint = this.utils.STEEL;
              break;
            case 160: //Uruianum
              deepResourceSprite.tint = this.utils.URANIUM;
              break;
            case 125: //GOLD
              deepResourceSprite.tint = this.utils.GOLD;
              break;
            case 80: // Sliver
              deepResourceSprite.tint = this.utils.SILVER;
              break;
            case 22: // Jade
              deepResourceSprite.tint = this.utils.JADE;
              break;
            default:
              deepResourceSprite.tint = 0x00ff00;
          }

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

  renderPlanning() {

    let planPos = null;
    let planSprite = null;

    for (let i = this.mapInfo.planningGrid.length - 1; i > 0; i--) {
      planPos = this.utils.getPosition(this.mapInfo.planningGrid[i].target);
      planSprite = this.game.add.sprite(
        (planPos[0] * this.utils.TILESIZE), -(planPos[2] * this.utils.TILESIZE),
        "Plan"
      );
      planSprite.tint = 0xffffff;
      planSprite.scale.setTo(this.utils.SCALESIZE);
      this.planningLayer.add(planSprite);
    }
  }

  renderWalls() {
    let walls = [];
    let sandbags = [];

    let wallSprite = null;
    let sandbagSprite = null;

    let thingPos = null;
    //BUILD EMPTY WALL ARRAY
    for (let i = 0; i < this.worldSize.x; i++) {
      if (!this.mapInfo.stuffRefGrid[i]) {
        this.mapInfo.stuffRefGrid[i] = [];
        walls[i] = [];
        sandbags[i] = [];
      }
      for (let j = 0; j < this.worldSize.y; j++) {
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
        wallSprite = this.utils.colorSprite(wallSprite, this.mapInfo.stuffGrid[i]);
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
            case 78:  //Marble chunk
            case 119: //Limestone chunk
            case 252: //Granite chunk
            case 102: //Slate chunk
            case 47:  //Sandstone chunk
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

  showPlanning() {
    this.loadingFinished = false;
    if (!this.planningLayer) {
      let oldCam = {
        x: this.game.camera.x,
        y: this.game.camera.y
      }
      this.game.camera.x = 0;
      this.game.camera.y = 0;
      setTimeout(() => {
        this.renderPlanning();
        this.planningLayer = this.renderBitmap(this.planningLayer, true);
        this.planningLayer.scale.set(1 / this.zoomLevel);
        setTimeout(() => {
          this.game.camera.x = oldCam.x;
          this.game.camera.y = oldCam.y;
          this.loadingFinished = true;
        }, 500);
      }, 500);
    } else {
      this.planningLayer.alpha = 1;
      this.loadingFinished = true;
    }
  }
  hidePlanning() {
    this.planningLayer.alpha = 0;
    this.loadingFinished = true;
  }
  scaleMap(scale) {

    this.marker.scale.setTo(scale);

    if (this.topTerrainGridLayer) {
      this.topTerrainGridLayer.setScale(scale, scale);
      this.topTerrainGridLayer.resize(this.game.width / scale, this.game.height / scale);
      this.topTerrainGridLayer.resizeWorld();
    } else {
      this.terrainLayer.scale.set(scale);
    }

    this.stuffLayer.scale.set(scale);

    this.zoomLevel = 1 / scale;

    if (this.rocksLayer) {
      this.rocksLayer.scale.set(scale);
    }
    if (this.resourceLayer) {
      this.resourceLayer.scale.set(scale);
    }
    if (this.deepResourceLayer) {
      this.deepResourceLayer.scale.set(scale);
    }
    if(this.planningLayer){
      this.planningLayer.scale.set(scale);
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
    if(this.planningLayer){
      this.planningLayer.scale.set(1 / this.zoomLevel);
    }
    this.marker.scale.setTo(1 / this.zoomLevel);

    if(this.topTerrainGridLayer){
      this.topTerrainGridLayer.setScale(1 / this.zoomLevel, 1 / this.zoomLevel);
      this.topTerrainGridLayer.resize(this.game.width * this.zoomLevel, this.game.height * this.zoomLevel);
      this.topTerrainGridLayer.resizeWorld();
    }else{
      this.terrainLayer.scale.set(1 / this.zoomLevel);
    }
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
    let x = 0;
    let y = 0;
    let flippedY = 0;
    let terrainTile = null;
    if (this.topTerrainGridLayer) {
      x = this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel); // 4 * ZOOM
      y = this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel);
      flippedY = Math.abs(y - this.worldSize.y);
      flippedY = flippedY - 1;
      terrainTile = this.topTerrainGridLayer.map.getTile(x, y, this.topTerrainGridLayer);
    } else {
      x = Phaser.Math.snapTo(this.game.input.activePointer.worldX-((this.utils.TILESIZE/2)/ this.zoomLevel),this.utils.TILESIZE / this.zoomLevel);
      y = Phaser.Math.snapTo(this.game.input.activePointer.worldY-((this.utils.TILESIZE/2)/ this.zoomLevel),this.utils.TILESIZE / this.zoomLevel);

      x = Math.round((x/this.utils.TILESIZE)*this.zoomLevel)
      y = Math.round((y/this.utils.TILESIZE)*this.zoomLevel)

      flippedY = Math.abs(y - this.worldSize.y);
      flippedY = flippedY - 1;
      terrainTile = this.mapInfo.topTerrainGrid[flippedY * this.worldSize.y + x];
      //console.log(terrainTile + " - " + this.mapInfo.topTerrainGrid[flippedY * this.worldSize.y + x]);
    }
    let stuffTile = null;
    let resourceTile = null;
    let deepResourceTile = null;

    if (x >= 0 && x <= this.worldSize.x &&
      y >= 0 && y <= this.worldSize.y) {
      stuffTile = this.mapInfo.stuffRefGrid[x][flippedY];
      resourceTile = this.mapInfo.resourceRefGrid[flippedY * this.worldSize.y + x];
      deepResourceTile = this.mapInfo.deepResourceGrid[flippedY * this.worldSize.y + x];
    }

    if (terrainTile != null) {
      if(this.topTerrainGridLayer){
        this.currentTile.terrainTile = this.utils.getTerrainName(terrainTile.index + 1) + " - " + (terrainTile.index + 1);
      }else{
        this.currentTile.terrainTile = this.utils.getTerrainName(terrainTile + 1) + " - " + (terrainTile + 1);
      }
    }
    if (stuffTile) {
      this.oldStuffTile = stuffTile;

      if (stuffTile[0]) {
        console.log(stuffTile);

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

    if (this.topTerrainGridLayer) {
      if (
        this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) >= 0 &&
        this.topTerrainGridLayer.getTileX(this.game.input.activePointer.worldX * this.zoomLevel) < this.worldSize.x &&
        this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) >= 0 &&
        this.topTerrainGridLayer.getTileY(this.game.input.activePointer.worldY * this.zoomLevel) < this.worldSize.y) {
        return true;
      } else {
        return false;
      }
    } else {
      let x = Math.round((this.game.input.activePointer.worldX / this.utils.TILESIZE) * this.zoomLevel);
      let y = Math.round((this.game.input.activePointer.worldY / this.utils.TILESIZE) * this.zoomLevel);
      let flippedY = Math.abs(y - this.worldSize.y);
      if (x >= 0 && x < this.worldSize.x && y >= 0 && y < this.worldSize.y) {
        return true;
      } else {
        return false;
      }
    }
  }
}
export default GameState;
