class PreloadAssets extends Phaser.State {

  init(assets,json){
    this.toLoadJson = assets;
    this.json = json;
  }

  preload() {
    //  Set-up our preloader sprite
    let preloadBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBg');
    preloadBg.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX - 256, this.game.world.centerY, 'preloadBar');
    this.load.setPreloadSprite(this.preloadBar);

    this.preloadBar.anchor.setTo(0, 0.5);

    this.text = this.game.add.text(256, this.game.world.centerY + 64, 'Click to start load', { font: "normal 18px Arial", align: 'left', fill: '#ffffff'});

    if(this.game.hd == false){
      this.game.load.image('tiles', 'assets/ShiftTilemap16.bmp');
    }else{
      this.game.load.image('tiles', 'assets/ShiftTilemap32.bmp');
    }

   new AssetLoader(this.game, this.toLoadJson);

   this.game.load.onFileComplete.add(this.fileComplete, this);
   this.game.load.onLoadComplete.add(this.onLoadComplete, this);

   this.game.time.advancedTiming = true;
   this.game.antialias = false;
   this.game.scale.pageAlignHorizontally = true;
   this.game.scale.pageAlignVertically = true;


  }
  create() {
    let tween = this.add.tween(this.preloadBar).to({
      alpha: 0
    }, 250, Phaser.Easing.Linear.None, true);
    //tween.onComplete.add(this.startMainRender, this);
  }

  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
	   this.text.setText("Downloading assets: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
  }

  onLoadComplete() {
    this.text.setText("Downloaded all assets! Start rendering...");
    this.game.json = this.json;
    this.game.state.start('GameState');

  }

}
export default PreloadAssets;
