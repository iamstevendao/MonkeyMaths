// Obstacle

import * as Phaser from 'phaser-ce';
import { Question } from '../utils/Question';
import { Helpers } from '../utils/Helpers';

/**
 * @summary Obstacle sprite
 */
export class Obstacle extends Phaser.Text {
  /**
   * @summary Question
   */
  public question: Question;
  private route: number = 1;

  constructor(
    public game: any,
    public x: number,
    public y: number,
    public text: string = '',
  ) {
    super(game, x, y, text);
    this.initialize();
    this.updateY();
  }

  /**
   * @summary Initialize attributes of the obstacle
   * @private
   */
  private initialize(): void {
    this.game.physics.arcade.enable(this);
    this.font = 'Bangers';
    this.fontSize = 40;
    this.padding.setTo(20, 20);
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
   * @summary Update route for the obstacle
   * @public
   */
  public setRoute(route): void {
    this.route = route;
    this.updateY();
  }

  /**
   * @summary Update Y based on current route
   * @private
   */
  private updateY(): void {
    this.y = Helpers.getYByRoute(this.game, this.route);
  }
}
