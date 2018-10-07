// Main

import 'pixi';
import 'p2';
import * as Phaser from 'phaser-ce';
import { BootState } from './states/Boot';
import { PreloadState } from './states/Preload';
import { SplashState } from './states/Splash';
import { GameState } from './states/Game';
import { ScoreState } from './states/Score';
import { Config } from './utils/Config';

class Game extends Phaser.Game {
  constructor() {
    const config = new Config();
    super(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState);
    this.state.add('Preload', PreloadState);
    this.state.add('Splash', SplashState);
    this.state.add('Score', ScoreState);
    this.state.add('Game', GameState);

    this.state.start('Boot');
  }
}

(window as any).game = new Game();
