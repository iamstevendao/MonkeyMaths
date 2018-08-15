// Answer

export class Answer extends Phaser.Text {
  constructor(
    public game: any,
    public x: number,
    public y: number,
    public text: string = '',
  ) {
    super(game, x, y, text, { font: '40px Arial', fill: '#ff0044', align: 'center' });
    game.physics.arcade.enable(this);
    this.body.velocity.x = 300;
    this.y = this.game.height / 2;
    this.font = 'Bangers';
    this.padding.set(10, 16);
    this.fontSize = 100;
    this.fill = '#ff0000';
    this.smoothed = false;
    this.anchor.setTo(0.5);
  }

  public getText(): string {
    return this.text;
  }

  public concat(character): void {
    this.text = `${this.text}${character}`;
    this.visible = true;
  }

  public delete(): void {
    this.text = '';
    this.visible = false;
  }
}
