// Question

export class Question {
  private number1: number;
  private number2: number;
  private operator: string;
  private answer: string;

  constructor({ start = 0, end = 0, operator = '+' } = {}) {
    this.operator = operator || '+';
    this.number1 = start || 10;
    this.number2 = end || 2;
    this.answer = (this.number1 + this.number2).toString();
  }

  public getText(): string {
    return `${this.number1} ${this.operator} ${this.number2} =`;
  }

  public getAnswer(): string {
    return this.answer;
  }
}
