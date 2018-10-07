// Game splash

import * as Phaser from 'phaser-ce';
import { Constants } from '../utils/Constants';

/**
 * @summary Splash state of the game
 */
export class SplashState extends Phaser.State {

  /**
   * @summary Loader for background
   */
  public background: any;
  /**
   * @summary Play button
   */
  public btnPlay: any;
  /**
   * @summary Banner
   */
  public banner: any;
  /**
   * @summary Preload the game
   */
  public preload(): void {
    const centerX = this.game.world.centerX;
    const centerY = this.game.world.centerY;

    this.background = this.game.add.sprite(centerX, centerY, 'background');
    this.background.anchor.setTo(0.5, 0.5);
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    this.btnPlay = this.game.add.button(centerX, centerY, 'btnPlay', this.handlePlay, this);
    this.btnPlay.anchor.setTo(0.5, 0.5);

    const bannerText = 'Monkey Maths by Starmaths';
    this.banner = this.add.text(this.game.width / 2, this.game.height - 80, bannerText, null);
    this.banner.fontSize = Constants.FONT_SIZE_MD;
    this.banner.font = Constants.FONT_MAIN;
    this.banner.anchor.setTo(0.5, 0.5);
  }

  private handlePlay() {
    this.state.start('Game');
  }
}
