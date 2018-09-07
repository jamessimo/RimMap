class Preload extends Phaser.State {
  preload() {
    //  Set-up our preloader sprite
    let preloadBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBg');
    preloadBg.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX - 256, this.game.world.centerY, 'preloadBar');
    this.load.setPreloadSprite(this.preloadBar);

    this.preloadBar.anchor.setTo(0, 0.5);

    this.game.load.spritesheet('wallTiles', 'assets/vanilla/WallTilemap.png', 80, 80, 16);
    this.game.load.spritesheet('brickWallTiles', 'assets/vanilla/BrickTileMap.png', 80, 80, 16);
    this.game.load.spritesheet('woodWallTiles', 'assets/vanilla/WoodTilemap.png', 80, 80, 16);
    this.game.load.spritesheet('rockTiles', 'assets/vanilla/Rock_Atlas.png', 80, 80, 16);
    this.game.load.spritesheet('sandbagTiles', 'assets/vanilla/Sandbags_Atlas.png', 80, 80, 16);
    this.game.load.image('chunk', 'assets/vanilla/RockLowA.png');
    this.game.load.image('slag', 'assets/vanilla/MetalDebrisA.png');

    this.game.load.image('rockTint', 'assets/rockTint.png');
    this.game.load.image('resourceTint', 'assets/resourceTint.png');

    this.game.load.script('pako', 'assets/pako.min.js');

    //new AssetLoader(this.game, this.game.cache.getJSON("assets"));

  }
  create() {
    let tween = this.add.tween(this.preloadBar).to({
      alpha: 0
    }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startMainMenu, this);

  }
  startMainMenu() {
    this.game.state.start('DynamicLoad');
  }

}
export default Preload;
