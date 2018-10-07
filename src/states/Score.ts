// Game score

import * as Phaser from 'phaser-ce';
import { Constants } from '../utils/Constants';
import { Global } from '../utils/Global';

/**
 * @summary Score state of the game
 */
export class ScoreState extends Phaser.State {
  public preload(): void {
    const centerX = this.game.world.centerX;
    const centerY = this.game.world.centerY;

    const background = this.game.add.sprite(centerX, centerY, 'background');
    background.anchor.setTo(0.5, 0.5);
    background.width = this.game.width;
    background.height = this.game.height;

    const btnRestart = this.game.add.button(
        centerX - 100, centerY, 'btnRestart', this.handleRestart, this);
    btnRestart.width = 100;
    btnRestart.height = 100;
    btnRestart.anchor.setTo(0.5, 0.5);

    const btnHome = this.game.add.button(
      centerX + 100, centerY, 'btnHome', this.handleHome, this);
    btnHome.width = 100;
    btnHome.height = 100;
    btnHome.anchor.setTo(0.5, 0.5);

    const banner = this.game.add.text(centerX, centerY - 200, `Score: ${Global.score}`, null);
    banner.fontSize = Constants.FONT_SIZE_MD;
    banner.font = Constants.FONT_MAIN;
    banner.anchor.setTo(0.5, 0.5);
  }

  private handleRestart() {
    this.state.start('Game');
  }
  private handleHome() {
    this.state.start('Splash');
  }
}
