// Monkey

import * as Phaser from 'phaser-ce';
import { Constants } from '../utils/Constants';
import { Helpers } from '../utils/Helpers';
import { Config } from '../utils/Config';

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
  ) {
    super(game, x, y, 'monkey');
    this.initialize();
    this.updateY();
  }

  /**
   * @summary Initialize attributes of monkey
   * @private
   */
  private initialize(): void {
    this.game.physics.arcade.enable(this);
    this.animations.add('walk');
    this.animations.play('walk', 30, true);
    this.updateSpeed();
    const ratio = Config.routeHeight / this.height;
    this.scale.setTo(ratio, ratio);
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
    const newY = Helpers.getYByRoute(this.route);
    const distance = newY - this.y;
    const velocityY = (distance > 0 ? 2 : -2) * this.body.velocity.x;
    const timeOut = Math.abs((distance * 1000) / velocityY);
    this.body.velocity.y = velocityY;
    setTimeout(() => { this.body.velocity.y = 0; }, timeOut);
  }

  /**
   * @summary Update monkey speed
   */
  private updateSpeed(): void {
    const questionsPerMins = Helpers.getSpeed();
    this.body.velocity.x = (Constants.DISTANCE_OBSTACLES * questionsPerMins) / 60;
  }

  /**
   * @summary Handle collision event of monkey and obstacle
   * @public
   */
  public hit(): void {
    setTimeout(() => this.updateSpeed(), 800);
  }
}
