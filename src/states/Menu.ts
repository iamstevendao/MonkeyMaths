// Game menu

import * as Phaser from 'phaser-ce';
import { Constants } from '../utils/Constants';

/**
 * @summary Menu state of the game
 */
export class MenuState extends Phaser.State {
  public preload(): void {
    const centerX = this.game.world.centerX;
    const centerY = this.game.world.centerY;
    const gWidth = this.game.width;
    const gHeight = this.game.height;

    const background = this.game.add.sprite(centerX, centerY, 'background');
    background.anchor.setTo(0.5, 0.5);
    background.width = this.game.width;
    background.height = this.game.height;

    const typeText = this.add
      .text(gWidth / 2, centerY - 100, 'Choose type', null);
    typeText.fontSize = Constants.FONT_SIZE_MD;
    typeText.font = Constants.FONT_MAIN;
    typeText.anchor.setTo(0.5, 0.5);

    const btnPlus = this.game.add
      .button(gWidth / 6, centerY, 'btnPlus', () => this.play('plus'), this);
    btnPlus.anchor.setTo(0.5, 0.5);

    const btnMinus = this.game.add
      .button(gWidth / 3, centerY, 'btnMinus', () => this.play('minus'), this);
    btnMinus.anchor.setTo(0.5, 0.5);

    const btnTimes = this.game.add
      .button(gWidth / 2, centerY, 'btnTimes', () => this.play('times'), this);
    btnTimes.anchor.setTo(0.5, 0.5);

    const btnDivide = this.game.add
      .button(gWidth * 2 / 3, centerY, 'btnDivide', () => this.play('divide'), this);
    btnDivide.anchor.setTo(0.5, 0.5);

    const btnCombination = this.game.add
      .button(gWidth * 5 / 6, centerY, 'btnCombination', () => this.play('combination'), this);
    btnCombination.anchor.setTo(0.5, 0.5);

    const bannerText = 'Monkey Maths by Starmaths';
    const banner = this.add.text(gWidth / 2, gHeight - 80, bannerText, null);
    banner.fontSize = Constants.FONT_SIZE_MD;
    banner.font = Constants.FONT_MAIN;
    banner.anchor.setTo(0.5, 0.5);
  }

  private play(type: String) {
    this.state.start('Game');
  }
}
