// Obstacle

import * as Phaser from 'phaser-ce';
import { Question } from '../utils/Question';

/**
 * @summary Obstacle sprite
 */
export class Obstacle extends Phaser.Text {
  /**
   * @summary Question
   */
  public question: Question;
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

  /**
   * @summary Check if answer of user is correct or not
   * @param {string} answer
   *
   * @return {boolean}
   */
  public isCorrect(answer: string): boolean {
    return this.question.getResult() === answer;
  }

  /**
   * @summary Set new path for the obstacle
   * @param path
   */
  public setPath(path: number): void {
    if (path === 1) {
      this.y = this.y1;
    } else {
      this.y = this.y2;
    }
  }
}
