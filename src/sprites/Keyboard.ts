// Keyboard

import * as Phaser from 'phaser-ce';
import { Config } from '../utils/Config';
import { Constants } from '../utils/Constants';

/**
 * @summary Keyboard
 */
export class Keyboard extends Phaser.Group {
  /**
   * @summary Keys
   */
  public onKeyPress: (key: string) => void;

  constructor(
    public game: any,
    public keyboardPosition: string = 'right',
  ) {
    super(game);
    this.initialize(keyboardPosition);
  }

  /**
   * @summary Initialize attributes of monkey
   * @private
   */
  private initialize(position: string): void {
    // tslint:disable-next-line:prefer-array-literal
    const keys = [...new Array(9).fill('').map((n, i) => i + 1), 0, 'Delete'];
    keys.forEach((key, index) => {
      const button = this.game.add.button(
        this.getCoordinates(index).x,
        this.getCoordinates(index).y,
        `key${key}`,
        () => this.onKeyPress((index + 1).toString()),
      );
      button.fixedToCamera = true;
      this.add(button);
    });
    this.game.add.group(this);
    const point = this.getPosition(position);
    this.position.set(point.x, point.y);
  }

  private getCoordinates(index: number): { x: number, y: number } {
    return {
      x: (index % 3) * (Constants.KEYBOARD_WIDTH / 3),
      y: Math.floor(index / 3) * (Constants.KEYBOARD_WIDTH / 3),
    };
  }

  private getPosition(position: string): { x: number, y: number} {
    switch (position) {
      case 'right':
      default:
        return { x: Config.gameWidth - Constants.KEYBOARD_WIDTH, y: 100 };
    }
  }
}
