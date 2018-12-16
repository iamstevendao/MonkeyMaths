// Boot

import * as Phaser from 'phaser-ce';
import * as WebFont from 'webfontloader';
import * as ImgBackground1 from '../assets/background/bg1.png';
import * as ImgBackground2 from '../assets/background/bg2.png';
import * as ImgBackground3 from '../assets/background/bg3.png';
import * as ImgBackground4 from '../assets/background/bg4.png';
import * as ImgBackground5 from '../assets/background/bg5.png';
import { Constants } from '../utils/Constants';

/**
 * @summary BootState
 */
export class BootState extends Phaser.State {
  /**
   * @summary Check if the font is fully loaded
   */
  public fontsReady: boolean;
  public loadText: Phaser.Text;

  public init(): void {
    this.stage.backgroundColor = '#EDEEC9';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  /**
   * @summary Preload
   */
  public preload(): void {
    WebFont.load({
      google: {
        families: [Constants.FONT_MAIN],
      },
      active: this.fontsLoaded,
    });
    const backgrounds = [
      ImgBackground1, ImgBackground2, ImgBackground3, ImgBackground4, ImgBackground5,
    ];

    this.load.image('background', backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }

  /**
   * @summary When the font is ready, show splash state
   */
  public render(): void {
    if (this.fontsReady) {
      this.state.start('Preload');
    }
  }

  /**
   * @summary Handler for the WebFont activation
   */
  public fontsLoaded(): void {
    this.fontsReady = true;
  }
}
