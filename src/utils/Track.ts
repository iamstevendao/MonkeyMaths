// Track

/**
 * @summary Track
 */
export class Track {
  private numOfCorrect: number = 0;
  private numOfIncorrect: number = 0;
  private score: number = 0;
  private level: number = 1;
  private chain: number = 0;

  /**
   * @summary Getter and setter
   */
  public getScore(): number {
    return this.score;
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
    this.updateMechanism();
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
    this.updateMechanism();
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
  private updateMechanism(): void {
    if (this.chain <= -2) {
      this.reduceLevel();
      return;
    }

    if (this.chain >= 2) {
      this.level += 1;
      this.score = this.chain - 1;
      return;
    }
    this.score += 1;
  }
}
