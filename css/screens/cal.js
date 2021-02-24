const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();


const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const target = event.target;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            // check if the key is an integer
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
    updateDisplay();

});


/* answer

import "./styles.css";

const result = document.querySelector(".js-result");
const reset = document.querySelector(".js-reset");
const equals = document.querySelector(".js-equals");
const numbers = Array.from(document.querySelectorAll(".js-number"));
const operations = Array.from(document.querySelectorAll(".js-operation"));

let firstValue = "",
  firstDone,
  secondValue = "",
  secondDone,
  currentOperation;

function doOperation() {
  const intValueA = parseInt(firstValue, 10);
  const intValueB = parseInt(secondValue, 10);
  switch (currentOperation) {
    case "+":
      return intValueA + intValueB;
    case "-":
      return intValueA - intValueB;
    case "/":
      return intValueA / intValueB;
    case "*":
      return intValueA * intValueB;
    default:
      return;
  }
}

function handleNumberClick(e) {
  const clickedNum = e.target.innerText;
  if (!firstDone) {
    firstValue = firstValue + clickedNum;
    result.innerHTML = firstValue;
  } else {
    secondValue = secondValue + clickedNum;
    result.innerHTML = secondValue;
    secondDone = true;
  }
}

function calculate() {
  const operation = doOperation();
  result.innerHTML = operation;
  firstValue = operation;
  secondDone = false;
  secondValue = "";
}

function handleOperationClick(e) {
  const clickedOperation = e.target.innerText;
  if (!firstDone) {
    firstDone = true;
  }
  if (firstDone && secondDone) {
    calculate();
  }
  currentOperation = clickedOperation;
}

function handleReset() {
  firstValue = "";
  secondValue = "";
  firstDone = false;
  secondDone = false;
  currentOperation = null;
  result.innerHTML = "0";
}

function handleEqualsClick() {
  if (firstDone && secondDone) {
    calculate();
  }
}

numbers.forEach(function(number) {
  number.addEventListener("click", handleNumberClick);
});
operations.forEach(function(operation) {
  operation.addEventListener("click", handleOperationClick);
});
reset.addEventListener("click", handleReset);
equals.addEventListener("click", handleEqualsClick);


//

body {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 80px;
  grid-auto-rows: 80px;
  grid-gap: 10px;
  background-color: black;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body span {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3d3b41;
  border-radius: 20px;
  font-size: 28px;
  color: white;
  cursor: pointer;
}

body span:active {
  opacity: 0.8;
}

body span:not(.result) {
  user-select: none;
}

.result {
  background-color: black;
  padding-right: 20px;
  justify-content: flex-end;
  font-size: 48px;
  grid-column: 1 / 4;
}

.zero {
  grid-column: 1 / 3;
}

.operation {
  background-color: #ff9a00;
}

.reset {
  background-color: #b3b3bb;
}

//

    <span class="js-result result">0</span>
    <span class="js-reset reset">C</span>
    <span class="js-number">7</span>
    <span class="js-number">8</span>
    <span class="js-number">9</span>
    <span class="js-operation operation">+</span>
    <span class="js-number">4</span>
    <span class="js-number">5</span>
    <span class="js-number">6</span>
    <span class="js-operation operation">-</span>
    <span class="js-number">1</span>
    <span class="js-number">2</span>
    <span class="js-number">3</span>
    <span class="js-operation operation">*</span>
    <span class="js-number zero">0</span>
    <span class="js-equals">=</span>
    <span class="js-operation operation">/</span>
    <script src="src/index.js"></script>


    */