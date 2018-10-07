// Boot

import * as Phaser from 'phaser-ce';
import * as WebFont from 'webfontloader';
import * as LoaderBackground from '../assets/img/loader-bg.png';
import * as LoaderBar from '../assets/img/loader-bar.png';

/**
 * @summary BootState
 */
export class BootState extends Phaser.State {
  /**
   * @summary Check if the font is fully loaded
   */
  public fontsReady: boolean;

  /**
   * @summary Initialize state
   */
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

    const text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      'loading fonts',
      { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', LoaderBackground);
    this.load.image('loaderBar', LoaderBar);
  }

  /**
   * @summary When the font is ready, show splash state
   */
  public render(): void {
    if (this.fontsReady) {
      this.state.start('Splash');
    }
  }

  /**
   * @summary Handler for the WebFont activation
   */
  public fontsLoaded(): void {
    this.fontsReady = true;
  }
}
