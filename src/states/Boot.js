class Boot extends Phaser.State {

	preload() {
		this.load.image('preloadBar', 'assets/loader.png');
		this.load.image('preloadBg', 'assets/loaderBg.png');

	}
	create() {
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.stage.backgroundColor = '#14171a';

		this.game.state.start("Preload");
	}
}

export default Boot;
