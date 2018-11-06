// Game splash

import * as Phaser from 'phaser-ce';
import { Constants } from '../utils/Constants';

/**
 * @summary Splash state of the game
 */
export class SplashState extends Phaser.State {
  public preload(): void {
    const centerX = this.game.world.centerX;
    const centerY = this.game.world.centerY;

    const background = this.game.add.sprite(centerX, centerY, 'background');
    background.anchor.setTo(0.5, 0.5);
    background.width = this.game.width;
    background.height = this.game.height;

    const btnPlay = this.game.add.button(centerX, centerY, 'btnPlay', this.handlePlay, this);
    btnPlay.anchor.setTo(0.5, 0.5);

    const bannerText = 'Monkey Maths by Starmaths';
    const banner = this.add.text(this.game.width / 2, this.game.height - 80, bannerText, null);
    banner.fontSize = Constants.FONT_SIZE_MD;
    banner.font = Constants.FONT_MAIN;
    banner.anchor.setTo(0.5, 0.5);
  }

  private handlePlay() {
    this.state.start('Menu');
  }
}
