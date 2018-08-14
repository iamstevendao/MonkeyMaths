import * as Phaser from 'phaser-ce';

export class Monkey extends Phaser.Sprite {
  constructor(
    public game: any,
    public x: number,
    public y: number,
    public key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture,
  ) {
    super(game, x, y, key);
    this.key = this.key;
    game.physics.arcade.enable(this);
    this.body.velocity.x = 300;
  }

  public overcome(): void {

  }

  public hit(): void {
    setTimeout(() => this.body.velocity.x = 300, 1000);
    console.log('hit the obstacle');
  }
}
