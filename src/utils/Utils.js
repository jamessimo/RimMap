
class Utils {

  constructor(game){
    this.game = game;
    this.worldSize = {
        x: 0,
        y: 0,
        z: 0
      };

      if (this.game.hd == false) {
        this.TILESIZE = 16;
        this.SCALESIZE = 0.25;
        this.BLOWUP = 4;
      } else {
        this.TILESIZE = 32; //orginal 64, cut in half to save memory.
        this.SCALESIZE = 0.5;
        this.BLOWUP = 2;
      }

      this.GRANITE = 0x635e5b;
      this.LIMESTONE = 0x5f5c44;
      this.SANDSTONE = 0x756157;
      this.MARBLE = 0x777877;
      this.SLATE = 0x3a3a39;
      this.SAND = 0x998864;

      this.WOOD = 0xBF6C2A;
      this.STEEL = 0xb7b7b7;
      this.PLASTEEL = 0x7bafae;
      this.COMPONENTS = 0x755808;
      this.GOLD = 0xD0B703;
      this.SILVER = 0x939086;
      this.URANIUM = 0x727272;
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

      this.LEATHER = 0xa26a39;
      this.SYNTHREAD = 0xb0e5de;

      this.MEAT = 0xB03030;

      this.DEVILSTRAND = 0x8c1d10;
      this.CLOTH = 0xc3c0b0;

  }

