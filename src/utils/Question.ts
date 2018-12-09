// Question

import { Helpers } from './Helpers';
import { Global } from './Global';
import { Config } from './Config';
import { Constants } from './Constants';

/**
 * @summary Question class
 */
export class Question {
  /**
   * @summary First number in the left side of the operation
   */
  private number1: number;
  /**
   * @summary Second number in the left hand side of the operation
   */
  private number2: number;
  /**
   * @summary Operator, is an object random from Helpers.operators
   */
  private operator: any;
  /**
   * @summary Result
   */
  private result: number;

  /**
   * @summary Constructor, take no argument
   */
  constructor() {
    // Random an operator
    if (Global.type === 'combination') {
      const operatorIndex = Helpers.random(Helpers.operators.length);
      this.operator = Helpers.operators[operatorIndex];
    } else {
      this.operator = Helpers.operators.find(op => op.name === Global.type);
    }

    // Generate the first and second number
    this.generateNumbers();

    // Calculate the result
    this.result = this.operator.method(this.number1, this.number2);
  }

  /**
   * @summary Generate 2 numbers for the question based on the operator
   * @private
   */
  private generateNumbers(): void {
    const { x: [xFrom, xTo], y: [yFrom, yTo] } = this.getXAndY();

    switch (this.operator.sign) {
      case '+':
        this.number1 = Helpers.random(xTo, xFrom);
        this.number2 = Helpers.random(yTo, yFrom);
        break;
      case '-':
        this.number2 = Helpers.random(xTo, xFrom);
        this.number1 = Helpers.random(xTo + yTo, this.number2);
        break;
      case '*':
        this.number1 = Helpers.random(xTo, xFrom);
        this.number2 = Helpers.random(yTo, yFrom);
        break;
      case '/':
        this.number2 = Helpers.random(yTo, yFrom);
        this.number1 = this.number2 * Helpers.random(xTo, xFrom);
        break;
      default:
        break;
    }
  }

  /**
   * Get X and Y of the question based on current difficulty and level
   */
  private getXAndY(): { x: [number, number], y: [number, number]} {
    const part = this.operator === '+' || this.operator === '-' ? 'addition' : 'multiplication';
    return Constants.RANGES[Global.level + 1][part][Helpers.getRange()];
  }

  /**
   * @summary Get question text
   * @public
   *
   * @return {string}
   */
  public getText(): string {
    return `${this.number1} ${this.operator.sign} ${this.number2}`;
  }

  /**
   * @summary Get result
   * @public
   *
   * @return {string}
   */
  public getResult(): string {
    return this.result.toString();
  }
}
