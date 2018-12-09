// Track

import { Global } from './Global';

/**
 * @summary Track
 */
export class Track {
  private numOfCorrect: number = 0;
  private numOfIncorrect: number = 0;
  private lastTen: number[] = [];

  /**
   * @summary Getter and setter
   */
  public getScore(): number {
    return Global.score;
  }

  public getLevel(): number {
    return Global.level;
  }

  public getDifficulty(): number {
    return Global.difficulty;
  }

  public getLastTen(): number[] {
    return this.lastTen;
  }

  public getNumOfCorrect(): number {
    return this.numOfCorrect;
  }

  public getNumOfInCorrect(): number {
    return this.numOfIncorrect;
  }

  private increaseScore(score: number): void {
    if (Global.score === 0 && score < 0) {
      return;
    }
    Global.score += score;
  }

  /**
   * @summary Handle the event where user puts a correct answer
   * @public
   */
  public onCorrect(): void {
    this.pushToLastTen(1);
    this.numOfCorrect += 1;
    this.updateMechanism(true);
  }

  /**
   * Push current result (1 or 0) to last ten question
   * @param number 1 or 0
   */
  private pushToLastTen(number): void {
    this.lastTen.push(number);
    if (this.lastTen.length > 10) {
      this.lastTen.unshift();
    }
  }

  /**
   * Get the percentage of correctness in the last 10 questions
   */
  private getPercentageOfLastTen(): number {
    // If last 4 questions are wrong
    if (this.lastTen.slice(-4).join('') === '0000') {
      return 0;
    }
    // If last 8 questions are correct
    if (this.lastTen.slice(-8).join('') === '11111111') {
      return 1;
    }
    if (this.lastTen.length < 10) {
      return -1;
    }
    return this.lastTen.reduce((prv, crr) => prv + (crr || 0), 0) / 10;
  }

  /**
   * @summary Handle the event where user puts a failed answer
   * @public
   */
  public onIncorrect(): void {
    this.pushToLastTen(0);
    this.numOfIncorrect += 1;
    this.updateMechanism(false);
  }

  private increaseDifficulty(): void {
    // Bonus score
    this.increaseScore((Global.level * 10) * Global.difficulty);

    // IF difficulty is maximum
    if (Global.difficulty === 5) {
      return this.increaseLevel();
    }
    Global.difficulty += 1;
  }

  private reduceDifficulty(): void {
    // IF difficulty is minimum
    if (Global.difficulty === 1) {
      return this.reduceLevel();
    }
    Global.difficulty -= 1;
  }

  private increaseLevel(): void {
    // Maximum level
    if (Global.level === 6) {
      return;
    }
    Global.level += 1;
    Global.difficulty = 1;
  }

  private reduceLevel(): void {
    if (Global.level <= 1) {
      return;
    }
    Global.level -= 1;
    Global.difficulty = 5;
  }

  /**
   * @summary Update game mechanism
   * @private
   */
  private updateMechanism(isCorrect: Boolean): void {
    const percentage = this.getPercentageOfLastTen();

    // If percentage is not enough to calculate
    if (percentage < 0) {
      return this.increaseScore(isCorrect ? 1 : -1);
    }

    if (percentage >= 0.8) {
      return this.increaseDifficulty();
    }

    if (percentage <= 0.4) {
      return this.reduceDifficulty();
    }
  }
}
