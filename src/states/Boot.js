import Phaser from 'phaser';
import WebFont from 'webfontloader';
import background from '../assets/img/loader-bg.png';
import bar from '../assets/img/loader-bar.png';

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#EDEEC9';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Bangers'],
      },
      active: this.fontsLoaded,
    });

    const text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', background);
    this.load.image('loaderBar', bar);
  }

  render() {
    if (this.fontsReady) {
      this.state.start('Splash');
    }
  }

  fontsLoaded() {
    this.fontsReady = true;
  }
}
