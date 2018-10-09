// Preload

import * as Phaser from 'phaser-ce';
import * as ImageMonkey from '../assets/img/monkey.png';
import * as ImageBtnPlay from '../assets/img/btnPlay.png';
import * as ImageBtnRestart from '../assets/img/btnRestart.png';
import * as ImageBtnHome from '../assets/img/btnHome.png';
import * as ImageObstacle from '../assets/img/obstacle.png';
import { Constants } from '../utils/Constants';

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

    this.background = this.game.add.sprite(0, 0, 'background');
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    this.loadText = this.add.text(centerX, centerY, 'loading ', {
      font: Constants.FONT_MAIN,
      fontSize: Constants.FONT_SIZE_MD,
      fill: '#ff0000',
    });
    this.loadText.anchor.setTo(0.5, 0.5);

    this.load.image('monkey', ImageMonkey);
    this.load.image('btnPlay', ImageBtnPlay);
    this.load.image('btnRestart', ImageBtnRestart);
    this.load.image('btnHome', ImageBtnHome);
    this.load.image('obstacle', ImageObstacle);
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
