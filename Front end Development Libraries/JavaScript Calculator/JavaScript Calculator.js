const display = document.getElementById('display');
let currentInput = '0';
let formula = '';
let lastPressed = '';

function updateDisplay() {
  display.textContent = currentInput;
}

function clearAll(){
  currentInput = '0';
  formula = '';
  lastPressed = '';
  updateDisplay();
}

function handleNumber(num) {
  if(currentInput === '0' || /[+\-*/]/.test(lastPressed)) {
    currentInput = num;
  } else {
    currentInput += num;
  }
  formula += num;
  lastPressed = num;
  updateDisplay();
}

function handleDecimal() {
  if(!currentInput.includes('.')) {
    currentInput += '.';
    formula += '.';
    lastPressed = '.';
    updateDisplay();
  }
}

function handleOperator(op) {
  if (/[+\-*/]$/.test(formula)) {
    if(op === '-' && !formula.endsWith('-')) {
      formulat += '-';
    } else {
      formula - formula.slice(0, -1) + op;
    }
  } else {
    formula += op;
  }
  currentInput = op;
  lastPressed = op;
  updateDisplay();
}

function calculate() {
  try {
    const result = parseFloat(eval(formula).toFixed(10));
    currentInput = result.toString();
    formula = result.toString();
    lastPressed = '=';
    updateDisplay();
  } catch {
    currentInput = 'Error';
    updateDisplay();
    formula = '';
  }
}

document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('decimal').addEventListener('click', handleDecimal);
document.getElementById('equals').addEventListener('click', calculate);

const numbers =  ['zero','one','two','three','four','five','six','seven','eight','nine'];
numbers.forEach(id => {
  document.getElementById(id).addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
  });
});

const operators = ['add', 'subtract', 'multiply', 'divide'];
operators.forEach(id => {
  const opMap = {add: '+', subtract: '-', multiply: '*', divide: '/'};
  document.getElementById(id).addEventListener('click', () => {
    handleOperator(opMap[id]);
  });
});
