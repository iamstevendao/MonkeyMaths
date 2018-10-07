// Boot

import * as Phaser from 'phaser-ce';
import * as WebFont from 'webfontloader';
import * as Background from '../assets/img/background.png';

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
        families: ['Press Start 2P'],
      },
      active: this.fontsLoaded,
    });

    this.load.image('background', Background);
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
