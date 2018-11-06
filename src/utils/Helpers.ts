// Helpers

import { Config } from './Config';

/**
 * @summary Helpers class
 */
export abstract class Helpers {
  /**
   * @summary Short-hand function to get a quick random number
   * @param {number} to
   * @param {number} [from=0]
   *
   * @return {number}
   */
  public static random(to: number, from: number = 0): number {
    return Math.floor(Math.random() * to + from);
  }

  /**
   * @summary List of operators using in the questions
   */
  public static operators = [{
    sign: '+',
    name: 'plus',
    method: (a, b) => (a + b),
  }, {
    sign: '-',
    name: 'minus',
    method: (a, b) => (a - b),
  }, {
    sign: '/',
    name: 'divide',
    method: (a, b) => Math.floor(a / b),
  }, {
    sign: '*',
    name: 'times',
    method: (a, b) => (a * b),
  }];

  public static getYByRoute(index: number): number {
    return index === 1 ? Config.routeOneY : Config.routeTwoY;
  }
}
