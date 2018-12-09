// Helpers

import { Config } from './Config';
import { Constants } from './Constants';
import { Global } from './Global';

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

  /**
   * Get Y (coordinate) by route id
   * @param index route id
   */
  public static getYByRoute(index: number): number {
    return index === 1 ? Config.routeOneY : Config.routeTwoY;
  }

  /**
   * Get speed (questions per mins)
   */
  public static getSpeed(): number {
    return Constants.DIFFICULTY_SPEED[Global.difficulty - 1];
  }

  /**
   * Get range (A, B or C) of current difficulty
   */
  public static getRange(): string {
    return Constants.DIFFICULTY_RANGE[Global.difficulty - 1];
  }
}
