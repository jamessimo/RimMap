class Preload extends Phaser.State {
  preload() {
    //  Set-up our preloader sprite
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
    this.load.setPreloadSprite(this.preloadBar);
		this.preloadBar.anchor.setTo(0.5);

    this.game.load.image('tile', 'assets/tile.png');

		this.game.load.image('tiles', 'assets/ShiftTilemap.bmp');

		this.game.load.image('testtiles', 'assets/kenny_ground_64x64.png');


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

    this.game.load.image('WoodFiredGenerator', 'assets/WoodFiredGenerator.png');
    this.game.load.image('Table2x2c', 'assets/Table2x2_back.png');
    this.game.load.image('SteamGeyser', 'assets/SteamGeyser.png');

    //Hide rotation stuff untill fix
    /*
        this.game.load.image('Grave', 'assets/GraveFull_back.png');
        this.game.load.image('Bedroll', 'assets/Bedroll.png');
        this.game.load.image('DoubleBed', 'assets/DoubleBed_back.png');
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
        this.game.load.image('Battery', 'assets/Battery_back.png');
        this.game.load.image('Bed', 'assets/Bed_back.png');
        this.game.load.image('Shelf', 'assets/Shelf_back.png');
        this.game.load.image('MarriageSpot', 'assets/tile.png');
        this.game.load.image('ToolCabinet', 'assets/ToolCabinet_back.png');
        this.game.load.image('SleepingSpot', 'assets/SleepSpot_back.png');
        this.game.load.image('AncientCryptosleepCasket', 'assets/ShipCryptosleepCasket_back.png');
        this.game.load.image('AnimalBed', 'assets/AnimalBed.png');
        this.game.load.image('DiningChair', 'assets/DiningChair_back.png');
        this.game.load.image('EndTable', 'assets/EndTable_front.png');
    */
    this.game.load.image('SculptureLarge', 'assets/SculptureSmallAbstractB.png');
    this.game.load.image('StandingLamp', 'assets/LampStanding.png');
    this.game.load.image('PlantPot', 'assets/PlantPot.png');
    this.game.load.image('Heater', 'assets/Heater.png');

    this.game.load.script('pako', 'assets/pako.min.js');

		this.game.time.advancedTiming = true;
 this.game.antialias = false;
 this.game.scale.pageAlignHorizontally = true;
 this.game.scale.pageAlignVertically = true;

  }
  create() {
    let tween = this.add.tween(this.preloadBar).to({
      alpha: 0
    }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startMainMenu, this);

  }
  startMainMenu() {
    this.game.state.start('GameState');
  }

}
export default Preload;
