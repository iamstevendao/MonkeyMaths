// Preload

import * as Phaser from 'phaser-ce';
import * as ImageMonkey from '../assets/monkey/monkey.png';
import * as ImageBtnPlay from '../assets/buttons/btnPlay.png';
import * as ImageBtnRestart from '../assets/buttons/btnRestart.png';
import * as ImageBtnHome from '../assets/buttons/btnHome.png';
import * as ImageDivide from '../assets/buttons/imgDivide.png';
import * as ImageMinus from '../assets/buttons/imgMinus.png';
import * as ImageTimes from '../assets/buttons/imgTimes.png';
import * as ImagePlus from '../assets/buttons/imgPlus.png';
import * as ImageCombination from '../assets/buttons/imgCombination.png';
import * as ImageObstacleBird1 from '../assets/obstacles/bird1.png';
import * as ImageObstacleBird2 from '../assets/obstacles/bird2.png';
import * as ImageObstacleBird3 from '../assets/obstacles/bird3.png';
import * as ImageObstacleBird4 from '../assets/obstacles/bird4.png';
import * as ImageObstacleBird5 from '../assets/obstacles/bird5.png';
import * as ImageObstacleFlower1 from '../assets/obstacles/flower1.png';
import * as ImageObstacleSeahorse1 from '../assets/obstacles/seahorse1.png';
import * as ImageObstacleTreasure1 from '../assets/obstacles/treasure1.png';
import * as ImageObstacleTurtle1 from '../assets/obstacles/turtle1.png';
import * as ImageKey1 from '../assets/keys/1.png';
import * as ImageKey2 from '../assets/keys/2.png';
import * as ImageKey3 from '../assets/keys/3.png';
import * as ImageKey4 from '../assets/keys/4.png';
import * as ImageKey5 from '../assets/keys/5.png';
import * as ImageKey6 from '../assets/keys/6.png';
import * as ImageKey7 from '../assets/keys/7.png';
import * as ImageKey8 from '../assets/keys/8.png';
import * as ImageKey9 from '../assets/keys/9.png';
import * as ImageKey0 from '../assets/keys/0.png';
import * as ImageKeyDelete from '../assets/keys/delete.png';
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

    this.load.spritesheet('monkey', ImageMonkey.toString(), 360, 545, 34);
    this.load.image('btnPlay', ImageBtnPlay);
    this.load.image('btnRestart', ImageBtnRestart);
    this.load.image('btnHome', ImageBtnHome);
    this.load.image('btnPlus', ImagePlus);
    this.load.image('btnMinus', ImageMinus);
    this.load.image('btnTimes', ImageTimes);
    this.load.image('btnDivide', ImageDivide);
    this.load.image('btnCombination', ImageCombination);
    this.load.image('obstacleBird1', ImageObstacleBird1);
    this.load.image('obstacleBird2', ImageObstacleBird2);
    this.load.image('obstacleBird3', ImageObstacleBird3);
    this.load.image('obstacleBird4', ImageObstacleBird4);
    this.load.image('obstacleBird5', ImageObstacleBird5);
    this.load.image('obstacleFlower1', ImageObstacleFlower1);
    this.load.image('obstacleSeahorse1', ImageObstacleSeahorse1);
    this.load.image('obstacleTreasure1', ImageObstacleTreasure1);
    this.load.image('obstacleTurtle1', ImageObstacleTurtle1);
    this.load.image('key1', ImageKey1);
    this.load.image('key2', ImageKey2);
    this.load.image('key3', ImageKey3);
    this.load.image('key4', ImageKey4);
    this.load.image('key5', ImageKey5);
    this.load.image('key6', ImageKey6);
    this.load.image('key7', ImageKey7);
    this.load.image('key8', ImageKey8);
    this.load.image('key9', ImageKey9);
    this.load.image('key0', ImageKey0);
    this.load.image('keyDelete', ImageKeyDelete);
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
