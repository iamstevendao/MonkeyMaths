// Question

const operators = [{
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

function random(to, from = 0): number {
  return Math.floor(Math.random() * to + from);
}

export class Question {
  private number1: number;
  private number2: number;
  private operator: any;
  private result: string;

  constructor() {
    this.operator = operators[random(operators.length)];
    this.generateNumbers();
    this.result = this.operator.method(this.number1, this.number2);
  }

  private generateNumbers() {
    switch (this.operator.sign) {
      case '+':
        this.number1 = random(10);
        this.number2 = random(10);
        break;
      case '-':
        this.number2 = random(10);
        this.number1 = random(20, this.number2);
        break;
      case '*':
        this.number1 = random(5);
        this.number2 = random(5);
        break;
      case '/':
        this.number2 = random(5, 1);
        this.number1 = this.number2 * random(5);
        break;
      default:
        break;
    }
  }

  public getText(): string {
    return `${this.number1} ${this.operator.sign} ${this.number2} =`;
  }

  public getResult(): string {
    return this.result.toString();
  }
}
