// Game splash

import * as Phaser from 'phaser-ce';
import * as ImageMushroom from '../assets/img/mushroom.png';

/**
 * @summary Splash state of the game
 */
export class SplashState extends Phaser.State {

  /**
   * @summary Loader for background
   */
  public loaderBg: any;
  /**
   * @summary Loader for loading bar
   */
  public loaderBar: any;

  /**
   * @summary Preload the game
   */
  public preload(): void {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    this.centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    this.load.image('monkey', ImageMushroom);
  }

  /**
   * @summary Create state
   */
  public create(): void {
    this.state.start('Game');
  }

  /**
   * @summary Center game objects initialized from preload
   * @param objects
   */
  private centerGameObjects(objects: any): void {
    objects.forEach((object: any) => {
      object.anchor.setTo(0.5);
    });
  }
}
