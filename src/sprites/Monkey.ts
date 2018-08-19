// Monkey

import * as Phaser from 'phaser-ce';
import { Constants } from '../utils/Constants';
import { Helpers } from '../utils/Helpers';

/**
 * @summary Monkey sprite
 */
export class Monkey extends Phaser.Sprite {
  /**
   * @summary Current path of monkey, can be 1 or 2
   */
  public route: number = 1;

  constructor(
    public game: any,
    public x: number,
    public y: number,
    public key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture,
  ) {
    super(game, x, y, key);
    this.initialize();
    this.updateY();
  }

  /**
   * @summary Initialize attributes of monkey
   * @private
   */
  private initialize(): void {
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = 200;
  }

  /**
   * @summary Handle event when Monkey overcomes an obstacle
   * @public
   */
  public overcome(): void {
    this.route = this.route === 1 ? 2 : 1;
    this.updateY();
    this.updateSpeed();
  }

  /**
   * @summary Update Y based on current route
   * @private
   */
  private updateY(): void {
    this.y = Helpers.getYByRoute(this.game, this.route);
  }

  /**
   * @summary Update monkey speed
   * @private
   *
   * @param {Boolean} [increasing=true]
   */
  private updateSpeed(increasing: boolean = true): void {
    let newVelocity = this.body.velocity.x + Constants.VELOCITY_GAP * (increasing ? 1 : -1);
    if (newVelocity > Constants.VELOCITY_MAX) {
      newVelocity = Constants.VELOCITY_MAX;
    } else if (newVelocity < Constants.VELOCITY_MIN) {
      newVelocity = Constants.VELOCITY_MIN;
    }
    this.body.velocity.x = newVelocity;
  }

  /**
   * @summary Handle collision event of monkey and obstacle
   * @public
   */
  public hit(): void {
    setTimeout(() => this.updateSpeed(false), 800);
  }
}
