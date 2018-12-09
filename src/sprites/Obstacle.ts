// Obstacle

import * as Phaser from 'phaser-ce';
import { Question } from '../utils/Question';
import { Helpers } from '../utils/Helpers';
import { Constants } from '../utils/Constants';
import { Config } from '../utils/Config';

/**
 * @summary Obstacle sprite
 */
export class Obstacle extends Phaser.Sprite {
  /**
   * @summary Question
   */
  public question: Question;

  private questionText: Phaser.Text;
  private route: number = 1;

  constructor(
    public game: any,
    public x: number,
    public y: number,
    public text: string = '',
  ) {
    super(game, x, y, 'obstacle');
    this.initialize(x, y, text);
    this.updateY();
  }

  /**
   * @summary Initialize attributes of the obstacle
   * @private
   */
  private initialize(x: number, y: number, text: string): void {
    this.game.physics.arcade.enable(this);
    const ratio = Config.routeHeight / this.height;
    this.question = new Question();
    this.questionText = this.game.add.text(10, 10, text);
    this.questionText.font = Constants.FONT_MAIN;
    this.questionText.fontSize = Constants.FONT_SIZE_MD + 10;

    this.scale.setTo(ratio, ratio);

    this.addChild(this.questionText);
    this.questionText.text = this.question.getText();
  }

  public updateQuestion() {
    this.question = new Question();
    this.questionText.text = this.question.getText();
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
    this.y = Helpers.getYByRoute(this.route);
  }
}
