// Helpers

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
    method: (a, b) => (a + b),
  }, {
    sign: '-',
    method: (a, b) => (a - b),
  }, {
    sign: '/',
    method: (a, b) => Math.floor(a / b),
  }, {
    sign: '*',
    method: (a, b) => (a * b),
  }];

  public static getYByRoute(game: any, index: number): number {
    let y = game.world.centerY / 4;
    if (index === 2) {
      y = game.world.centerY / 2;
    }
    return y;
  }
}
