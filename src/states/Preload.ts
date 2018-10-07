// Preload

import * as Phaser from 'phaser-ce';
import * as ImageMushroom from '../assets/img/mushroom.png';
import * as ImageBtnPlay from '../assets/img/btnPlay.png';

/**
 * @summary PreloadState
 */
export class PreloadState extends Phaser.State {
  public loadText: Phaser.Text;

  /**
   * @summary Loader for background
   */
  public background: any;
  /**
   * @summary Loader for background
   */
  public loaderBg: any;
  /**
   * @summary Loader for loading bar
   */
  public loaderBar: any;
  /**
   * @summary Initialize state
   */
  public init(): void {
    this.stage.backgroundColor = '#EDEEC9';
  }

  /**
   * @summary Preload
   */
  public preload(): void {
    const centerX = this.game.world.centerX;
    const centerY = this.game.world.centerY;

    this.background = this.game.add.sprite(centerX, centerY, 'background');
    this.background.anchor.setTo(0.5, 0.5);
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    this.loadText = this.add.text(centerX, centerY, 'loading ', {
      font: 'Press Start 2P',
      fontSize: 25,
      fill: '#ff0000',
    });
    this.loadText.anchor.setTo(0.5, 0.5);

    this.load.image('monkey', ImageMushroom);
    this.load.image('btnPlay', ImageBtnPlay);
  }

  /**
   * @summary When the font is ready, show splash state
   */
  public render(): void {
    this.state.start('Splash');
  }

  public loadUpdate(): void {
    this.loadText.text = `loading ${this.load.progress}%`;
  }
}
