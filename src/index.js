import Boot from 'states/Boot';
import Preload from 'states/Preload';
import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		window.PhaserGlobal = { disableAudio: true };
// Phaser.WEBGL_MULTI
		super(1024, 720, Phaser.WEBGL_MULTI, 'window', null);

		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
		this.state.add('GameState', GameState, false);

		this.state.start('Boot');
	}
}

new Game();
