import * as Phaser from 'phaser-ce';
import * as WebFont from 'webfontloader';
import * as LoaderBackground from '../assets/img/loader-bg.png';
import * as LoaderBar from '../assets/img/loader-bar.png';

export class BootState extends Phaser.State {
  public fontsReady: boolean;

  public init(): void {
    this.stage.backgroundColor = '#EDEEC9';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  public preload(): void {
    WebFont.load({
      google: {
        families: ['Bangers'],
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

  public render(): void {
    if (this.fontsReady) {
      this.state.start('Splash');
    }
  }

  public fontsLoaded(): void {
    this.fontsReady = true;
  }
}
