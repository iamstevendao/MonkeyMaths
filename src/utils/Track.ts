// Track

import { Global } from './Global';

/**
 * @summary Track
 */
export class Track {
  private numOfCorrect: number = 0;
  private numOfIncorrect: number = 0;
  private level: number = 1;
  private chain: number = 0;

  /**
   * @summary Getter and setter
   */
  public getScore(): number {
    return Global.score;
  }

  public getLevel(): number {
    return this.level;
  }

  public getNumOfCorrect(): number {
    return this.numOfCorrect;
  }

  public getNumOfInCorrect(): number {
    return this.numOfIncorrect;
  }

  /**
   * @summary Handle the event where user puts a correct answer
   * @public
   */
  public onCorrect(): void {
    this.numOfCorrect += 1;
    if (this.chain < 0) {
      this.chain = 1;
    } else {
      this.chain += 1;
    }
    this.updateMechanism(true);
  }

  /**
   * @summary Handle the event where user puts a failed answer
   * @public
   */
  public onIncorrect(): void {
    this.numOfIncorrect += 1;
    if (this.chain > 0) {
      this.chain = -1;
    } else {
      this.chain -= 1;
    }
    this.updateMechanism(false);
  }

  private reduceLevel(): void {
    if (this.level <= 1) {
      return;
    }
    this.level -= 1;
  }

  /**
   * @summary Update game mechanism
   * @private
   */
  private updateMechanism(isCorrect: Boolean): void {
    let addingScore = isCorrect ? 1 : - 1;
    // If chain is more than 1, add it along with adding score
    if (this.chain >= 1) {
      addingScore += this.chain - 1;
    }

    if (this.chain <= -2) {
      this.reduceLevel();
    } else if (this.chain >= 2) {
      this.level += 1;
    }

    // If score cant be reduce anymore
    if (Global.score <= 0 && addingScore < 0) {
      return;
    }

    // Otherwise add to the score
    Global.score += addingScore;
  }
}
