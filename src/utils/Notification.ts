// Notification

import { Constants } from './Constants';
/**
 * @summary The notification to the user
 */
export class Notification extends Phaser.Text {
  public static readonly SO_CLOSE = 'so-close';
  public static readonly STREAK = 'streak';
  private streakText = [
    '',
    '2 in a row',
    '3 in a row',
    '4 in a row',
    '5 in a row',
    '6 in a row',
    '7 in a row',
    '8 in a row',
    '9 in a row',
    '10 in a rowwwww',
  ];
  /**
   *
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   * @param {string} [text]
   */
  constructor(
    public game: Phaser.Game,
    public x: number,
    public y: number,
    public text: string = '',
  ) {
    super(game, x, y, text);
    // Set style
    this.fixedToCamera = true;
    this.y = this.game.height / 2 - 100;
    this.x = this.game.width / 2;
    this.font = Constants.FONT_MAIN;
    this.padding.set(10, 16);
    this.fontSize = Constants.FONT_SIZE_LG;
    this.fill = '#ff0000';
    this.anchor.setTo(0.5);
  }

  /**
   * @summary Return answer
   * @public
   *
   * @return {string}
   */
  public show(type: String, chain?: number): void {
    switch (type) {
      case Notification.SO_CLOSE:
        this.text = 'So closeeeeee';
        this.fill = '#00ff00';
        break;
      case Notification.STREAK:
        if (chain > 2) {
          this.text = this.streakText[chain];
          this.fill = '#00ff00';
        } else if (chain < -2) {
          this.text = 'Try harder !!!!';
          this.fill = '#ff0000';
        }
        break;
    }
    this.visible = true;
    setTimeout(() => { this.visible = false; }, 500);
  }
}
