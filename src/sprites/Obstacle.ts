import * as Phaser from 'phaser-ce';
import { Question } from '../utils/Question';

export class Obstacle extends Phaser.Text {
  public question: Question;
  public answer: string;
  private y1: number = this.game.world.centerY / 4;
  private y2: number = this.game.world.centerY;

  constructor(
    public game: any,
    public x: number,
    public y: number,
    public text: string = '',
  ) {
    super(game, x, y, text, { font: '65px Arial', fill: '#ff0044', align: 'center' });
    this.y = this.y1;
    game.physics.arcade.enable(this);
    this.question = new Question();
    this.text = this.question.getText();
  }

  public setPath(path): void {
    if (path === 1) {
      this.y = this.y1;
    } else {
      this.y = this.y2;
    }
  }
  public getResult(): string {
    return this.question.getResult();
  }
}
