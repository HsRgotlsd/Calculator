document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let operand1 = '';

    const buttons = Array.from(document.querySelectorAll('.btn'));
    const equalsButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');

            if (value) {
                if (value === '.') {
                    if (!currentInput.includes('.')) {
                        currentInput += value;
                    }
                } else if (['+', '-', '*', '/'].includes(value)) {
                    if (operator && operand1) {
                        currentInput = calculate(operand1, operator, currentInput);
                        operand1 = currentInput;
                    } else {
                        operand1 = currentInput;
                    }
                    operator = value;
                    currentInput = '';
                } else {
                    currentInput += value;
                }
                display.textContent = currentInput;
            }
        });
    });

    equalsButton.addEventListener('click', () => {
        if (operator && operand1) {
            currentInput = calculate(operand1, operator, currentInput);
            display.textContent = currentInput;
            operand1 = '';
            operator = '';
        }
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        operand1 = '';
        operator = '';
        display.textContent = '0';
    });

    function calculate(op1, op, op2) {
        const num1 = parseFloat(op1);
        const num2 = parseFloat(op2);

        switch (op) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return num2 !== 0 ? (num1 / num2).toString() : 'Error';
            default:
                return 'Error';
        }
    }
});
