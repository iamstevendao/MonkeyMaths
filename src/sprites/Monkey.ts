import * as Phaser from 'phaser-ce';

export class Monkey extends Phaser.Sprite {
  public path: number = 1; // 1, 2
  private y1: number = this.game.world.centerY / 4;
  private y2: number = this.game.world.centerY;

  constructor(
    public game: any,
    public x: number,
    public y: number,
    public key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture,
  ) {
    super(game, x, y, key);
    this.y = this.y1;
    this.key = this.key;
    game.physics.arcade.enable(this);
    this.body.velocity.x = 200;
  }

  public overcome(): void {
    this.path = this.path === 1 ? 2 : 1;
    this.y = this.path === 1 ? this.y1 : this.y2;
  }

  public hit(): void {
    setTimeout(() => this.body.velocity.x = 300, 1000);
  }
}
