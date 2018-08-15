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
    super(game, x, y, text);
    this.y = this.y1;
    game.physics.arcade.enable(this);
    this.font = 'Bangers';
    this.fontSize = 40;
    this.question = new Question();
    this.text = this.question.getText();
  }

  public isCorrect(answer): boolean {
    console.log(answer);
    console.log(this.question.getResult());
    return this.question.getResult() === answer;
  }

  public setPath(path): void {
    if (path === 1) {
      this.y = this.y1;
    } else {
      this.y = this.y2;
    }
  }
}
