class Boot extends Phaser.State {

	preload() {
		this.load.image('preloadBar', 'assets/loader.png');
		this.load.image('preloadBg', 'assets/loaderBg.png');

		this.load.json("vanillaAssets", "assets/vanillaAssets.json");

		this.load.json("modAssets", "assets/modAssets.json"); //TODO ADD VERSIONS?


		this.load.script('assetLoader', 'assets/phaser-asset-loader-0.0.1.min.js');


	}
	create() {
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.stage.backgroundColor = '#14171a';

		this.game.state.start("Preload");
	}
}

export default Boot;
