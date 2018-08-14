// Question

export class Question {
  private number1: number;
  private number2: number;
  private operator: string;
  public result: number;

  constructor({ start = 0, end = 0, operator = '+' } = {}) {
    this.operator = operator || '+';
    this.number1 = start || 10;
    this.number2 = end || 2;
    this.result = start + end;
  }

  public getText(): string {
    return `${this.number1} ${this.operator} ${this.number2} =`;
  }
}
