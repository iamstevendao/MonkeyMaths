// Answer

/**
 * @summary The answer from the user
 */
export class Answer extends Phaser.Text {
  /**
   *
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   * @param {string} [text]
   */
  constructor(
    public game: Phaser.Game,
    public x: number,
    public y: number,
    public text: string = '',
  ) {
    super(game, x, y, text);
    // Set style
    this.fixedToCamera = true;
    this.y = this.game.height / 2;
    this.x = this.game.width / 2;
    this.font = 'Bangers';
    this.padding.set(10, 16);
    this.fontSize = 100;
    this.fill = '#ff0000';
    this.smoothed = false;
    this.anchor.setTo(0.5);
  }

  /**
   * @summary Return answer
   * @public
   *
   * @return {string}
   */
  public getText(): string {
    return this.text;
  }

  /**
   * @summary Concat a character (number) to the current answer
   * @param {string} character
   */
  public concat(character: string): void {
    this.text = `${this.text}${character}`;
    this.visible = true;
  }

  /**
   * @summary Delete current answer
   */
  public delete(): void {
    this.text = '';
    this.visible = false;
  }
}
