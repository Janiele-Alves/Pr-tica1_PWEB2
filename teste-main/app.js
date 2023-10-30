let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('#evaluate');
let powerBtn = document.querySelector('#powerBtn');
let sqrtBtn = document.querySelector('#sqrtBtn');

let realTimeScreenValue = [];

clearbtn.addEventListener("click", () => {
    realTimeScreenValue = [''];
    updateDisplay();
});

function calculateExpression(expression) {
    try {
        const fn = new Function(`return ${expression}`);
        return fn();
    } catch (error) {
        return undefined;
    }
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!btn.id.match('erase')) {
            realTimeScreenValue.push(btn.value);
            updateDisplay();

            if (btn.classList.contains('num_btn')) {
                answerScreen.innerHTML = calculateExpression(realTimeScreenValue.join(''));
            }
        }
        if (btn.id.match('erase')) {
            realTimeScreenValue.pop();
            updateDisplay();
        }
        if (btn.id.match('evaluate')) {
            currentInput.className = 'answerScreen';
            answerScreen.className = 'currentInput';
            answerScreen.style.color = 'white';
            let expression = realTimeScreenValue.join('');

            if (expression.includes('**')) {
                // Se a expressão contém '**', é calculada a potência
                const [base, exponent] = expression.split('**').map(parseFloat);
                result = Math.pow(base, exponent);
            } else if (expression.includes('sqrt')) {
                // Se a expressão contém 'sqrt', calculamos a raiz quadrada
                const operand = parseFloat(expression.split('sqrt')[1]);
                if (!isNaN(operand) && operand >= 0) {
                    result = Math.sqrt(operand);
                } else {
                    result = 'Error';
                }
            } else {
                result = calculateExpression(expression);
            }
            realTimeScreenValue = [result.toString()];
            updateDisplay();
        }
        if (btn.id.match('powerBtn')) {
            
            realTimeScreenValue.push('**');
            updateDisplay();
        }
        if (btn.id.match('sqrtBtn')) {
            realTimeScreenValue = ['sqrt'];
            updateDisplay();
        }
    });
});

function updateDisplay() {
    currentInput.innerHTML = realTimeScreenValue.join('');
    answerScreen.innerHTML = calculateExpression(realTimeScreenValue.join('')) || 0;
}