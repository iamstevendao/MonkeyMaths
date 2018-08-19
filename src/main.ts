// Main

import 'pixi';
import 'p2';
import * as Phaser from 'phaser-ce';
import { BootState } from './states/Boot';
import { SplashState } from './states/Splash';
import { GameState } from './states/Game';
import { Config } from './utils/Config';

class Game extends Phaser.Game {
  constructor() {
    const config = new Config();
    super(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);

    this.state.start('Boot');
  }
}

(window as any).game = new Game();
