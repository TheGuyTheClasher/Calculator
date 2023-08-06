import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  equation = '0';
  isFloat = false;
  isInit = true;
  isOff = false;

  concatOperator(operator: string) {
    if(this.isOff) return
    if (operator === 'AC') {
      this.equation = '0';
      this.isInit = true;
    } else {
      if (!this.equation[this.equation.length - 1].match(/[-+*/]/)) {
        this.equation += operator;
        this.isFloat = false;
      }
    }
  }

  command(command: string) {
    if (command === 'Off') {
      if (!this.isOff) {
        this.isOff = true;
      } else {
        this.isOff = false;
      }
    } else if (command === '%') {
      if(this.isOff) return
      if (!this.equation[this.equation.length - 1].match('%')) {
        this.equation += '%';
      }
    } else if (command === 'DEL') {
      if(this.isOff) return
      if (this.equation.length === 1) {
        this.equation = '0';
        this.isInit = true;
      } else {
        this.equation = this.equation.substring(0, this.equation.length - 1);
      }
    }
  }

  addDecimal() {
    if(this.isOff) return
    this.isFloat = true;
    this.equation += '.';
  }

  updateCurrNum(num: string) {
    if(this.isOff) return
    if (this.isInit) {
      this.equation = num;
      this.isInit = false;
    } else {
      this.equation += num;
    }
  }

  calculate() {
    if(this.isOff) return
    try {
      this.equation = eval(this.equation).toString();
    } catch (error) {
      this.equation = 'Error';
    }
  }

}
