export class Paycheck {
  income: number[];
  deductions: number[];
  get total(): number {
    let totalIncome = this.income.reduce((prev, cur) => { return prev+cur; }, 0);
    let totalDeductions = this.deductions.reduce((prev, cur) => { return prev+cur; }, 0);
    return totalIncome - totalDeductions;
  }

  constructor(income: number[], deductions: number[]) {
    this.income = income;
    this.deductions = deductions;
  }
}
