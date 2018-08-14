import * as Phaser from 'phaser-ce';
import { Question } from '../utils/Question';

export class Obstacle extends Phaser.Text {
  public question: Question;

  constructor(
    public game: any,
    public x: number,
    public y: number,
    public text: string = 'hello',
  ) {
    super(game, x, y, text, { font: '65px Arial', fill: '#ff0044', align: 'center' });
    game.physics.arcade.enable(this);
    this.question = new Question();
    this.text = this.question.getText();
  }
}
