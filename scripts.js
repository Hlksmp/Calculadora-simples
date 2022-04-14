const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document. querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]");
const allClearbutton = document.querySelector("[data-all-clear]");
const previousOperandTextelement = document.querySelector("[data-previous-operand]");
const currentOperandTextelement = document.querySelector("[data-current-operand]");

class Calculator{
    constructor(previousOperandTextelement, currentOperandTextelement){
        this.previousOperandTextelement = previousOperandTextelement;
        this.currentOperandTextelement = currentOperandTextelement;
        this.clear()

    }

    formatDisplayNumber(number){
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        
        let integerDisplay;

        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate(){
        let result;
        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);
        if (isNaN(_previousOperand)|| isNaN(_currentOperand)) return;

        switch(this.operation){
            case '+':
                result = _previousOperand + _currentOperand;
            break;
            case '-':
            result = _previousOperand - _currentOperand;
            break;
            case '÷':
            result = _previousOperand / _currentOperand;
            break;
            case '*':
                result = _previousOperand * _currentOperand;
            break;
            default:
                return;    
                
        }

        this.currentOperand = result;
        this.operation = undefined
        this.previousOperand = ''
    }

    choosOperation(operation){
        if(this.currentOperand ==='') return;
        if(this.previousOperand != ''){
            this.calculate()
        }
        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    appendNumber(number){
        if(this.currentOperand.includes('.') && number==='.') return;
     this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
 updateDisplay() {
     this.previousOperandTextelement.innerText = `${this.previousOperand} ${this.operation ||''}`;
     this.currentOperandTextelement.innerText = this.formatDisplayNumber(this.currentOperand);
    
    }
}

const calculator = new Calculator(previousOperandTextelement, currentOperandTextelement);

for(const numberButton of numberButtons){
    numberButton.addEventListener('click', () =>{
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}

for(const operationButton of operationButtons){
operationButton.addEventListener("click",() => {
    calculator.choosOperation(operationButton.innerText)
    calculator.updateDisplay();
})
}

allClearbutton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click', () =>{
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})