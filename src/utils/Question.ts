// Question

import { Helpers } from './Helpers';
import { Global } from './Global';

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
    switch (this.operator.sign) {
      case '+':
        this.number1 = Helpers.random(10);
        this.number2 = Helpers.random(10);
        break;
      case '-':
        this.number2 = Helpers.random(10);
        this.number1 = Helpers.random(20, this.number2);
        break;
      case '*':
        this.number1 = Helpers.random(5);
        this.number2 = Helpers.random(5);
        break;
      case '/':
        this.number2 = Helpers.random(5, 1);
        this.number1 = this.number2 * Helpers.random(5);
        break;
      default:
        break;
    }
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