  getStuffName(stuff) {
    let regex = new RegExp('\_(.*)'); /// after _
    let preRegex = new RegExp('(.*)\_'); /// before _
    let outputName = null;
    if (regex.exec(stuff)) {
      if (preRegex.exec(stuff)[1] == "Shell" ||
        preRegex.exec(stuff)[1] == "TrapIED") {
        outputName = stuff;
      } else if (preRegex.exec(stuff)[1] == "Plant")  { //VERSION 0.19
        outputName = preRegex.exec(stuff)[1] + regex.exec(stuff)[1];
      } else if (preRegex.exec(stuff)[1] == "Filth" ||
      preRegex.exec(stuff)[1] == "Dirt" ||
      preRegex.exec(stuff)[1] == "Blood" ||
      preRegex.exec(stuff)[1] == "Leather"){
        outputName = preRegex.exec(stuff)[1];
      }else {
        outputName = regex.exec(stuff)[1];
      }
    } else {
      outputName = stuff;
    }
    return outputName;
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
      case 20: //Sandstone flag
        output = "Sandstone Flagstone";
        break;
      case 21: //Granite flag
        output = "Granite Flagstone";
        break;
      case 22: //Limestone flag
        output = "Limestone Flagstone";
        break;
      case 23: //Slate flag
        output = "Slate Flagstone";
        break;
      case 24: //Marble flagstone
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
      case 139:
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
      case 93:
      case 56: //compactsteel
        output = "Compacted Machinery";
        break;
      case 157:
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

/*  //EXPERIMENTAL DONT USE
newDecompress(rawGrid) {
    //TOPGRID
    //DECODE BASE 64 TO BINARY
    let binary = atob(rawGrid);
    let output = [];
    //INFLATE/DECOMPRESS TOPGRID
    try {
      output = pako.inflate(binary, {
        windowBits : 0,
        raw: true
      });

    } catch (err) {
      console.log(err);
    }

    //output =  this.Base64Encode(output);
    return output;
  }


  Base64Encode(str, encoding = 'utf-8') {
    var bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str);
    return base64js.fromByteArray(bytes);
  }

  Base64Decode(str, encoding = 'utf-8') {
    var bytes = base64js.toByteArray(str);
    return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
  }
  */


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
        case "SmoothedSandstone":
        case "BlocksSandstone":
          sprite.tint = this.SANDSTONE;
          break;
        case "ChunkGranite":
        case "SmoothedGranite":
        case "BlocksGranite":
          sprite.tint = this.GRANITE;
          break;
        case "ChunkSlate":
        case "SmoothedSlate":
        case "BlocksSlate":
          sprite.tint = this.SLATE;
          break;
        case "ChunkLimestone":
        case "SmoothedLimestone":
        case "BlocksLimestone":
          sprite.tint = this.LIMESTONE;
          break;
        case "ChunkMarble":
        case "SmoothedMarble":
        case "BlocksMarble":
          sprite.tint = this.MARBLE;
          break;
        case "WoodLog":
          sprite.tint = this.WOOD;
          break;
        case "Cloth":
          sprite.tint = this.CLOTH;
          break;
        case "ToolCabinet":
          sprite.tint = 0x60725f;
          break;
        case "Leather_Bluefur":
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
        case "Leather_Camel":
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
        case "Leather_Chinchilla":
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
        case "Leather_Elephant":
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
        case "Leather_Bear":
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

        case "Leather_Lizard":
        case "Iguana_Leather":
          sprite.tint = this.IGUANA;
          break;
        case "Leather_Dog":
        case "LabradorRetriever_Leather":
          sprite.tint = this.LABRADORRETRIEVER;
          break;
        case "Lynx_Leather":
          sprite.tint = this.LYNX;
          break;
        case "Leather_Heavy":
        case "WoolMegasloth":
        case "Megasloth_Leather":
          sprite.tint = this.MEGASLOTH;
          break;
        case "Monkey_Leather":
          sprite.tint = this.MONKEY;
          break;
        case "Leather_Bird":
        case "Ostrich_Leather":
          sprite.tint = this.OSTRICH;
          break;

        case "Leather_Panthera":
        case "Panther_Leather":
          sprite.tint = this.PANTHER;
          break;
        case "Leather_Pig":
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
        case "Leather_Fox":
        case "FoxRed_Leather":
          sprite.tint = this.FOXRED;
          break;
        case "Leather_Rhinoceros":
        case "Rhinoceros_Leather":
          sprite.tint = this.RHINOCEROS;
          break;
        case "Snowhare_Leather":
          sprite.tint = this.SNOWHARE;
          break;
        case "Leather_Light":
        case "Squirrel_Leather":
          sprite.tint = this.SQUIRREL;
          break;
        case "Leather_Wolf":
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
        case "Leather_Dog":
        case "YorkshireTerrier_Leather":
          sprite.tint = this.YORKSHIRETERRIER;
          break;
        case "Leather_Thrumbo":
          sprite.tint = this.THRUMBO;
          break;
        case "Leather_Plain":
          sprite.tint = this.LEATHER;
          break;
        case "Leather_Patch":
          sprite.tint = 0x5a4b3c;
          break;
        case "Leather_Human":
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
        case "Uranium":
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
        case "Synthread":
          sprite.tint = this.SYNTHREAD;
          break;
        default:
          //thingSprite.tint = 0xffffff;
      }
    }

    return sprite;
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

    if (data.rot) {
      if (data.rot == 1) {
        outputSprite.angle = 90;
      }
      if (data.rot == 2) {
        outputSprite.angle = 180;
      }
      if (data.rot == 3) {
        outputSprite.angle = -90;
      }
    }

    //1X1
    if (outputSprite.height == this.TILESIZE && outputSprite.width == this.TILESIZE) {
      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(1, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(1, 0);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(0, 0);
        }
      }
      //2X1
    } else if (outputSprite.height == (this.TILESIZE * 2) &&
      outputSprite.width == this.TILESIZE) { //

      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(1, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(1, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(0, 0.5);
        }
      }
      //1X4
    } else if (outputSprite.height == (this.TILESIZE * 4) &&
      outputSprite.width == this.TILESIZE) { //

      outputSprite.anchor.setTo(0, 0.75);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(1, 0.75);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(1, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(0, 0.5);
        }
      }
      //2x1
    } else if (outputSprite.height == this.TILESIZE &&
      outputSprite.width == (this.TILESIZE * 2)) {
      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(0.5, 0);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(0, 0);
        }
      }
      //4x2
    } else if (outputSprite.height == (this.TILESIZE * 4) &&
      outputSprite.width == (this.TILESIZE * 2)) {
      outputSprite.anchor.setTo(0, 0.75);
      outputSprite.tint = 0xf0fff0;
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(0.6, 0.6);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(1, 0.5);
        }
      }
      //4x2
    }else if (outputSprite.height == (this.TILESIZE * 2) &&
      outputSprite.width == (this.TILESIZE * 4)) {
      outputSprite.anchor.setTo(0.4, 0.75);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(0.6, 0.6);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(1, 0.5);
        }
      }
      //2x2
    } else if (outputSprite.height == (this.TILESIZE * 2) &&
      outputSprite.width == (this.TILESIZE * 2)) {

      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(0.5, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(0, 0.5);
        }
      }
      //3x2
    } else if (outputSprite.height == (this.TILESIZE * 2) &&
      outputSprite.width == (this.TILESIZE * 3)) {

      outputSprite.anchor.setTo(0.35, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(0.5, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(0.35, 0.6);
        }
      }
      //2x3
    } else if (outputSprite.height == (this.TILESIZE * 3) &&
      outputSprite.width == (this.TILESIZE * 2)) {

      outputSprite.anchor.setTo(0, 0.65);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(0.5, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(0, 0.5);
        }
      }

      //3x3
    }else if (outputSprite.height == (this.TILESIZE * 3) &&
      outputSprite.width == (this.TILESIZE * 3)) {
      outputSprite.anchor.setTo(0.35, 0.65);

      if (data.rot == 1) {
        outputSprite.anchor.setTo(0.5, 0.5);
      }
      if (data.rot == 2) {
        outputSprite.anchor.setTo(0.65, 0.35);
      }
      if (data.rot == 3) {
        outputSprite.anchor.setTo(0.5, 0.5);
      }
      //3X1
    } else if (outputSprite.height == this.TILESIZE &&
      outputSprite.width == (this.TILESIZE * 3)) {
      outputSprite.anchor.setTo(0.35, 1);
      if (data.rot == 1) {
        outputSprite.anchor.setTo(0.65, 1);
      }
      if (data.rot == 2) {
        outputSprite.anchor.setTo(0.65, 0);
      }
      if (data.rot == 3) {
        outputSprite.anchor.setTo(0.35, 0);
      }
      //4x4
    } else if (outputSprite.height == (this.TILESIZE * 4) &&
      outputSprite.width == (this.TILESIZE * 4)) {
      if (!data.rot) {
        outputSprite.anchor.setTo(0.25, 0.75);
      }
      if (data.rot == 1) {
        outputSprite.anchor.setTo(0.5, 0.75);
      }
      if (data.rot == 2) {
        outputSprite.anchor.setTo(0.5, 0.5);
      }
      if (data.rot == 3) {
        outputSprite.anchor.setTo(0.75, 0.25);
      }
      //6x6
    } else if (outputSprite.height == (this.TILESIZE * 6) &&
      outputSprite.width == (this.TILESIZE * 6)) {
      outputSprite.anchor.setTo(0.35, 0.65);
      //5x2
    } else if (outputSprite.height == (this.TILESIZE * 2) &&
      outputSprite.width == (this.TILESIZE * 5)) {
      outputSprite.anchor.setTo(0.4, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(0.6, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(1, 0.5);
        }
      }
      //3x4
    } else if (outputSprite.height == (this.TILESIZE * 4) &&
      outputSprite.width == (this.TILESIZE * 3)) {
      outputSprite.anchor.setTo(0.35, 0);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(0.65, 0.5);
        }
        if (data.rot == 3) {
          outputSprite.anchor.setTo(1, 0.5);
        }
      }
      //1x4
    }else if (outputSprite.height == this.TILESIZE &&
      outputSprite.width == (this.TILESIZE * 4)) {
      outputSprite.anchor.setTo(0, 1);
      if (data.rot) {
        if (data.rot == 1) {
          outputSprite.anchor.setTo(0.5, 1);
        }
        if (data.rot == 2) {
          outputSprite.anchor.setTo(0.5, 0);
        }
        if (data.rot == 3) {
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

  //Is this a wall?
  isWall(stuff) {
    switch (stuff) {
      case "Wall":
      case "SmoothedGranite":
      case "SmoothedSandstone":
      case "SmoothedLimestone":
      case "SmoothedMarble":
      case "SmoothedSlate":
        return true;
        break;
      default:
        return false
    }
  }

  isResource(stuff){
    switch (stuff) {
      case "Granite":
      case "Limestone":
      case "Sandstone":
      case "Marble":
      case "Slate":
      case "MineableSteel":
      case "MineableUranium":
      case "MineableGold":
      case "MineableJade":
      case "MineableSilver":
      case "MineableComponents":
      case "MineableComponentsIndustrial":
        return true;
        break;
      default:
        return false;
    }
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
      case "Trash":
      case "AnimalFilth":
      case "Vomit":
      case "Blood":
      case "Slime":
      case "CorpseBile":
      case "RubbleBuilding":
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
      case "Lancer":
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
      case "Fox_Arctic":
      case "WolfArctic":
      case "Wolf_Arctic":

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
      case "Fox_Fennec":
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
      case "Fox_Red":
      case "Rhinoceros":
      case "Snowhare":
      case "Spelopede":
      case "Squirrel":
      case "Thrumbo":
      case "WolfTimber":
      case "Wolf_Timber":
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
  mapTextures(iArray, param,underGrid) {

    if (param == "terrain") {
      //Fix For tiles Metal, Silver, Gold and Sterile tiles
      for (let j = 0; j < iArray.length; j++) {
        if (iArray[j] == 101 || iArray[j] == 246 || iArray[j] == 37 || iArray[j] == 199) {
          if (underGrid[j] != 0) {
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
          case 153: //Softsand
            iArray[i] = 25;
            break;
          default:
            console.log(iArray[i]);
        }
        iArray[i] = iArray[i] -= 1; //fix for index offset
      }
    }
    return iArray;
  }

}

export default Utils;
