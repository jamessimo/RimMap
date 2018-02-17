class Preload extends Phaser.State {
  preload() {
    //  Set-up our preloader sprite
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
    this.load.setPreloadSprite(this.preloadBar);
		this.preloadBar.anchor.setTo(0.5);

    this.game.load.image('tile', 'assets/tile.png');
		this.game.load.image('tiles', 'assets/ShiftTilemap.bmp');
		this.game.load.image('resourceTiles', 'assets/ResourcesTilemap.png');



    this.game.load.spritesheet('wallTiles', 'assets/WallTilemap.png',80,80,16);
    this.game.load.spritesheet('brickWallTiles', 'assets/BrickWallTilemap.png',80,80,16);
    this.game.load.spritesheet('woodWallTiles', 'assets/WoodTilemap.png',80,80,16);
    this.game.load.spritesheet('rockTiles', 'assets/Rock_Atlas.png',80,80,16);

this.game.load.image('rockTint', 'assets/rockTint.png');

this.game.load.image('resourceTint', 'assets/resourceTint.png');

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
    this.game.load.image('PlantMoss', 'assets/MossB.png');
    this.game.load.image('BurnedTree', 'assets/BurnedTreeB.png');
      this.game.load.image('PlantPsychoid', 'assets/PsychoidPlantA.png');
      this.game.load.image('PlantCotton', 'assets/CottonPlant.png');


    this.game.load.image('RawBerries', 'assets/Berries.png');
    this.game.load.image('RawPotatoes', 'assets/Potatoes.png');
    this.game.load.image('RawRice', 'assets/Rice.png');
    this.game.load.image('RawCorn', 'assets/Corn.png');
    this.game.load.image('RawHops','assets/Hops.png');
    this.game.load.image('PsychoidLeaves', 'assets/PsychoidLeaves.png');
    this.game.load.image('Kibble', 'assets/Kibble.png');
    this.game.load.image('Hay', 'assets/Hay_c.png');


    this.game.load.image('MealSimple', 'assets/Simple.png');
    this.game.load.image('MealFine', 'assets/Fine.png');
    this.game.load.image('MealLavish', 'assets/Lavish.png');
  this.game.load.image('Medicine', 'assets/Medicine.png');
  this.game.load.image('HerbalMedicine', 'assets/MedicineHerbal.png');
  this.game.load.image('GlitterworldMedicine', 'assets/MedicineGlitterworld.png');

  this.game.load.image('Cloth', 'assets/Cloth.png');




    this.game.load.image('FermentingBarrel', 'assets/FermentingBarrel_back.png');



    this.game.load.image('Pemmican', 'assets/Pemmican.png');


    this.game.load.image('Granite', 'assets/RockLowA.png');
    this.game.load.image('Sandstone', 'assets/RockLowA.png');
    this.game.load.image('Marble', 'assets/RockLowA.png');
    this.game.load.image('Limestone', 'assets/RockLowA.png');
    this.game.load.image('Slate', 'assets/RockLowA.png');

    this.game.load.image('RockRubble', 'assets/RubbleA.png');
    this.game.load.image('BuildingRubble', 'assets/RubbleA.png');
    this.game.load.image('Steel', 'assets/MetalA.png');

    this.game.load.image('Leather', 'assets/Leathers.png');


    this.game.load.image('ShipChunk', 'assets/ShipChunkA.png');
    this.game.load.image('Silver', 'assets/Silver.png');
    this.game.load.image('Component', 'assets/Component.png');
    this.game.load.image('Luciferium', 'assets/Component.png');
    this.game.load.image('Chemfuel', 'assets/Chemfuel.png');
    this.game.load.image('Beer', 'assets/Beer_b.png');

    this.game.load.image('MealSurvivalPack', "assets/SurvivalPack.png");
    this.game.load.image('WoodLog', "assets/WoodLog_b.png");

    this.game.load.image('ChunkGranite', 'assets/RockLowA.png');
    this.game.load.image('ChunkSandstone', 'assets/RockLowA.png');
    this.game.load.image('ChunkMarble', 'assets/RockLowA.png');
    this.game.load.image('ChunkLimestone', 'assets/RockLowA.png');
    this.game.load.image('ChunkSlate', 'assets/RockLowA.png');

      this.game.load.image('ChunkSlagSteel', 'assets/MetalDebrisA.png');

    this.game.load.image('FilthDirt', 'assets/DirtSmearA.png');

    this.game.load.image('SlagRubble', 'assets/SlagBitsA_2.png');

//GUNZ
this.game.load.image('BoltActionRifle', 'assets/BoltActionRifle.png');
this.game.load.image('SniperRifle', 'assets/SniperRifle.png');
this.game.load.image('PumpShotgun', 'assets/Shotgun.png');
this.game.load.image('Revolver', 'assets/Revolver.png');
this.game.load.image('HeavySMG', 'assets/HeavySMG.png');
this.game.load.image('Minigun', 'assets/Minigun.png');
this.game.load.image('LMG', 'assets/LMG.png');
this.game.load.image('Autopistol', 'assets/Autopistol.png');
this.game.load.image('MachinePistol', 'assets/MachinePistol.png');
this.game.load.image('Incendiary', 'assets/IncendiaryLauncher.png');
this.game.load.image('ChargeRifle', 'assets/ChargeRifle.png');
this.game.load.image('GrenadeFrag', 'assets/Grenades.png');
this.game.load.image('GrenadeEMP', 'assets/EMPGrenades.png');
this.game.load.image('GrenadeMolotov', 'assets/Molotov.png');

this.game.load.image('Mace', 'assets/Mace.png');
this.game.load.image('LongSword', 'assets/LongSword.png');
this.game.load.image('Knife', 'assets/Knife.png');

this.game.load.image('PsychicShockLance', 'assets/PsychicShockLance.png');
this.game.load.image('PsychicAnimalPulser', 'assets/PsychicAnimalPulser.png');


    this.game.load.image('Wall', 'assets/Wall.png');
    this.game.load.image('Door', 'assets/Door.png');
    this.game.load.image('Autodoor', 'assets/Autodoor.png');
    this.game.load.image('Cooler', 'assets/Cooler.png');
    this.game.load.image('Vent', 'assets/Vent.png');

    this.game.load.image('WoodFiredGenerator', 'assets/WoodFiredGenerator.png');
    this.game.load.image('ChemfuelPoweredGenerator', 'assets/ChemfuelPoweredGenerator.png');


    this.game.load.image('Table1x2c', 'assets/Table1x2_back.png');
    this.game.load.image('Table2x2c', 'assets/Table2x2_back.png');

    this.game.load.image('Table2x4c', 'assets/Table2x4_back.png');
    this.game.load.image('Table3x3c', 'assets/Table3x3_back.png');

    this.game.load.image('SteamGeyser', 'assets/SteamGeyser.png');

    //Hide rotation stuff untill fix

    this.game.load.image('Armchair', 'assets/Armchair_front.png');

        this.game.load.image('Grave', 'assets/GraveFull_back.png');
        this.game.load.image('Bedroll', 'assets/Bedroll.png');
        this.game.load.image('DoubleBed', 'assets/DoubleBed_back.png');
        this.game.load.image('RoyalBed', 'assets/RoyalBed_back.png');
        this.game.load.image('HospitalBed', 'assets/HospitalBed_back.png');


        this.game.load.image('SolarGenerator', 'assets/SolarCollector.png');
        this.game.load.image('WindTurbine', 'assets/WindTurbineBody.png');
        this.game.load.image('CommsConsole', 'assets/CommsConsole.png');

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

        //P

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
